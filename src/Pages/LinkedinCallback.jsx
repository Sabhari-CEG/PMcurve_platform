import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LinkedinCallback.css"


const LinkedinCallback = () => {
    const location = useLocation();
    const [code, setCode] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const codeParam = queryParams.get('code');
        setCode(codeParam);
    }, [location.search]);

    useEffect(() => {
        if (code) {
            authenticate();
        }
    }, [code]);

    const authenticate = async () => {
        if (code === null || code === undefined) {
            navigate("/");
        } else {
            try {
                const url = "https://lms.soumit.in/api/v1/auth/linkedin_callback";
                const response = await axios.post(url, { code });
                const fullName = response.data.data.firstName + response.data.data.lastName;
                localStorage.setItem('fullName', fullName);
                localStorage.setItem('email',response.data.data.email);
                localStorage.setItem('avatarUrl',response.data.data.avatarUrl);
                localStorage.setItem('accessToken',response.data.headers['access-token']);
                localStorage.setItem('expiry',response.data.headers.expiry);
                localStorage.setItem('uid',response.data.headers.uid);
                localStorage.setItem('client',response.data.headers.client);
                localStorage.setItem('authorization',response.data.headers.Authorization);
                navigate('/dashboard');
            } catch (error) {
                console.error("Authentication failed:", error);
                navigate('/'); 
            }
        }
    };

    

    return (
        <div className='display-box'>
             <Spin indicator={<LoadingOutlined spin />} size="large" />
             <h2>Redirecting...</h2>
        </div>
    );
};

export default LinkedinCallback;
