import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./LoginReviewCard.css";
import dbq from "../Sources/doublequotes.png";

const { Meta } = Card;

const LoginReviewCard = ({ comment, name, designation, dp, index }) => {
    console.log(index);
    return (
        <Card
            className="login-review-card"
            title={<img className="double-quotes" src={dbq} alt="double quotes" />}
        >
            <div className="card-content">
                <p className="card-paragraph">
                    {comment}
                </p>
                </div>
                <Meta
                    avatar={<Avatar size={64} icon={<UserOutlined />} src={dp} />}
                    title={name}
                    description={ designation}
                    className="card-meta"
                />
            
        </Card>
    );
}

export default LoginReviewCard;
