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


const initialState = {
    user: null,
    error: null,
    jwt: null,
    isLoading: null
};


export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload }

        case SIGNUP_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload }

        case LOGOUT:
            return { ...initialState }
        default:
            return state;

    }


};

