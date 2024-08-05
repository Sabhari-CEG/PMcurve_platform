import "./ResultComponent.css"
import celebrate from "../Sources/celebrate.png"
import { Col, Row } from 'antd';


const ResultComponent = () => {
    return (
        <div>
            <h3><img src={celebrate} alt="celebrate" /> Your Results!</h3>
            <div className="result-outer-box">
            <Row>
                <Col span={8}>Your score in this chapter</Col>
                <Col span={8}>Your score in this chapter</Col>
                <Col span={8}>Your score in this chapter</Col>
            </Row>
            </div>
        </div>
    );
}

export default ResultComponent;