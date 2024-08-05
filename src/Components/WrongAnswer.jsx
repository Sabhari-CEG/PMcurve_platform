import './WrongAnswer.css'
import thumbs from "../Sources/thumbsdown.png" 

const WrongAnswer = (props) => {
    return (<div className='outer-component'>
        <h5 className='verdict'><img src={thumbs} alt='thumbs up' />Wrong answer!!</h5>
        <p>{props.feedback}</p>
    </div>);
}

export default WrongAnswer;