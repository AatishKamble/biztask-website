import axios from "axios";
import {API_BASE_URL} from "../../configApi/ConfigApi.js";
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
    LOGOUT
} from "./ActionType.js";


const signUpRequest=()=>({type:SIGNUP_REQUEST});
const signUpSuccess=(user)=>({type:SIGNUP_SUCCESS,payload:user});
const signUpFailure=(error)=>({type:SIGNUP_FAILURE,payload:error});

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

const getUserRequest = () => ({ type:GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type:GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type:GET_USER_FAILURE, payload: error });


const register=(userData)=> async(dispatch)=>{
dispatch(signUpRequest());
try {
    const res=await axios.post(`${API_BASE_URL}/api/user/signUp`,userData);
    const user=res.data;
    if(user.success==true){
        console.log(user.token)
        localStorage.setItem("jwt",user.token);
        dispatch(signUpSuccess(user.token));
    }
    else{
        throw new Error(user.message);
    }


} catch (error) {
    dispatch(signUpFailure(error.message));
}

}


const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());
    try {
    
        const response = await axios.post(`${API_BASE_URL}/api/user/signIn`,userData);
        const user = response.data;
        if(user.success==true){
            localStorage.setItem("jwt",user.token);
            window.location.reload();
            dispatch(loginSuccess(user.token));
        }
        else{
            throw new Error(user.message);
        }

    } catch (error) {
        dispatch(loginFailure(error.message));
    }

}



const getUserProfile = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            headers: {
                "authorization":`Bearer ${jwt}`
            }
        });

        const users = response.data;
       
        if(users.success==true){
            dispatch(getUserSuccess(users.user));
        }
        else{
            throw new Error(users.message);
        }

    } catch (error) {
        dispatch(getUserFailure(error.message));
    }

}


const logout=()=>(dispatch)=>{
    dispatch({type:LOGOUT});
    localStorage.clear();
}


export {register,login,getUserProfile,logout};
