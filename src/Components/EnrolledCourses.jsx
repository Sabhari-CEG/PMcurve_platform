import "./EnrolledCourses.css"
import getToken from "../Common/Auth";
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, message, Spin } from 'antd';
import { Flex, Progress } from 'antd';
import {
    CaretRightOutlined
  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';





const EnrolledCourses = () => {
    const navigate = useNavigate();
    const [enrolled,setEnrolled] = useState([])
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

    useEffect(() => {
        getEnrolledCourses();
    },[])

    const getEnrolledCourses = async () => {
        setLoading(true);
        try {
            const token_response = getToken();
            if (token_response.status === 404) {
                message.error("Some error occured!")
                navigate("/")
            }
            const token = token_response.token
            const url = "https://lms.soumit.in/api/v1/users/purchased_courses";
            const response = await axios.get(url, {headers: {Authorization: token  }});
            if (response.status === 200) {
                setEnrolled(response.data)
            }
        } catch (error) {
            console.error(error)
            message.error("some error occured")
        } finally{
            setLoading(false);
        }
    }

    const renderCourse = (courseId,progressPercentage) => {
        navigate("/course", {
            state: {
                courseId : courseId,
                progressPercentage : progressPercentage,
            }
        })
    }
    return (<div>
        <Spin spinning={loading}>
        {
            enrolled.map(course => (
                <Card className="outer-card-enrolled">
            {isMobile ? (
                <div>
                    <Row>
                <Col span={8}>
                    <img className="thumb-image"
                     src={course?.courseDetails?.bannerLink ? "https://lms.soumit.in" + course.courseDetails.bannerLink : ""}
                     alt="Image" 
                     style={{ backgroundColor: course?.courseDetails?.bannerLink ? 'transparent' : '#fff' }}
                     />
                </Col>
                <Col span={16}>
                    <div className="entrolled-card-content">
                        <p className="course-heading-enrolled">{course?.courseDetails?.name}</p>
                        <p className="course-description-enrolled">{course?.courseDetails?.description}</p>
                    </div>
                    <a onClick={() => renderCourse(course?.id, course?.progressPercentage)} className="enrolled-continue">Continue Learning <CaretRightOutlined /></a>
                </Col>
                </Row>
                <Row>
                <Col span={24}>
                <div className="enrolled-progress">
                    <Flex gap="small" wrap>
                        <Progress percent={Math.ceil(course.progressPercentage)} strokeColor="#004747" style={{fontWeight:"bold"}}/>
                    </Flex>
                </div>
                        
                </Col>
                </Row>
                
                </div>
            ) : (<div>
            <Row>
            <Col span={6}>
            <img
                className="thumb-image"
                src={course?.courseDetails?.bannerLink ? "https://lms.soumit.in" + course.courseDetails.bannerLink : ""}
                alt="Image"
                style={{ backgroundColor: course?.courseDetails?.bannerLink ? 'transparent' : '#fff' }}
            />
            </Col>
            <Col span={14}>
                <div className="entrolled-card-content">
                    <p className="course-heading-enrolled">{course?.courseDetails?.name}</p>
                    <p className="course-description-enrolled">{course?.courseDetails?.description}</p>
                </div>
                <a onClick={() => renderCourse(course?.id, course?.progressPercentage)} className="enrolled-continue">Continue Learning <CaretRightOutlined /></a>
            </Col>
            <Col span={4}>
            <div className="enrolled-progress">
                <Flex gap="small" wrap>
                    <Progress type="circle" size={150} percent={Math.ceil(course.progressPercentage)} strokeColor="#004747" style={{fontWeight:"bold"}}/>
                </Flex>
            </div>
                    
            </Col>
        </Row>
            </div>)}
            
        </Card>
            ))
        }
    </Spin>    
    </div>);
}

export default EnrolledCourses;

//format={(percent) => `${percent} Complete`}