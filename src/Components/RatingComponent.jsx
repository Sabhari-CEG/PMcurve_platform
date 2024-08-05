import "./RatingComponent.css"
import { Rate } from 'antd';
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';


const RatingComponent = (content) => {
    const [value, setValue] = useState(5);

    useEffect(() => {
        console.log(value);
    },[value])

    return (
        <div>
        <div className="rating-outer">
            <h4>This is the end of this chapter. Please rate it to proceed.</h4>
            <Rate allowHalf onChange={setValue} value={value} />
        </div>
        <div>
            <Input className="comment-outer" placeholder="Comment (Optional)" />
        </div>
        </div>
    )
}

export default RatingComponent;