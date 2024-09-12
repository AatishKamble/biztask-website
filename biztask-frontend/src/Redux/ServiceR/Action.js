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
    UPLOAD_IMAGE_FAILURE

} from './ActionType.js';

import { getBusinessById } from '../Business/Action.js';


import { API_BASE_URL } from '../../configApi/ConfigApi.js';
import axios from 'axios';
import { toast } from 'react-toastify';


// Register Business Actions
const registerServiceRequest = () => ({
    type: SERVICE_REGISTER_REQUEST
});

const registerServiceSuccess = (message) => ({
    type: SERVICE_REGISTER_SUCCESS,
    payload: message
});

const registerServiceFailure = (error) => ({
    type: SERVICE_REGISTER_FAILURE,
    payload: error
});

//get service
const getServiceByIdRequest = () => ({
    type: SERVICE_GET_BY_ID_REQUEST
});

const getServiceByIdSuccess = (service) => ({
    type: SERVICE_GET_BY_ID_SUCCESS,
    payload: service
});

const getServiceByIdFailure = (error) => ({
    type: SERVICE_GET_BY_ID_FAILURE,
    payload: error
});


//remove 
const removeServiceRequest = () => ({
    type: SERVICE_REMOVE_REQUEST
});

const removeServiceSuccess = (message) => ({
    type: SERVICE_REMOVE_SUCCESS,
    payload: message
});

const removeServiceFailure = (error) => ({
    type: SERVICE_REMOVE_FAILURE,
    payload: error
});


//update service
const updateServiceRequest = () => ({
    type: SERVICE_UPDATE_REQUEST
});

const updateServiceSuccess = (service) => ({
    type: SERVICE_UPDATE_SUCCESS,
    payload: service
});

const updateServiceFailure = (error) => ({
    type: SERVICE_UPDATE_FAILURE,
    payload: error
});


const getAllServicesRequest = () => ({
    type: GET_ALL_SERVICE_REQUEST
});

const getAllServicesSuccess = (service) => ({
    type: GET_ALL_SERVICE_SUCCESS,
    payload: service
});

const getAllServicesFailure = (error) => ({
    type: GET_ALL_SERVICE_FAILURE,
    payload: error
});



//upload previous work images
export const uploadImageRequest = () => ({
    type: UPLOAD_IMAGE_REQUEST,
  });
  
  export const uploadImageSuccess = (message,service) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: {message,service},
  });
  
  export const uploadImageFailure = (error) => ({
    type: UPLOAD_IMAGE_FAILURE,
    payload: error,
  });

//register service

const serviceRegister = (serviceData, jwt) => async (dispatch) => {
    dispatch(registerServiceRequest());
    try {

        const response = await axios.post(`${API_BASE_URL}/api/services/register`, serviceData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });

        const newService = response.data;
    
        if (newService.success == true) {
            // window.location.reload();
            dispatch(registerServiceSuccess(newService.message));
            dispatch(getBusinessById(newService.service.bussiness));
            toast.success(newService.message);
        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {

        dispatch(registerServiceFailure(error.message));
        toast.error(error.message);
    }

}


//get service
const getServiceById = (serviceId) => async (dispatch) => {
    dispatch(getServiceByIdRequest());
    try {

        const response = await axios.get(`${API_BASE_URL}/api/services/details/${serviceId}`);



        const newService = response.data;
      

        if (newService.success == true) {

            dispatch(getServiceByIdSuccess(newService.service));
        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {
        dispatch(getServiceByIdFailure(error.message));
        toast.error(error.message)
    }
}

const removeService = (jwt, serviceId, businessId) => async (dispatch) => {
    dispatch(removeServiceRequest());
    try {

        const response = await axios.delete(`${API_BASE_URL}/api/services/remove/${serviceId}?businessId=${businessId}`, {
            headers: {
                "authorization": `Bearer ${jwt}`,
            }
        });



        const newService = response.data;

        if (newService.success == true) {
            dispatch(removeServiceSuccess(newService.message));
            dispatch(getBusinessById(newService.service.bussiness._id));
                toast.success(newService.message);
        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {
        dispatch(removeServiceFailure(error.message));
        toast.error(error.message);
    }
}


//update service

const updateService = (jwt, serviceData, serviceId) => async (dispatch) => {
    dispatch(updateServiceRequest());
    try {

        const response = await axios.patch(`${API_BASE_URL}/api/services/update/${serviceId}`, serviceData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });



        const newService = response.data;

        if (newService.success == true) {

            dispatch(updateServiceSuccess(newService.service));
dispatch(getServiceById(newService.service._id))
            toast.success(newService.message);

        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {
        dispatch(updateServiceFailure(error.message));
        toast.error(error.message);
    }
}



//get all services
const getAllServices = (reqData) => async (dispatch) => {
    dispatch(getAllServicesRequest());
    try {

        const {
            serviceName,
            serviceLocation,
            minPrice,
            maxPrice,
            rating,
            page,
            limit
        } = reqData;

        const response = await axios.get(`${API_BASE_URL}/api/services/all?serviceName=${serviceName}&serviceLocation=${serviceLocation}&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}&page=${page}&limit=${limit}`);
        const allServices = response.data;
     
        if (allServices.success == true) {
            dispatch(getAllServicesSuccess(allServices));

        }
    } catch (error) {
        dispatch(getAllServicesFailure(error.message));
        toast.error(error.message);
    }

}



//upload image

const uploadImage = (formData, jwt) => async (dispatch) => {
    dispatch(uploadImageRequest());
    try {
        
        const response = await axios.post(`${API_BASE_URL}/api/services/upload`, formData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });
       
        const newService = response.data;
   
        if (newService.success == true) {
            // window.location.reload();
            dispatch(uploadImageSuccess(newService.message,newService.service));
            toast.success(newService.message);
        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {

        dispatch(uploadImageFailure(error.message));
        toast.error(error.message);
    }

}


export {
    serviceRegister,
    getServiceById,
    removeService,
    updateService,
    getAllServices,
    uploadImage

}