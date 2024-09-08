import {
    SERVICE_REGISTER_REQUEST,
    SERVICE_REGISTER_SUCCESS,
    SERVICE_REGISTER_FAILURE,
    SERVICE_GET_BY_ID_REQUEST,
    SERVICE_GET_BY_ID_SUCCESS,
    SERVICE_GET_BY_ID_FAILURE,
    SERVICE_REMOVE_REQUEST,
    SERVICE_REMOVE_SUCCESS,
    SERVICE_REMOVE_FAILURE ,
    SERVICE_UPDATE_REQUEST,
    SERVICE_UPDATE_SUCCESS,
    SERVICE_UPDATE_FAILURE,
    GET_ALL_SERVICE_REQUEST,
    GET_ALL_SERVICE_SUCCESS,
    GET_ALL_SERVICE_FAILURE,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE
} from './ActionType.js';


const initialState = {
    message: null,
    error: null,
    isLoading: null,
    services: [],
    service:{}
}

export const serviceReducer = (state = initialState, action) => {

    switch (action.type) {
        case SERVICE_REGISTER_REQUEST:
            case SERVICE_GET_BY_ID_REQUEST:
                case SERVICE_REMOVE_REQUEST:
                    case  SERVICE_UPDATE_REQUEST:
                        case GET_ALL_SERVICE_REQUEST:
                            case UPLOAD_IMAGE_REQUEST:
            return {
                ...state,
                loading: true
            };


        case SERVICE_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                message:action.payload
            };

            case SERVICE_UPDATE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    service:action.payload
                };

                case UPLOAD_IMAGE_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        service:action.payload.service,
                        message:action.payload.message
                    };

            case SERVICE_REMOVE_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    message:action.payload
                };

            case SERVICE_GET_BY_ID_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    service:action.payload
                }

                
            case GET_ALL_SERVICE_SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    services:action.payload
                }
       



        case  SERVICE_REGISTER_FAILURE:
        case SERVICE_GET_BY_ID_FAILURE:
            case SERVICE_REMOVE_FAILURE:
                case SERVICE_UPDATE_FAILURE:
                    case GET_ALL_SERVICE_FAILURE:
                        case   UPLOAD_IMAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;

    }
}

