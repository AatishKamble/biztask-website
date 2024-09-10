import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Navbar from '../components/Navbar/Navbar.jsx'
import React, { useRef } from 'react';
import Footer from '../components/Footer/Footer.jsx'
import ProfilePage from "../pages/ProfilePage.jsx";
import ProfileEdit from "../components/Forms/ProfileEdit.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import ServiceDetailPage from "../pages/ServiceDetailPage.jsx";
import JobPostPage from "../pages/JobPostPage.jsx";
import JobDetail from "../components/JobTemplate/JobDetail.jsx";
import SearchJobs from "../pages/SearchJobs.jsx";
import SearchService from "../pages/SearchService.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import ServiceRegistration from "../components/Forms/ServiceRegistration.jsx";
import { getUserProfile} from "../Redux/Auth/Action.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import BusinessDetails from "../pages/BusinessDetails.jsx";
import ScrollToTop from "../components/ScrollTo/ScrollToTop.jsx";
import PeopleApplied from "../components/JobTemplate/PeopleApplied.jsx";
import { toast } from "react-toastify";
const Routers = () => {
  
  const auth = useSelector((store )=> store.auth);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
 

  useEffect(() => {
    if (jwt && !auth.user) { // Fetch only if the user data is not already available
        dispatch(getUserProfile(jwt));
      
    }
    
}, [jwt, auth.user, dispatch]);
const [login, setLogin] = useState(false);
const [signUp, setSignUp] = useState(false);
const handleLogInButtonClick = () => {
  setLogin(!login);

}

const handleSignUpButtonClick = () => {
  setSignUp(!signUp);
}

  return (
    <>

      <Router>
        <ScrollToTop />
        <Navbar userDetails={auth.user} login={login} handleLogInButtonClick={handleLogInButtonClick} handleSignUpButtonClick={handleSignUpButtonClick}  signUp={signUp} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage userDetails={auth.user}/>} />
          
          <Route path="/profile-edit" element={<ProfileEdit userDetails={auth.user}/>} />
          <Route path="/bussiness-registration" element={<RegistrationPage userDetails={auth.user} registration={true} />} />
          <Route path="/bussiness-update/:id" element={<RegistrationPage userDetails={auth.user} registration={false}/>} />
          <Route path="/bussiness/details/:id" element={ <BusinessDetails userDetails={auth.user} />} />
         
          <Route path="/service-detail/:id" element={<ServiceDetailPage userDetails={auth.user} />} />
          
          <Route path="/job-post" element={<JobPostPage registration={true}/>} />
          <Route path="/job-update/:id" element={<JobPostPage registration={false}/>} />
          
          <Route path="/job-detail/:id" element={<JobDetail userDetails={auth.user} handleLogInButtonClick={handleLogInButtonClick}/>} />
          <Route path="/job-detail/people-applied/:id" element= { <PeopleApplied />} />
        
          <Route path="/jobs" element={<SearchJobs />} />
          <Route path="/services" element={<SearchService />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/auth/google/callback" element={<Home />} />
          <Route path="/service-registration/:id" element={<ServiceRegistration userDetails={auth.user} registration={true} />} />
          <Route path="/service-update/:id" element={<ServiceRegistration userDetails={auth.user} registration={false}/>} />


        </Routes>
        <Footer userDetails={auth.user} handleLogInButtonClick={handleLogInButtonClick}/>
      </Router>
    </>
  )
}

export default Routers