import {
    BUSINESS_REGISTER_REQUEST,
    BUSINESS_REGISTER_SUCCESS,
    BUSINESS_REGISTER_FAILURE,
    BUSINESS_UPDATE_REQUEST,
    BUSINESS_UPDATE_SUCCESS,
    BUSINESS_UPDATE_FAILURE,
    BUSINESS_REMOVE_REQUEST,
    BUSINESS_REMOVE_SUCCESS,
    BUSINESS_REMOVE_FAILURE,
    BUSINESS_GET_BY_ID_REQUEST,
    BUSINESS_GET_BY_ID_SUCCESS,
    BUSINESS_GET_BY_ID_FAILURE
} from './ActionType.js';


const initialState = {
    message: null,
    error: null,
    isLoading: null,
    businesses: [],
    business:{}
}

export const businessReducer = (state = initialState, action) => {

    switch (action.type) {
        case BUSINESS_REGISTER_REQUEST:
        case BUSINESS_UPDATE_REQUEST:
        case BUSINESS_REMOVE_REQUEST:
        case BUSINESS_GET_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            };


        case BUSINESS_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                businesses: [...state.businesses, action.payload],
            };

        case BUSINESS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                businesses: state.businesses.map(business =>
                    business._id === action.payload._id ? action.payload : business
                )
            };

        case BUSINESS_REMOVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message:action.payload
            }

            case BUSINESS_GET_BY_ID_SUCCESS:
        return {
            ...state,
            loading: false,
            business: action.payload // store the retrieved business details
        };

        case BUSINESS_REGISTER_FAILURE:
        case BUSINESS_UPDATE_FAILURE:
        case BUSINESS_REMOVE_FAILURE:
        case BUSINESS_GET_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;

    }
}

