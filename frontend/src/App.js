import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './presenters/SignUp';
import SignIn from './presenters/SignIn';
import ApplicantHomepage from './presenters/ApplicantHomepage';
import RecruiterHomepage from './presenters/RecruiterHomepage';
import Header from './presenters/Header';
import Footer from './presenters/Footer';

function App() {
    return (
      <div>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="applicanthomepage" element={<ApplicantHomepage />} />
            <Route path="recruiterhomepage" element={<RecruiterHomepage />} /> 
            <Route path="*" element={<SignIn />} /> 
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    ); 
}

export default App;