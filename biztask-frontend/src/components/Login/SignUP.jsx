import Modal from 'react-modal';
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { register,getUserProfile } from '../../Redux/Auth/Action.js';
import {API_BASE_URL} from "../../configApi/ConfigApi.js";
import { useEffect } from 'react';
import FormUI from './FormUI.jsx';

const SignUP = (props) => {
   


    return (
        <>
<FormUI type={props.type} openState={props.openState} handleButtonClick={props.handleButtonClick} handleButtonClick2={props.handleLogInButtonClick} />


        </>
    )
}

export default SignUP