import React, { useEffect } from 'react'
import BusinessRegistration from '../components/Forms/BusinessRegistration'

const BusinessUpdate = ({userDetails,registration}) => {



  return (
    <>
    <BusinessRegistration userDetails={userDetails}  registration={registration}/>
    </>
  )
}

export default BusinessUpdate