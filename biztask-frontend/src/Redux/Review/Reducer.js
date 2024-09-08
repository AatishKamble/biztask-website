import {
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAILURE,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAILURE,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAILURE,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILURE
} from "./ActionType.js";

const initialState = {
    message: null,
    error: null,
    isLoading: null,
    reviews: [],
    review: {}
}



export const reviewReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            case GET_REVIEWS_REQUEST:
                case UPDATE_REVIEW_REQUEST:
                    case DELETE_REVIEW_REQUEST:

            return {
                ...state,
                isLoading: true
            };

        case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                reviews:[...state.reviews,action.payload.review],
                message: action.payload.message
            };


            case GET_REVIEWS_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    reviews:action.payload
                };

                case UPDATE_REVIEW_SUCCESS:
                    return {
                        ...state,
                        isLoading: false,
                        reviews:state.reviews.map(review=>(
                            review._id!==action.payload.review._id?review:action.payload.review
                        )),
                        message:action.payload.message
                    }; 


                    case DELETE_REVIEW_SUCCESS:
                        return {
                            ...state,
                            isLoading: false,
                            reviews:state.reviews.filter(review=>(
                                review._id!==action.payload.review._id
                            )),
                            message:action.payload.message
                        }; 

        
        case ADD_REVIEW_FAILURE:
            case GET_REVIEWS_FAILURE:
                case UPDATE_REVIEW_FAILURE:
                case DELETE_REVIEW_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
}
