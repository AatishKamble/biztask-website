import axios from "axios";
import { API_BASE_URL } from "../../configApi/ConfigApi.js";
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT,
    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_FAILURE,
    APPLY_JOB_REQUEST,
    APPLY_JOB_SUCCESS,
    APPLY_JOB_FAILURE,
    FORGOT_PASSWORD_REQUEST,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAILURE,
RESET_PASSWORD_REQUEST,
RESET_PASSWORD_SUCCESS,
RESET_PASSWORD_FAILURE,
SEND_OTP_REQUEST, 
SEND_OTP_SUCCESS, 
SEND_OTP_FAILURE,
    VERIFY_OTP_REQUEST, 
    VERIFY_OTP_SUCCESS, 
    VERIFY_OTP_FAILURE
} from "./ActionType.js";
import { getJobById } from "../Job/Action.js";
import { toast } from "react-toastify";



const signUpRequest = () => ({ type: SIGNUP_REQUEST });
const signUpSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
const signUpFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

const updateUserProfileRequest = () => ({ type: UPDATE_USER_DETAILS_REQUEST });
const updateUserProfileSuccess = (user, message) => ({ type: UPDATE_USER_DETAILS_SUCCESS, payload: { user, message } });
const updateUserProfileFailure = (error) => ({ type: UPDATE_USER_DETAILS_FAILURE, payload: error });


const applyJobRequest = () => ({ type: APPLY_JOB_REQUEST });
const applyJobSuccess = (user, message) => ({ type: APPLY_JOB_SUCCESS, payload: { user, message } });
const applyJobFailure = (error) => ({ type: APPLY_JOB_FAILURE, payload: error });

const forgotPasswordRequest=()=>({type:FORGOT_PASSWORD_REQUEST});
const forgotPasswordSuccess=(message)=>({type:FORGOT_PASSWORD_SUCCESS,payload:message});
const forgotPasswordFailure=(error)=>({type:FORGOT_PASSWORD_FAILURE,payload:error});

const resetPasswordRequest=()=>({type:RESET_PASSWORD_REQUEST});
const resetPasswordSuccess=(message)=>({type:RESET_PASSWORD_SUCCESS,payload:{message}});
const resetPasswordFailure=(error)=>({type:RESET_PASSWORD_FAILURE,payload:error});


export const sendOtpRequest = () => ({
    type: SEND_OTP_REQUEST,
});

export const sendOtpSuccess = (message) => ({
    type: SEND_OTP_SUCCESS,
    payload: message,
});

export const sendOtpFailure = (error) => ({
    type: SEND_OTP_FAILURE,
    payload: error,
});


export const verifyOtpRequest = () => ({
    type: VERIFY_OTP_REQUEST,
});

export const verifyOtpSuccess = (message) => ({
    type: VERIFY_OTP_SUCCESS,
    payload: message,
});

export const verifyOtpFailure = (error) => ({
    type: VERIFY_OTP_FAILURE,
    payload: error,
});



const register = (userData) => async (dispatch) => {
    dispatch(signUpRequest());
    try {
        const res = await axios.post(`${API_BASE_URL}/api/user/signUp`, userData);
        const user = res.data;
        if (user.success == true) {
       
            localStorage.setItem("jwt", user.token);
            window.scrollTo(0,0);
            dispatch(signUpSuccess(user.token));
             return { success: true, message: user.message };
        }
        else {
            throw new Error(user.message);
        }


    } catch (error) {

        dispatch(signUpFailure(error.message));
       return { success: false, message: error.message };
    }

}


const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());
    try {

        const response = await axios.post(`${API_BASE_URL}/api/user/signIn`, userData);
        const user = response.data;
        if (user.success == true) {
            localStorage.setItem("jwt", user.token);
           window.scrollTo(0,0);
            dispatch(loginSuccess(user.token));
          
             return { success: true, message: user.message };
        }
        else {
            throw new Error(user.message);
        }

    } catch (error) {
        dispatch(loginFailure(error.message));
        return { success: false, message: error.message };
    }

}



