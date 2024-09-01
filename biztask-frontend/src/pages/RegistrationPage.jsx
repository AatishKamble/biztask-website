import React from 'react'
import BusinessRegistration from '../components/Forms/BusinessRegistration'

const RegistrationPage = ({userDetails,registration}) => {
  return (
    <>
    <BusinessRegistration userDetails={userDetails} registration={registration}/>
    </>
  )
}

export default RegistrationPage