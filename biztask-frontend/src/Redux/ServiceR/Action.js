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
    SERVICE_UPDATE_FAILURE

} from './ActionType.js';

import { getBusinessById } from '../Business/Action.js';


import { API_BASE_URL } from '../../configApi/ConfigApi.js';
import axios from 'axios';


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



//register service

const serviceRegister = (serviceData, jwt) => async (dispatch) => {
    dispatch(registerServiceRequest());
    try {
        console.log([...serviceData.entries()]);

        const response = await axios.post(`${API_BASE_URL}/api/services/register`, serviceData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });
        
        const newService = response.data;
        console.log(newService);
        if (newService.success == true) {
            // window.location.reload();
            dispatch(registerServiceSuccess(newService.message));
        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {

        dispatch(registerServiceFailure(error.message));
    }

}


//get service
const getServiceById = (serviceId) => async (dispatch) => {
    dispatch(getServiceByIdRequest());
    try {
      
        console.log("get")
        const response = await axios.get(`${API_BASE_URL}/api/services/details/${serviceId}`);



        const newService = response.data;
console.log("in",newService.service)
        
        if (newService.success == true) {
           
            dispatch(getServiceByIdSuccess(newService.service));
        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {
        dispatch(getServiceByIdFailure(error.message));
    }
}

const removeService = (jwt,serviceId,businessId) => async (dispatch) => {
    dispatch(removeServiceRequest());
    try {

        const response = await axios.delete(`${API_BASE_URL}/api/services/remove/${serviceId}?businessId=${businessId}`,{
            headers: {
                "authorization": `Bearer ${jwt}`,
            }
        });



        const newService = response.data;
  
        if (newService.success == true) {
            dispatch(removeServiceSuccess(newService.message));
      
        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {
        dispatch(removeServiceFailure(error.message));
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
            
        }
        else {
            throw new Error(newService.message);
        }


    } catch (error) {
        dispatch(updateServiceFailure(error.message));
    }
}


export{
    serviceRegister,
    getServiceById,
    removeService,
    updateService

}