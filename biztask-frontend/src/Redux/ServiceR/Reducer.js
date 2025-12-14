import {
    SERVICE_REGISTER_REQUEST,
    SERVICE_REGISTER_SUCCESS,
    SERVICE_REGISTER_FAILURE,
    SERVICE_GET_BY_ID_REQUEST,
    SERVICE_GET_BY_ID_SUCCESS,
    SERVICE_GET_BY_ID_FAILURE,
    SERVICE_REMOVE_REQUEST,
    SERVICE_REMOVE_SUCCESS,
    SERVICE_REMOVE_FAILURE,
    SERVICE_UPDATE_REQUEST,
    SERVICE_UPDATE_SUCCESS,
    SERVICE_UPDATE_FAILURE,
    GET_ALL_SERVICE_REQUEST,
    GET_ALL_SERVICE_SUCCESS,
    GET_ALL_SERVICE_FAILURE,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILURE,
    DELETE_IMAGE_REQUEST,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAILURE,
    DELETE_IMAGE_BY_REVIEW_REQUEST,
   DELETE_IMAGE_BY_REVIEW_SUCCESS,
   DELETE_IMAGE_BY_REVIEW_FAILURE

} from './ActionType.js';


const initialState = {
    message: null,
    error: null,
    isLoading: null,
    services: [],
    imageUploading: false,
    imageDeleting:false,
    service: {}
}

export const serviceReducer = (state = initialState, action) => {

    switch (action.type) {
        case SERVICE_REGISTER_REQUEST:
        case SERVICE_GET_BY_ID_REQUEST:
        case SERVICE_REMOVE_REQUEST:
        case SERVICE_UPDATE_REQUEST:
        case GET_ALL_SERVICE_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case DELETE_IMAGE_REQUEST:
            return {
                ...state,
                imageDeleting: true
            };

        case UPLOAD_IMAGE_REQUEST:
            return {
                ...state,
                imageUploading: true
            };

        case SERVICE_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            };

        case SERVICE_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                service: action.payload
            };

        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                imageUploading: false,
                service: {
                    ...state.service,
                    WorkImage: action.payload.service.WorkImage
                },
                message: action.payload.message
            };

        case DELETE_IMAGE_SUCCESS:
    return {
        ...state,
        imageDeleting: false,
        service: {
            ...state.service,
            WorkImage: state.service.WorkImage.map(workImage => {
                if (workImage._id === action.payload.ids.workPhotoId) {
                    return {
                        ...workImage,
                        photos: workImage.photos.filter(
                            (photo) => photo._id !== action.payload.ids.photoId
                        )
                    };
                }
                return workImage;
            })
        },
        message: action.payload.message,
    };


case DELETE_IMAGE_BY_REVIEW_REQUEST:
    return { ...state };

case DELETE_IMAGE_BY_REVIEW_FAILURE:
    return { 
        ...state,
        error: action.payload 
    };

case DELETE_IMAGE_BY_REVIEW_SUCCESS:
    return {
        ...state,
        service: {
            ...state.service,
            WorkImage: action.payload.workImages    
        },
        message: action.payload.message
    };
case SERVICE_REMOVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            };

        case SERVICE_GET_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                service: action.payload
            }


        case GET_ALL_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                services: action.payload
            }




        case SERVICE_REGISTER_FAILURE:
        case SERVICE_GET_BY_ID_FAILURE:
        case SERVICE_REMOVE_FAILURE:
        case SERVICE_UPDATE_FAILURE:
        case GET_ALL_SERVICE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case UPLOAD_IMAGE_FAILURE:
            return {
                ...state,
                imageUploading: false,
                error: action.payload
            };

        case DELETE_IMAGE_FAILURE:
            return {
                ...state,
                imageDeleting: false,
                error: action.payload
            };

        default:
            return state;

    }
}

