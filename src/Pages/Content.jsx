// import "./Content.css";
// import { useLocation } from "react-router-dom";
// import getToken from "../Common/Auth";
// import { Spin, message } from "antd";
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from "../Components/Navbar";
// import Sidebar from "../Components/Sidebar";
// import { Col, Row } from 'antd';
// import CourseContent from "../Components/CourseContent";


// const Content = () => {
//     const { state } = useLocation();
//     const courseId = state.courseId;
//     const [progressPercentage,setProgressPercentage] = useState(0);
    
//     const [loading, setLoading] = useState(false);
//     const [chapters, setChapters] = useState([]);
//     const navigate = useNavigate();
//     const [selectedChapter,setSelectedChapter] = useState(null);
//     const [selectedTopic,setSelectedTopic] = useState(null);
//     const [courseContent,setCourseContent] = useState([]);

//     useEffect(() => {
//         getChapterList();
//     }, []);

//     useEffect(() => {
//         getCourseContent();
//         getCourseProgressPercentage();
//     },[selectedChapter, selectedTopic])

//     const getCourseContent = async () => {
//         setLoading(true);
//         try {
//             const url = `https://lms.soumit.in/api/v1/user_courses/${courseId}/topic_content_list`;
//             const tokenResponse = getToken();
//             if (!tokenResponse || tokenResponse.status === 404) {
//               message.error("Some error occurred! Please log in again.");
//               navigate("/");
//               return;
//             }
//             const token = tokenResponse.token;
//             const options = {
//               params : {"chapter_id" : selectedChapter,
//                 "topic_id" : selectedTopic
//               },
//               headers: {
//                   Authorization: token  
//               }
//           }
//           const response = await axios.get(url, options);
//           if (response.status === 200) {
//             setCourseContent(response.data);
//           } else{
//             message.error("Some error happened!")
//           }
//         } catch (error) {
//             console.error(error);
//         } finally{
//             setLoading(false);
//         }
//     }

//     const getCourseProgressPercentage = async () => {
//         setLoading(true);
//         try {
//             const url = `https://lms.soumit.in/api/v1/user_courses/${courseId}/progress`;
//         const tokenResponse = getToken();
//             if (!tokenResponse || tokenResponse.status === 404) {
//               message.error("Some error occurred! Please log in again.");
//               navigate("/");
//               return;
//             }
//             const token = tokenResponse.token;
//         const response = await axios.get(url, {headers: {Authorization: token  }});
//         if (response.status === 200) {
//             setProgressPercentage(Math.ceil(response.data.progress_percentage))
//         } else{
//             message.error("Some error happened!")
//           }
//         } catch (error) {
//             console.error(error);
//         } finally{
//             setLoading(false);
//         }
        
       

//     }

//     const getChapterList = async () => {
//         setLoading(true);
//         try {
//             const tokenResponse = getToken();
//             if (!tokenResponse || tokenResponse.status === 404) {
//                 message.error("Some error occurred! Please log in again.");
//                 navigate("/");
//                 return;
//             }
//             const token = tokenResponse.token;
//             const url = `https://lms.soumit.in/api/v1/user_courses/${courseId}/chapter_list`;
//             const response = await axios.get(url, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setChapters(response.data);
//         } catch (error) {
//             console.error("Failed to fetch chapter list:", error);
//             if (error.response && error.response.status === 401) {
//                 message.error("Unauthorized! Please log in again.");
//                 navigate("/");
//             } else {
//                 message.error("An error occurred while fetching the chapter list.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChapterClick = (topicId,chapterId) => {
//         setSelectedChapter(chapterId);
//         setSelectedTopic(topicId);
//     };

//     const answerSubmitted = () => {
//         getCourseContent();
//     }

//     const trackSidebarProgress = () => {
//         getCourseProgressPercentage();
//     }

    

