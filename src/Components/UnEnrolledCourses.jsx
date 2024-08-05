import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, message, Spin } from 'antd';
import axios from 'axios';
import "./UnEnrolledCourses.css";
import getToken from '../Common/Auth';
import { useNavigate } from 'react-router-dom';


const UnEnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
        setLoading(true);
      try {
        const token_response = getToken();
        if (token_response.status === 404) {
            message.error("some error happend! please login again!");
            navigate("/")
            
        }
        const token = token_response.token
        const response = await axios.get('https://lms.soumit.in/api/v1/courses', {headers: {Authorization: token  }});
        if (response.status === 200) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const enrollCourse = async (courseId) => {
    console.log(courseId);
    setLoading(true);
    try {
        const token_response = getToken();
        console.log(token_response);
        if (token_response.status === 404) {
            message.error("some error happend! please login again!");
            navigate("/")   
        }
        const token = token_response.token;
        console.log(token);
        const url = "https://lms.soumit.in/api/v1/courses/" + courseId.toString() + "/enroll";
        const response = await axios.post(url, {},  {
            headers: { Authorization: token },
          });
          if (response.status === 200) {
            message.success("Enrolled the course succesfully!");
            window.location.reload();
          } else{
            message.error("Some error at enrolling")
          }

    } catch (error) {
        console.error(error);
    } finally{
        setLoading(false);
    }
  }

  return (
    <div>
        <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        {courses.map(course => (
          <Col
            key={course.id}
            xs={24} sm={12} md={8} lg={6}
          >
            <Card
            className='course-card'
              cover={<div style={{
                backgroundImage: `url(${course.bannerLink ? "https://lms.soumit.in" + course.bannerLink : ""})`,
                backgroundColor: course.bannerLink ? 'transparent' : '#fff',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maxHeight: '400px',
                maxWidth: '400px',
                width: '100%',
                paddingTop: '100%', 
              }} />}
              bordered={false}
            >
                <p className='course-heading'>{course.name}</p>
              <p className='course-description'>{course.description.length < 30 ? course.description : course.description.substring(0,30) + "..."}</p>
              <p className='course-price'>
                {course.accessibilityType === 'paid'
                  ? `INR ${course.price}`
                  : 'Free'}
              </p>
              <Button className='course-button' onClick={() => enrollCourse(course.id)}>
                {course.accessibilityType === 'paid' ? 'Buy Now' : 'Start Now'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      </Spin>
    </div>
  );
};

export default UnEnrolledCourses;
