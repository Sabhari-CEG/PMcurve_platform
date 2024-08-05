// src/Components/Navbar.js
import React, {useState} from 'react';
import './Navbar.css';
import logo from '../Sources/pmcurve.png';
import { CaretDownOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Button, Popover } from 'antd';
import getToken from "../Common/Auth";
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import axios from 'axios';






const Navbar = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const Logout = async () => {
        setLoading(true);
        try {
            const token_response = getToken();
        if (token_response.status === 404) {
            message.error("Session expired!");
            navigate("/")    
        } else{
            const token = localStorage.getItem('accessToken')
            const uid = localStorage.getItem('uid')
            const client = localStorage.getItem('client')
            const url = "https://lms.soumit.in/api/v1/auth/sign_out?access-token="+token+"&uid="+uid+"&client="+client
            const response = await axios.delete(url)
            if (response.data.success){
                localStorage.clear();
                navigate("/")
                message.success("Logged out succesfully!")
              }
              
        }
            
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false);
        }
        
    
    }
    
    const content = () => {
        return(
            <div>
                <Spin spinning={loading}>
                <Button className='content-btn'>Contact Us</Button>
                <Button className='content-btn' onClick={Logout}>Logout</Button>
                </Spin>
            </div>
        );
    }

  return (
    <div className='navbar'>
        <div className='logo'>
            <img src={logo} alt='pmcurve logo' />
        </div>
        <div className='options'>
            {!isMobile ? (<div>
                <Popover content={content}>
                    <p>{localStorage.getItem('email')}<CaretDownOutlined className='down-arrow'/></p>
                </Popover>
                </div>) : (<div>
                    
                    <Popover content={content} title={localStorage.getItem('email')}>
                        <CaretDownOutlined className='down-arrow'/>
                    </Popover>
                    </div>)}
            
            
        </div>
    </div>
  );
};

export default Navbar;
