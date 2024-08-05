import './SummaryComponent.css'

const SummaryComponent = (content) => {
    console.log(content.content.ownerContent.content);
    return (
        <div className='summary-container' dangerouslySetInnerHTML={{ __html: content.content.ownerContent.content }}>
        </div>
    );
}

export default SummaryComponent;