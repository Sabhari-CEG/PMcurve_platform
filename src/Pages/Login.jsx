import React from 'react';
import "./Login.css";
import { Button, Card } from 'antd';
import LoginReviewCard from "../Components/LoginReviewCard";
import logo from "../Sources/pmcurve.png"
import btn from "../Sources/linkedinlogin.png"
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';


const sampleComments = [
    {
        Comment: "First thing in my to-do list for Saturday was to attend ‘Cracking the Product Sense MasterClass’ by Deepak Singh and Shrikant Rane! I sat down with my notes and a cup of coffee ☕️ because I was sure I would have a lot of insights as takeaways from Deepak!",
        name: "Vismaya R",
        designation: "Product | Ex-Frontrow, Upgrad| Stoadsadasdsa",
        dp: "https://api.dicebear.com/7.x/miniavs/svg?seed=user"
    },
    {
        Comment: "Growth Assessment (Free) by Deepak Singh was one of the exciting thing that I tried today (link in comment). The assessment takes you through 25 questions about Product growth. Here is why I loved it 1. Nobody else that I know has approached product management concepts with such ",
        name: "Ashish Pawar",
        designation: "Consumer tech PM | Ex- Zepto, Dealshare, Lastminute.com | IIMB",
        dp: "https://api.dicebear.com/7.x/miniavs/svg?seed=user"
    },
    {
        Comment: "The last 10 weeks have been different. Signing up for Deepak's pmcurve Growth course & dedicating some hours every week has to easily be one of the best decisions I took to elevate my skills as a Product Manager.",
        name: "Manjubhargavi Pandiri",
        designation: "Product | Ex-Frontrow, Upgrad| Stoadsadasdsa",
        dp: "https://api.dicebear.com/7.x/miniavs/svg?seed=user"
    },
    {
        Comment: "First thing in my to-do list for Saturday was to attend ‘Cracking the Product Sense MasterClass’ by Deepak Singh and Shrikant Rane! I sat down with my notes and a cup of coffee ☕️ because I was sure I would have a lot of insights as takeaways from Deepak!",
        name: "Vismaya R",
        designation: "Product | Ex-Frontrow, Upgrad| Stoadsadasdsa",
        dp: "https://api.dicebear.com/7.x/miniavs/svg?seed=user"
    },
    {
        Comment: "Growth Assessment (Free) by Deepak Singh was one of the exciting thing that I tried today (link in comment). The assessment takes you through 25 questions about Product growth. Here is why I loved it 1. Nobody else that I know has approached product management concepts with such ",
        name: "Ashish Pawar",
        designation: "Consumer tech PM | Ex- Zepto, Dealshare, Lastminute.com | IIMB",
        dp: "https://api.dicebear.com/7.x/miniavs/svg?seed=user"
    },
    {
        Comment: "The last 10 weeks have been different. Signing up for Deepak's pmcurve Growth course & dedicating some hours every week has to easily be one of the best decisions I took to elevate my skills as a Product Manager.",
        name: "Manjubhargavi Pandiri",
        designation: "Product | Ex-Frontrow, Upgrad| Stoadsadasdsa",
        dp: "https://api.dicebear.com/7.x/miniavs/svg?seed=user"
    },
];

const Login = () => {
    // Split the sample comments into two equal halves
    const halfLength = Math.ceil(sampleComments.length / 2);
    const firstHalf = sampleComments.slice(0, halfLength);
    const secondHalf = sampleComments.slice(halfLength);
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const navigate = useNavigate();

    
        const getLinkedinLoginUrl = (clientId, baseURL) => {
            return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${baseURL}/linkedin/callback&scope=profile%20email%20openid`;
        }
        const linkedinLoginUrl = getLinkedinLoginUrl(
          "862jw1gt1od0wn",
          "http://localhost:3000"
        );
      
        const handleLogin = () => {
          window.location.href = linkedinLoginUrl;
        };

    return (
        <div>
            {isMobile ? (
                <div>
                <div className="scroll-container">
                    <div className="scroll-column">
                        <div className="scroll-wrapper">
                            {firstHalf.map((element, index) => (
                                <LoginReviewCard
                                    key={index}
                                    comment={element.Comment}
                                    name={element.name}
                                    designation={element.designation}
                                    dp={element.dp}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='login-container'>
                    <Card className='login-card'>
                            <img src={logo} alt='pmcurve logo' />
                            <p>Welcome! Let’s get you started</p>
                            <Button className='login-button' onClick={handleLogin}>
                                <img src={btn} alt='login with linkedin' className='button-image' />
                            </Button>
                            <p>By continuing, you agree to the <a href='/terms'>Terms of Use</a> & <a href='/privacy-policy'>Privacy Policy</a>.</p>
                    </Card>
                </div>
                    <div className="scroll-column reverse-scroll">
                        <div className="scroll-wrapper">
                            {secondHalf.map((element, index) => (
                                <LoginReviewCard
                                    key={index}
                                    comment={element.Comment}
                                    name={element.name}
                                    designation={element.designation}
                                    dp={element.dp}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                
                </div>
            ) : (
                
                <div>
        <div className="scroll-container">
            <div className="scroll-column">
                <div className="scroll-wrapper">
                    {firstHalf.map((element, index) => (
                        <LoginReviewCard
                            key={index}
                            comment={element.Comment}
                            name={element.name}
                            designation={element.designation}
                            dp={element.dp}
                        />
                    ))}
                </div>
            </div>
            <div className="scroll-column reverse-scroll">
                <div className="scroll-wrapper">
                    {secondHalf.map((element, index) => (
                        <LoginReviewCard
                            key={index}
                            comment={element.Comment}
                            name={element.name}
                            designation={element.designation}
                            dp={element.dp}
                        />
                    ))}
                </div>
            </div>
        </div>
        <div className='login-container'>
            <Card className='login-card'>
                    <img src={logo} alt='pmcurve logo' />
                    <p>Welcome! Let’s get you started</p>
                    <Button className='login-button' onClick={handleLogin}>
                        <img src={btn} alt='login with linkedin' className='button-image' />
                    </Button>
                    <p>By continuing, you agree to the <a href='/terms'>Terms of Use</a> & <a href='/privacy-policy'>Privacy Policy</a>.</p>
            </Card>
        </div>
        </div>
            )}
        </div>
        
    );

}

export default Login;
