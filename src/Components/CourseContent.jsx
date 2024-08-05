import React, { useState, useRef, useEffect } from 'react';
import QuestionComponent from './QuestionComponent';
import SummaryComponent from './SummaryComponent';
import RatingComponent from './RatingComponent';
import "./CourseContent.css"; // Import your CSS if needed
import getToken from '../Common/Auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';

const CourseContent = ({ content = [], courseId, selectedChapter, selectedTopic, answerSubmitted, trackSidebarProgress }) => {
  

    const [visibleSections, setVisibleSections] = useState([0]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sectionRefs = useRef([]);

    useEffect(() => {
        sectionRefs.current = sectionRefs.current.slice(0, content.length);
        let initialVisibleSections  = []
        for (let i = 0; i < content.length; i++) {
            initialVisibleSections.push(i);
            if (content[i].requireContinueButton) break;
        }
        setVisibleSections(initialVisibleSections)
    }, [content]);

    // Function to render rich text content
    const renderRichText = (content) => {
        return (
            <div dangerouslySetInnerHTML={{ __html: content?.ownerContent?.content || '' }} />
        );
    };

    const submitReload = () => {
        answerSubmitted();
    }

    // Function to render content based on type
    const renderContent = (content) => {

        switch (content.type) {
            case "RichText":
                if (content.ownerContent.content_type === "text") {
                    return renderRichText(content);
                } else if (content.ownerContent.content_type === "summary"){
                    return <SummaryComponent content={content} />    
                }
            case "ChoiceQuestion":
                return <QuestionComponent content={content} selectedChapter={selectedChapter} courseId={courseId} submitReload={submitReload} />;
            case "Rating":
                return <RatingComponent content={content}/>  
            default:
                return <p>Unsupported content type</p>;
        }
    };

    const trackContinueProgress = async (topicId) => {
        const tokenResponse = getToken();
        if (!tokenResponse || tokenResponse.status === 404) {
            message.error("Some error occurred! Please log in again.");
            navigate("/");
            return;
        }
        const token = tokenResponse.token;
        const url = `https://lms.soumit.in/api/v1/user_courses/${courseId}/mark_complete`
        const params = {
            'topic_content_id' : topicId
        }
        const response = await axios.post(url, params, {
            headers: { Authorization: token },
        });

        trackSidebarProgress();


    }


    const handleContinue = (index) => {
        const newVisibleSections = [...visibleSections];
        let nextIndex = index + 1;

        // Iterate to find the next section with requireContinueButton as true
        while (nextIndex < content.length && !content[nextIndex].requireContinueButton) {
            newVisibleSections.push(nextIndex);
            nextIndex++;
        }

        // Add the section with requireContinueButton as true if found
        if (nextIndex < content.length && content[nextIndex].requireContinueButton) {
            newVisibleSections.push(nextIndex);
        }
        setVisibleSections(newVisibleSections);

        const lastIndex = newVisibleSections[newVisibleSections.length - 1]
        const id = content[lastIndex].id
        trackContinueProgress(id);
        setTimeout(() => {
                        sectionRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
    };

    const handleSubmit = async (contentId, questionId, selectedAnswers) => {
        const tokenResponse = getToken();
        if (!tokenResponse || tokenResponse.status === 404) {
            message.error("Some error occurred! Please log in again.");
            navigate("/");
            return;
        }
        const token = tokenResponse.token;
        const questionInfo = {
            chapter_id: selectedChapter,
            topic_content_id: contentId,
            question_id: questionId,
            chosen_answer_id: selectedAnswers
        };
        const url = `https://lms.soumit.in/api/v1/user_courses/${courseId}/attempt`;
        const response = await axios.post(url, questionInfo, {
            headers: { Authorization: token },
        });

    };

    return (
        <div className="course-content">
            <Spin spinning={loading}>
                {content.map((item, index) => (
                    <div
                        key={item.id}
                        className={`content-section ${visibleSections.includes(index) ? 'visible' : 'hidden'}`}
                        ref={el => sectionRefs.current[index] = el}
                    >
                        {renderContent(item)}
                        {item.requireContinueButton && !visibleSections.includes(index + 1) && (
                            <button className='continue-btn' onClick={() => handleContinue(index)}>Continue</button>
                        )}
                    </div>
                ))}
            </Spin>
        </div>
    );
};

export default CourseContent;
