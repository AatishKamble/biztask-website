import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
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

const Routers = () => {
    const howItWorkRef = useRef(null);
  
    const scrollToSection = (sectionRef) => {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  return (
   <>

   <Router>
   <Navbar scrollToSection={scrollToSection} howItWorkRef={howItWorkRef}/>
<Routes>
<Route path="/" element={<Home howItWorkRef={howItWorkRef}/>} />
<Route path="/profile" element={<ProfilePage />} />
<Route path="/profile-edit" element={<ProfileEdit />} />
<Route path="/bussiness-registration" element={<RegistrationPage />} />
<Route path="/service-detail" element={<ServiceDetailPage />}/>
<Route path="/job-post" element={<JobPostPage />}/>
<Route path="/job-detail" element={<JobDetail />}/>
<Route path="/jobs" element={<SearchJobs />}/>
<Route path="/services" element={<SearchService />}/>
<Route path="/about-us" element={<AboutUs />}/>
<Route path="/auth/google/callback" element={<Home />} />
<Route path="/service-registration" element={<ServiceRegistration />} />


</Routes>
<Footer />
   </Router>
   </>
  )
}

export default Routers