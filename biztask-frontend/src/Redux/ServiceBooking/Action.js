import {
  SERVICE_BOOKING_CREATE_REQUEST,
  SERVICE_BOOKING_CREATE_SUCCESS,
  SERVICE_BOOKING_CREATE_FAILURE,
  GET_MY_BOOKINGS_REQUEST,
  GET_MY_BOOKINGS_SUCCESS,
  GET_MY_BOOKINGS_FAILURE,

  GET_PROVIDER_BOOKINGS_REQUEST,
  GET_PROVIDER_BOOKINGS_SUCCESS,
  GET_PROVIDER_BOOKINGS_FAILURE,

  SEND_COMPLETION_OTP_REQUEST,
  SEND_COMPLETION_OTP_SUCCESS,
  SEND_COMPLETION_OTP_FAILURE,

  VERIFY_COMPLETION_OTP_REQUEST,
  VERIFY_COMPLETION_OTP_SUCCESS,
  VERIFY_COMPLETION_OTP_FAILURE,

  PROVIDER_CANCEL_BOOKING_REQUEST,
  PROVIDER_CANCEL_BOOKING_SUCCESS,
  PROVIDER_CANCEL_BOOKING_FAILURE,

  SEEKER_CANCEL_BOOKING_FAILURE,
  SEEKER_CANCEL_BOOKING_REQUEST,
  SEEKER_CANCEL_BOOKING_SUCCESS,

} from "./ActionType.js";

import { API_BASE_URL } from '../../configApi/ConfigApi.js';
import axios from 'axios';

const createBookingRequest = () => ({
  type: SERVICE_BOOKING_CREATE_REQUEST
});


const createBookingSuccess = (data) => ({
  type: SERVICE_BOOKING_CREATE_SUCCESS,
  payload: data
});

const createBookingFailure = (error) => ({
  type: SERVICE_BOOKING_CREATE_FAILURE,
  payload: error
});

const createServiceBooking = (bookingData, jwt) => async (dispatch) => {

  dispatch(createBookingRequest());

  try {

    const response = await axios.post(
      `${API_BASE_URL}/api/service-booking/create`,
      bookingData,
      {
        headers: {
          "authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        }
      }
    );

    const result = response.data;


    if (result.success === true) {

      dispatch(createBookingSuccess(result));

     
    }
    else {
      dispatch(createBookingFailure(result.message));
    }

  } catch (error) {

    dispatch(createBookingFailure(error?.response?.data?.message));
    
  }
};


const getMyBookings = (jwt) => async (dispatch) => {
  dispatch({ type: GET_MY_BOOKINGS_REQUEST });

  try {
    const res = await axios.get(`${API_BASE_URL}/api/service-booking/my-bookings`, {
      headers: { authorization: `Bearer ${jwt}` }
    });

 

      if (res?.data?.success) {
      dispatch({   type: GET_MY_BOOKINGS_SUCCESS, payload: res?.data?.bookings});
    }

    else {
      dispatch({
       type: GET_MY_BOOKINGS_FAILURE,
        payload: res?.data?.message ,
      });
    }

  } catch (error) {
    dispatch({
      type: GET_MY_BOOKINGS_FAILURE,
      payload: error?.response?.data?.message
    });
  }
};



//provider service bookings
const getProviderBookings = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROVIDER_BOOKINGS_REQUEST });

  try {
    const res = await axios.get(`${API_BASE_URL}/api/service-booking/provider-bookings`, {
      headers: { authorization: `Bearer ${jwt}` }
    });




      if (res?.data?.success) {
      dispatch({  type: GET_PROVIDER_BOOKINGS_SUCCESS, payload: res?.data });
    }

    else {
      dispatch({
        type: GET_PROVIDER_BOOKINGS_FAILURE,
        payload: res?.data?.message ,
      });
    }

  } catch (error) {
    dispatch({
      type: GET_PROVIDER_BOOKINGS_FAILURE,
      payload: error?.response?.data?.message
    });
  }
};



const sendCompletionOTP = (id, jwt) => async dispatch => {
  dispatch({ type: SEND_COMPLETION_OTP_REQUEST });

  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/service-booking/send-completion-otp/${id}`,
      { headers: { Authorization: `Bearer ${jwt}` } }
    );



    if (res?.data?.success) {
      dispatch({ type: SEND_COMPLETION_OTP_SUCCESS, payload: res?.data });
    }

    else {
      dispatch({
        type: SEND_COMPLETION_OTP_FAILURE,
        payload: res?.data?.message ,
      });
    }

  } catch (error) {
    dispatch({
      type: SEND_COMPLETION_OTP_FAILURE,
      payload: error?.response?.data?.message
    });

  }
};



const verifyCompletionOTP = (id, otp, jwt) => async dispatch => {
  dispatch({ type: VERIFY_COMPLETION_OTP_REQUEST });

  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/service-booking/verify-completion-otp/${id}`,
      { otp },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );



    if (res?.data?.success) {
      dispatch({ type: VERIFY_COMPLETION_OTP_SUCCESS, payload: { booking: res?.data?.booking, message: res?.data?.message } });

    }

    else {
      dispatch({
        type: VERIFY_COMPLETION_OTP_FAILURE,
        payload: res?.data?.message ,
      });
    }

  } catch (error) {
    dispatch({
      type: VERIFY_COMPLETION_OTP_FAILURE,
      payload: error?.response?.data?.message
    });

  }
};


const cancelProviderBooking = (bookingId, jwt) => async dispatch => {
  dispatch({ type: PROVIDER_CANCEL_BOOKING_REQUEST });

  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/service-booking/provider/cancel/${bookingId}`,
      {},
      { headers: { Authorization: `Bearer ${jwt}` } }
    );


    if (res?.data?.success) {

      dispatch({
        type: PROVIDER_CANCEL_BOOKING_SUCCESS,
        payload: res?.data,
      });

    }

    else {
      dispatch({
        type: PROVIDER_CANCEL_BOOKING_FAILURE,
        payload: res?.data?.message || "Failed to cancel booking",
      });
    }


  } catch (error) {
    dispatch({
      type: PROVIDER_CANCEL_BOOKING_FAILURE,
      payload: error?.response?.data?.message || "Failed to cancel booking",
    });
  }
};

const cancelSeekerBooking = (bookingId, jwt) => async dispatch => {
  dispatch({ type: SEEKER_CANCEL_BOOKING_REQUEST });

  try {
    const res = await axios.put(
      `${API_BASE_URL}/api/service-booking/seeker/cancel/${bookingId}`,
      {},
      { headers: { Authorization: `Bearer ${jwt}` } }
    );


    if (res?.data?.success) {

      dispatch({
        type: SEEKER_CANCEL_BOOKING_SUCCESS,
        payload: res?.data,
      });

    }

    else {

      dispatch({
        type: SEEKER_CANCEL_BOOKING_FAILURE,
        payload: res?.data?.message || "Failed to cancel booking",
      });
    }

  } catch (error) {

    dispatch({
      type: SEEKER_CANCEL_BOOKING_FAILURE,
      payload: error?.response?.data?.message || "Failed to cancel booking",
    });
  }
};

export {
  createServiceBooking,
  getProviderBookings,
  getMyBookings,
  sendCompletionOTP,
  verifyCompletionOTP,
  cancelProviderBooking,
  cancelSeekerBooking
}