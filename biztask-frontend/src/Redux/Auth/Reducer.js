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
    APPLY_JOB_FAILURE
} from "./ActionType.js";



const initialState = {
    user: null,
    message:null,
    error: null,
    jwt: null,
    isLoading: null
};


export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case UPDATE_USER_DETAILS_REQUEST:
            case APPLY_JOB_REQUEST:
            return { ...state, isLoading: true, error: null };

        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload }
        
        case UPDATE_USER_DETAILS_SUCCESS:
            return {...state,isLoading:false,error:null,message:action.payload.message,user:action.payload.user};

            case APPLY_JOB_SUCCESS:
                return{
                    ...state,
                    isLoading:false,
                    message:action.payload.message,
                    user:action.payload.user
                }

        case SIGNUP_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            case   APPLY_JOB_FAILURE:
        case UPDATE_USER_DETAILS_FAILURE:
            return { ...state, isLoading: false, error: action.payload }

        case LOGOUT:
            return { ...initialState }
        default:
            return state;

    }


};

