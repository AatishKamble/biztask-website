import {
    JOB_REGISTER_REQUEST,
    JOB_REGISTER_SUCCESS,
    JOB_REGISTER_FAILURE,
    JOB_GET_BY_ID_REQUEST,
    JOB_GET_BY_ID_SUCCESS,
    JOB_GET_BY_ID_FAILURE,
    JOB_REMOVE_REQUEST,
    JOB_REMOVE_SUCCESS,
    JOB_REMOVE_FAILURE,
    JOB_UPDATE_REQUEST,
    JOB_UPDATE_SUCCESS,
    JOB_UPDATE_FAILURE,
    GET_ALL_JOB_REQUEST,
    GET_ALL_JOB_SUCCESS,
    GET_ALL_JOB_FAILURE
} from './ActionType.js';


const initialState = {
    message: null,
    error: null,
    isLoading: null,
    jobs: [],
    job: {}
}

export const jobReducer = (state = initialState, action) => {

    switch (action.type) {
        case JOB_REGISTER_REQUEST:
        case JOB_GET_BY_ID_REQUEST:
        case JOB_REMOVE_REQUEST:
        case JOB_UPDATE_REQUEST:
            case GET_ALL_JOB_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case JOB_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            };

        case JOB_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                job: action.payload
            };

        case JOB_REMOVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            };

        case JOB_GET_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                job: action.payload
            };

            case GET_ALL_JOB_SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    jobs:action.payload
                }

        case JOB_REGISTER_FAILURE:
        case JOB_GET_BY_ID_FAILURE:
        case JOB_REMOVE_FAILURE:
        case JOB_UPDATE_FAILURE:
            case GET_ALL_JOB_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
}
