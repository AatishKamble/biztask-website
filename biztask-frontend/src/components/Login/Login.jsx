import Modal from 'react-modal';
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../../Redux/Auth/Action.js';
import { useEffect } from 'react';
import {API_BASE_URL} from "../../configApi/ConfigApi.js";
import FormUI from './FormUI.jsx';

const Login = (props) => {



  return (
    <>

      <FormUI type={props.type} openState={props.openState} handleButtonClick={props.handleButtonClick} handleButtonClick2={props.handleSignUpButtonClick} />

    </>
  )
}

export default Login