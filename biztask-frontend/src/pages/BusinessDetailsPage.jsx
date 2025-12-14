import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBusinessById } from "../Redux/Business/Action.js";

import BusinessDetails from '../components/BusinessDetails/BusinessDetails.jsx';
import ImageZoom from '../components/ContactInformation/ImageZoom.jsx';
import { AnimatePresence } from 'framer-motion';
const BusinessDetailsPage = ({ userDetails }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const businessStore = useSelector(store => store.businessStore);
  const isLoading = useSelector(store => store.businessStore.isLoading);


  useEffect(() => {
    if (jwt && id) {
      dispatch(getBusinessById(id));
    }
  }, [jwt, id, dispatch]);

  const [showImageModal, setShowImageModal] = useState(false);

const OwnerDetails=businessStore?.business?.user;



  return (
    <>
    
 <BusinessDetails
      BusiDetails={businessStore?.business}
      OwnerDetails={OwnerDetails}
      serviceHeader={"Owner Details "}
      LogedInUser={userDetails}
      showImageModal={showImageModal}
      setShowImageModal={setShowImageModal}
      isLoading={isLoading} 
       isBusiness={true}
      
      />

     <AnimatePresence>
        {showImageModal && (
          <ImageZoom
            setShowImageModal={setShowImageModal}
            profileImage={OwnerDetails?.profileImage?.ImageUrl}
          />
        )}
      </AnimatePresence>
      

    </>
   
  )
};

export default BusinessDetailsPage;