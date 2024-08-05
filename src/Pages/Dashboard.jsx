import "./Dashboard.css"
import Navbar from "../Components/Navbar";
import UnEnrolledCourses from "../Components/UnEnrolledCourses";
import EnrolledCourses from "../Components/EnrolledCourses";

const Dashboard = () => {
    return (<div>
        <Navbar />
        <div className="content">
            <p>👋  Welcome to your dashboard</p>
            <EnrolledCourses />
            <p>Explore other courses</p>
            <UnEnrolledCourses />
        </div>
        
    </div>);
}

export default Dashboard;