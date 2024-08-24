import HeroSection from '../components/HeroSection/HeroSection.jsx'
import PopularServices from '../components/PopularServices/PopularServices.jsx'
import FeaturedJob from '../components/FeaturedJob/FeaturedJob.jsx'
import HowItWorks from '../components/HowItWorks/HowItWorks.jsx'
import WebsiteReviews from '../components/WebsiteReviews/WebsiteReviews.jsx'

const Home = ({howItWorkRef}) => {
  return (
    <>
    
    <HeroSection/>
      <PopularServices />
      <FeaturedJob />
      <HowItWorks refh={howItWorkRef}/>
      <WebsiteReviews />
    </>
  )
}

export default Home