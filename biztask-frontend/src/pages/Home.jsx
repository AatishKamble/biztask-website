import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate, useLocation } from 'react-router-dom';

import HeroSection from '../components/HeroSection/HeroSection.jsx';
import PopularServices from '../components/PopularServices/PopularServices.jsx';
import FeaturedJob from '../components/FeaturedJob/FeaturedJob.jsx';
import HowItWorks from '../components/HowItWorks/HowItWorks.jsx';
import WebsiteReviews from '../components/WebsiteReviews/WebsiteReviews.jsx';

const Home = ({ howItWorkRef }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    if (location.pathname === '/auth/google/callback') {
   
      const params = new URLSearchParams(window.location.search);
      const retrievedToken = params.get('token');
      if (retrievedToken) {
        localStorage.setItem('jwt', retrievedToken);
          navigate('/');
     
      } 
    }
  }, [location, navigate]);

 
  return (
    <>
      <HeroSection />
      <PopularServices />
      <FeaturedJob />
      <HowItWorks refh={howItWorkRef} />
      <WebsiteReviews />
    </>
  );
};

export default Home;