const getUserProfile = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            headers: {
                "authorization": `Bearer ${jwt}`
            }
        });

        const users = response.data;
 
        if (users.success == true) {
            dispatch(getUserSuccess(users.user));
        }
        else {
            throw new Error(users.message);
        }

    } catch (error) {
        dispatch(getUserFailure(error.message));
        // toast.error(error.message);
    }

}


const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    toast.success("Loged Out Successfully")
    localStorage.clear();
}

const updateUserProfile = (jwt, userData) => async (dispatch) => {
    dispatch(updateUserProfileRequest());
    try {

     

        const response = await axios.patch(`${API_BASE_URL}/api/user/profile-update`, userData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });

        const newUser = response.data;

        if (newUser.success == true) {
            // window.location.reload();
            dispatch(updateUserProfileSuccess(newUser.user, newUser.message));
            toast.success(newUser.message);
             return { success: true };
        }
        else {
            throw new Error(newUser.message);
        }


    } catch (error) {
        dispatch(updateUserProfileFailure(error.message));
        toast.error(error.message);
         return { success: false};
    }
}
//apply
const applyForJob = (jwt,formData) => async (dispatch) => {
    dispatch(applyJobRequest());
    try {

        const response = await axios.patch(`${API_BASE_URL}/api/user/apply`,formData,{
            headers: {
                "authorization": `Bearer ${jwt}`,
            }
        });

        const newUser = response.data;

        if (newUser.success == true) {
         
            dispatch(applyJobSuccess(newUser.user, newUser.message));
            dispatch(getUserProfile(jwt));
           
             return { success: true, message: newUser.message };
        }
        else {
            throw new Error(newUser.message);
        }


    } catch (error) {
        dispatch(applyJobFailure(error.message));
        return { success: false, message: error.message };
    }
}




//forgotPassword
const forgotPassword = (formData) => async (dispatch) => {
    dispatch(forgotPasswordRequest());
    try {

        const response = await axios.post(`${API_BASE_URL}/api/user/forgot-password`,formData);

        const newUser = response.data;

        if (newUser.success == true) {
           
            dispatch(forgotPasswordSuccess(newUser.message));
           return { success: true, message: newUser.message };
           
        }
        else {
            throw new Error(newUser.message);
        }


    } catch (error) {
        dispatch(forgotPasswordFailure(error.message));
       return { success: false, message: error.message };
    }
}


//reset password

const resetPassword = (formData,id,token) => async (dispatch) => {
    dispatch(resetPasswordRequest());
    try {

        const response = await axios.post(`${API_BASE_URL}/api/user/reset-password/${id}/${token}`,formData);

        const newUser = response.data;

        if (newUser.success == true) {
           
            dispatch(resetPasswordSuccess(newUser.message));
           return { success: true, message: newUser.message};
           
        }
        else {
            throw new Error(newUser.message);
        }


    } catch (error) {
        dispatch(resetPasswordFailure(error.message));
        return { success: false, message: error.message };
    }
}

const sendOtp = (email) => async (dispatch) => {
    dispatch(sendOtpRequest());

    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/user/send-otp`,
            { email }
        );

        const data = response.data;

        if (data.success === true) {
            dispatch(sendOtpSuccess(data.message));
            return { success: true, message: data.message };
        } else {
            throw new Error(data.message || "Failed to send OTP");
        }

    } catch (error) {
        const msg =  error.message || "Network error. Try again.";
        dispatch(sendOtpFailure(msg));
        return { success: false, message: msg };
    }
};


 const verifyOtp = (email, otp) => async (dispatch) => {
    dispatch(verifyOtpRequest());

    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/user/verify-otp`,
            { email, otp }
        );

        const data = response.data;

        if (data.success === true) {
            dispatch(verifyOtpSuccess(data.message));
            return { success: true, message: data.message };
        } else {
            throw new Error(data.message || "Invalid or expired OTP");
        }

    } catch (error) {
        const msg =error.message || "Network error. Try again.";
        dispatch(verifyOtpFailure(msg));
        return { success: false, message: msg };
    }
};



export { register, login, getUserProfile, logout, updateUserProfile, applyForJob,forgotPassword,resetPassword,sendOtp,verifyOtp };
