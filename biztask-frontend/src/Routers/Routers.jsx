import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import ForgotPassword from "../components/Login/ForgotPassword.jsx";
import ResetPassword from "../components/Login/ResetPassword.jsx";
import Loader from "../components/Loader/Loader.jsx";
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

const location=useLocation();

//for loading 
const isAuthLoading = useSelector((state) => state.auth.isLoading);
const isBusinessLoading = useSelector((state) => state.businessStore.isLoading);
const isServiceLoading = useSelector((state) => state.serviceStore.isLoading);
const isJobLoading = useSelector((state) => state.jobStore.isLoading);
const isReviewLoading = useSelector((state) => state.reviewStore.isLoading);

const isLoading = isAuthLoading || isBusinessLoading || isServiceLoading || isJobLoading || isReviewLoading ;


  return (
    <>
    {
      isLoading && <div className='fixed inset-0 bg-[#000000] opacity-90 z-40'></div> 
         
    }
    {isLoading &&  <div className='fixed inset-0 flex items-center justify-center z-50'><Loader/></div>}

     
        <ScrollToTop />
        {
        (  !location.pathname.startsWith("/reset-password") && !location.pathname.startsWith("/forgot-password"))&&
        <Navbar userDetails={auth.user} login={login} handleLogInButtonClick={handleLogInButtonClick} handleSignUpButtonClick={handleSignUpButtonClick}  signUp={signUp} />
}
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
    <Route path="/forgot-password" element={<ForgotPassword />}/>
    
    <Route path="/reset-password/:id/:token" element={<ResetPassword />}/>
  
        </Routes>
        {
           (!location.pathname.startsWith("/reset-password")&& !location.pathname.startsWith("/forgot-password"))&&
       
        <Footer userDetails={auth.user} handleLogInButtonClick={handleLogInButtonClick}/>
        }
    </>
  )
}

export default Routers