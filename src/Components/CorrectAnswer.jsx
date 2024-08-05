import './CorrectAnswer.css'
import thumbs from "../Sources/thumbsup.png" 

const CorrectAnswer = (props) => {
    return (<div className='outer-component-correct'>
        <h5 className='verdict'><img src={thumbs} alt='thumbs up' />Correct Answer!!</h5>
        <p>{props.feedback}</p>
    </div>);
}

export default CorrectAnswer;