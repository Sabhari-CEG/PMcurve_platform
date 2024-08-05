import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import TermsOfService from './Pages/TermsOfService';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LinkedinCallback from './Pages/LinkedinCallback';
import Dashboard from './Pages/Dashboard';
import Content from './Pages/Content';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/linkedin/callback' element={<LinkedinCallback />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/course' element={<Content />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
