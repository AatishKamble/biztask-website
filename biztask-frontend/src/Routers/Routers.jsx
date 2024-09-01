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
import { useEffect } from "react";
import BusinessDetails from "../pages/BusinessDetails.jsx";
const Routers = () => {
  const howItWorkRef = useRef(null);
  const auth = useSelector(store => store.auth);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (jwt && !auth.user) { // Fetch only if the user data is not already available
        dispatch(getUserProfile(jwt));
        console.log("call in router")
       
    }
}, [jwt, auth.user, dispatch]);


  return (
    <>

      <Router>
        <Navbar scrollToSection={scrollToSection} howItWorkRef={howItWorkRef} userDetails={auth.user} />
        <Routes>
          <Route path="/" element={<Home howItWorkRef={howItWorkRef} />} />
          <Route path="/profile" element={<ProfilePage userDetails={auth.user}/>} />
          <Route path="/profile-edit" element={<ProfileEdit userDetails={auth.user}/>} />
          <Route path="/bussiness-registration" element={<RegistrationPage userDetails={auth.user} registration={true} />} />
          <Route path="/bussiness-update/:id" element={<RegistrationPage userDetails={auth.user} registration={false}/>} />
          <Route path="/bussiness/details/:id" element={ <BusinessDetails userDetails={auth.user} />} />
         
          <Route path="/service-detail" element={<ServiceDetailPage />} />
          <Route path="/job-post" element={<JobPostPage />} />
          <Route path="/job-detail" element={<JobDetail />} />
          <Route path="/jobs" element={<SearchJobs />} />
          <Route path="/services" element={<SearchService />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/auth/google/callback" element={<Home />} />
          <Route path="/service-registration" element={<ServiceRegistration userDetails={auth.user} />} />


        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default Routers