//     return (
//         <div className="content-container">
//             <Spin spinning={loading}>
//                 <div style={{position:'fixed', backgroundColor:'white', zIndex: '999'}}>
//                     <Navbar />
//                 </div>
//                  <Row>
//                      <Col span={4}>
//                      <Sidebar
//                         chapters={chapters}
//                         progressPercentage={progressPercentage}
//                         onChapterClick={handleChapterClick}
//                         id={courseId}
//                     />
//                     </Col>
//                     <Col span={20}>
//                         <CourseContent content={courseContent} courseId={courseId} selectedChapter={selectedChapter} selectedTopic={selectedTopic} answerSubmitted={answerSubmitted} trackSidebarProgress={trackSidebarProgress}/>
//                     </Col>
//                 </Row>
                
//             </Spin>
//         </div>
//     );
// };

// export default Content;

import "./Content.css";
import { useLocation } from "react-router-dom";
import getToken from "../Common/Auth";
import { Spin, message } from "antd";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Col, Row } from 'antd';
import CourseContent from "../Components/CourseContent";

const Content = () => {
    const { state } = useLocation();
    const courseId = state.courseId;
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [chapters, setChapters] = useState([]);
    const navigate = useNavigate();
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [courseContent, setCourseContent] = useState([]);

    useEffect(() => {
        getChapterList();
    }, []);

    useEffect(() => {
        getCourseContent();
        getCourseProgressPercentage();
    }, [selectedChapter, selectedTopic]);

    const getCourseContent = async () => {
        setLoading(true);
        try {
            const url = `https://lms.soumit.in/api/v1/user_courses/${courseId}/topic_content_list`;
            const tokenResponse = getToken();
            if (!tokenResponse || tokenResponse.status === 404) {
              message.error("Some error occurred! Please log in again.");
              navigate("/");
              return;
            }
            const token = tokenResponse.token;
            const options = {
              params: {
                "chapter_id": selectedChapter,
                "topic_id": selectedTopic
              },
              headers: {
                  Authorization: token  
              }
            };
            const response = await axios.get(url, options);
            if (response.status === 200) {
                setCourseContent(response.data);
            } else {
                message.error("Some error happened!");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getCourseProgressPercentage = async () => {
        setLoading(true);
        try {
            const url = `https://lms.soumit.in/api/v1/user_courses/${courseId}/progress`;
            const tokenResponse = getToken();
            if (!tokenResponse || tokenResponse.status === 404) {
                message.error("Some error occurred! Please log in again.");
                navigate("/");
                return;
            }
            const token = tokenResponse.token;
            const response = await axios.get(url, { headers: { Authorization: token } });
            if (response.status === 200) {
                setProgressPercentage(Math.ceil(response.data.progress_percentage));
            } else {
                message.error("Some error happened!");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getChapterList = async () => {
        setLoading(true);
        try {
            const tokenResponse = getToken();
            if (!tokenResponse || tokenResponse.status === 404) {
                message.error("Some error occurred! Please log in again.");
                navigate("/");
                return;
            }
            const token = tokenResponse.token;
            const url = `https://lms.soumit.in/api/v1/user_courses/${courseId}/chapter_list`;
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChapters(response.data);
        } catch (error) {
            console.error("Failed to fetch chapter list:", error);
            if (error.response && error.response.status === 401) {
                message.error("Unauthorized! Please log in again.");
                navigate("/");
            } else {
                message.error("An error occurred while fetching the chapter list.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChapterClick = (topicId, chapterId) => {
        setSelectedChapter(chapterId);
        setSelectedTopic(topicId);
    };

    const answerSubmitted = () => {
        getCourseContent();
        trackSidebarProgress();
    };

    const trackSidebarProgress = async () => {
        await getCourseProgressPercentage();
        await getChapterList();
    };

    return (
        <div className="content-container">
            <Spin spinning={loading}>
                <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: '999' }}>
                    <Navbar />
                </div>
                <Row>
                    <Col span={4}>
                        <Sidebar
                            chapters={chapters}
                            progressPercentage={progressPercentage}
                            onChapterClick={handleChapterClick}
                            id={courseId}
                        />
                    </Col>
                    <Col span={20}>
                        <CourseContent
                            content={courseContent}
                            courseId={courseId}
                            selectedChapter={selectedChapter}
                            selectedTopic={selectedTopic}
                            answerSubmitted={answerSubmitted}
                            trackSidebarProgress={trackSidebarProgress}
                        />
                    </Col>
                </Row>
            </Spin>
        </div>
    );
};

export default Content;
