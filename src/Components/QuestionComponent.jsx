import React, { useState, useEffect } from 'react';
import "./QuestionComponent.css"; // Import your CSS for the question component
import getToken from '../Common/Auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import CorrectAnswer from './CorrectAnswer';
import WrongAnswer from './WrongAnswer';

const QuestionComponent = ({ content, selectedChapter, courseId, submitReload }) => {
    const { question, is_single_choice, answers, can_attempt, previous_attempt_answer_ids, previous_attempt_verdict, previous_attempt_feedback } = content.ownerContent;
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!can_attempt && previous_attempt_answer_ids) {
            setSelectedAnswers(previous_attempt_answer_ids);
        }
    }, [can_attempt, previous_attempt_answer_ids]);

    const handleAnswerChange = (answerId, isSingleChoice) => {
        if (isSingleChoice) {
            setSelectedAnswers([answerId]);
        } else {
            setSelectedAnswers(prevSelected => 
                prevSelected.includes(answerId) 
                ? prevSelected.filter(id => id !== answerId) 
                : [...prevSelected, answerId]
            );
        }
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

        submitReload();
    };

    return (
        <div>
            <div className="question-component">
                <p className='exercise-topic'>Exercise</p>
                <div className="question-text" dangerouslySetInnerHTML={{ __html: question }} />
                <ul className="options">
                    {answers.map((answer) => (
                        <li key={answer.id}>
                            <label className="option-label">
                                <input
                                    type={is_single_choice ? 'radio' : 'checkbox'}
                                    name={`question-${content.id}`}
                                    value={answer.id}
                                    className='option-entry'
                                    disabled={!can_attempt}
                                    checked={selectedAnswers.includes(answer.id)}
                                    onChange={() => handleAnswerChange(answer.id, is_single_choice)}
                                />
                                <span dangerouslySetInnerHTML={{ __html: answer.answer }} />
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {can_attempt ? (
                <button className="submit-button" onClick={() => handleSubmit(content.id, content.ownerContent.question_id, selectedAnswers)}>Submit</button>
            ) : (
                <div>
                    {/* <p>Previous Attempt:</p>
                    <ul>
                        {previous_attempt_answer_ids.map(id => (
                            <li key={id}>Answer ID: {id}</li>
                        ))}
                    </ul> */}
                    {previous_attempt_verdict === "correct" ? (
                        <CorrectAnswer feedback={previous_attempt_feedback || ""} />
                    ) : (
                        <WrongAnswer feedback={previous_attempt_feedback || ""} />
                    )}
                    {/* <p>Verdict: {previous_attempt_verdict}</p>
                    <p>Feedback: {previous_attempt_feedback}</p> */}
                </div>
            )}
        </div>
    );
};

export default QuestionComponent;
