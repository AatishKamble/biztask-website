import { useEffect, useRef, useState } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate, useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection/HeroSection.jsx';
import PopularServices from '../components/PopularServices/PopularServices.jsx';
import FeaturedJob from '../components/FeaturedJob/FeaturedJob.jsx';
import HowItWorks from '../components/HowItWorks/HowItWorks.jsx';
import WebsiteReviews from '../components/WebsiteReviews/WebsiteReviews.jsx';
import ScrollToTop from '../components/ScrollTo/ScrollToTop.jsx';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../Redux/Auth/Action.js';
const Home = () => {
  const navigate = useNavigate();

  const HowItWorksRef=useRef(null);
  const location=useLocation();

useEffect(()=>{

  if(location.hash==="#how-it-works" && HowItWorksRef.current){
    const offset=-40;
     const elementPostion=HowItWorksRef.current.getBoundingClientRect().top+window.scrollY;
     const offsetPostion=elementPostion+offset;
  
     window.scrollTo({
      top:offsetPostion,
      behavior:"smooth"
     })
  }
},[location,HowItWorksRef])


const dispatch=useDispatch();
  useEffect(() => {
    
    if (location.pathname === '/auth/google/callback') {
   
      const params = new URLSearchParams(window.location.search);
      const retrievedToken = params.get('token');
      if (retrievedToken) {
        localStorage.setItem('jwt', retrievedToken);
        const jwt=localStorage.getItem("jwt");
        // window.location.reload();
        dispatch(getUserProfile(jwt));
      
          navigate('/');
        
    
      } 
    }
  }, [location, navigate]);

 
  return (
    <>
   
      <HeroSection />
      <PopularServices />
      <FeaturedJob />
      <HowItWorks HowItWorks={HowItWorksRef}/>
   
    </>
  );
};

export default Home;
