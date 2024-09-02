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

import { API_BASE_URL } from '../../configApi/ConfigApi.js';
import axios from 'axios';
import {getUserProfile} from "../Auth/Action.js";

// Register Business Actions
const registerBusinessRequest = () => ({
    type: BUSINESS_REGISTER_REQUEST
});

const registerBusinessSuccess = (business) => ({
    type: BUSINESS_REGISTER_SUCCESS,
    payload: business
});

const registerBusinessFailure = (error) => ({
    type: BUSINESS_REGISTER_FAILURE,
    payload: error
});

// Update Business Actions
const updateBusinessRequest = () => ({
    type: BUSINESS_UPDATE_REQUEST
});

const updateBusinessSuccess = (business) => ({
    type: BUSINESS_UPDATE_SUCCESS,
    payload: business
});

const updateBusinessFailure = (error) => ({
    type: BUSINESS_UPDATE_FAILURE,
    payload: error
});

// Remove Business Actions
const removeBusinessRequest = () => ({
    type: BUSINESS_REMOVE_REQUEST
});

const removeBusinessSuccess = (message) => ({
    type: BUSINESS_REMOVE_SUCCESS,
    payload: message
});

const removeBusinessFailure = (error) => ({
    type: BUSINESS_REMOVE_FAILURE,
    payload: error
});


//getBusinessById
const getBusinessByIdRequest = () => ({
    type: BUSINESS_GET_BY_ID_REQUEST
});

const getBusinessByIdSuccess = (business) => ({
    type: BUSINESS_GET_BY_ID_SUCCESS,
    payload: business
});

const getBusinessByIdFailure = (error) => ({
    type: BUSINESS_GET_BY_ID_FAILURE,
    payload: error
});


const businessRegister = (businessData, jwt) => async (dispatch) => {
    dispatch(registerBusinessRequest());
    try {
      
        const response = await axios.post(`${API_BASE_URL}/api/business/register`, businessData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });
        
        const newBusiness = response.data;
        console.log("business",newBusiness.business)
        if (newBusiness.success == true) {
            // window.location.reload();
            dispatch(registerBusinessSuccess(newBusiness.business));
            dispatch(getUserProfile(jwt));
        }
        else {
            throw new Error(newBusiness.message);
        }


    } catch (error) {

        dispatch(registerBusinessFailure(error.message));
    }

}

//update

const updateBusiness = (jwt, businessData, businessId) => async (dispatch) => {
    dispatch(updateBusinessRequest());
    try {

        const response = await axios.patch(`${API_BASE_URL}/api/business/update/${businessId}`, businessData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });



        const newBusiness = response.data;

        if (newBusiness.success == true) {
           
            dispatch(updateBusinessSuccess(newBusiness.business));
            dispatch(getUserProfile(jwt));
        }
        else {
            throw new Error(newBusiness.message);
        }


    } catch (error) {
        dispatch(updateBusinessFailure(error.message));
    }
}


//remove
const removeBusiness = (jwt,businessId) => async (dispatch) => {
    dispatch(removeBusinessRequest());
    try {

        const response = await axios.delete(`${API_BASE_URL}/api/business/remove/${businessId}`, {
            headers: {
                "authorization": `Bearer ${jwt}`,
            }
        });



        const newBusiness = response.data;
     
        if (newBusiness.success == true) {
            dispatch(removeBusinessSuccess(newBusiness.message));
            dispatch(getUserProfile(jwt));
        }
        else {
            throw new Error(newBusiness.message);
        }


    } catch (error) {
        dispatch(removeBusinessFailure(error.message));
    }
}


//getBusinessById
const getBusinessById = (jwt,businessId) => async (dispatch) => {
    dispatch(getBusinessByIdRequest());
    try {
      
        const response = await axios.get(`${API_BASE_URL}/api/business/details/${businessId}`, {
            headers: {
                "authorization": `Bearer ${jwt}`,
            }
        });



        const newBusiness = response.data;
console.log("in",newBusiness)
        
        if (newBusiness.success == true) {
           
            dispatch(getBusinessByIdSuccess(newBusiness.business));
        }
        else {
            throw new Error(newBusiness.message);
        }


    } catch (error) {
        dispatch(getBusinessByIdFailure(error.message));
    }
}

export{
    businessRegister,
    updateBusiness,
    removeBusiness,
    getBusinessById
}





