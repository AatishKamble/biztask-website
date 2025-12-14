
import {
  ADMIN_GET_BOOKINGS_REQUEST,
  ADMIN_GET_BOOKINGS_SUCCESS,
  ADMIN_GET_BOOKINGS_FAILURE,
  ADMIN_VERIFY_BOOKING_REQUEST,
  ADMIN_VERIFY_BOOKING_SUCCESS,
  ADMIN_VERIFY_BOOKING_FAILURE,
  ADMIN_REJECT_BOOKING_REQUEST,
  ADMIN_REJECT_BOOKING_SUCCESS,
  ADMIN_REJECT_BOOKING_FAILURE
} from "./ActionType";

import { API_BASE_URL } from '../../configApi/ConfigApi.js';
import axios from 'axios';


// Get all bookings (admin)
export const getAllBookingsAdmin = (jwt) => async (dispatch) => {
  dispatch({ type: ADMIN_GET_BOOKINGS_REQUEST });
  try {

    const { data } = await axios.get(`${API_BASE_URL}/api/admin/bookings`, {
      headers: { authorization: `Bearer ${jwt}` }
    });
 
  
    if (data?.success) {
      dispatch({ type: ADMIN_GET_BOOKINGS_SUCCESS, payload: data?.bookings });
    } 
    else{
       dispatch({ type: ADMIN_GET_BOOKINGS_FAILURE, payload: data?.message   })
    }
  } catch (error) {
    dispatch({ type: ADMIN_GET_BOOKINGS_FAILURE, payload:  error?.response?.data?.message   });
  }
};



// Verify booking
export const verifyBookingAdmin = (bookingId, jwt) => async (dispatch) => {
  dispatch({ type: ADMIN_VERIFY_BOOKING_REQUEST });
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/admin/bookings/${bookingId}/verify`,
      {},
      { headers: { authorization: `Bearer ${jwt}` } }
    );

    if (data?.success) {
      dispatch({ type: ADMIN_VERIFY_BOOKING_SUCCESS, payload: data });
      
    } 
    else{
      dispatch({ type: ADMIN_VERIFY_BOOKING_FAILURE, payload:data?.message  });

    }
  } catch (error) {
    dispatch({ type: ADMIN_VERIFY_BOOKING_FAILURE, payload: error?.response?.data?.message  });
  }
};

// Reject booking
export const rejectBookingAdmin = (bookingId, jwt) => async (dispatch) => {
  dispatch({ type: ADMIN_REJECT_BOOKING_REQUEST });
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/admin/bookings/${bookingId}/reject`,
      {},
      { headers: { authorization: `Bearer ${jwt}` } }
    );

    if (data?.success) {
      dispatch({ type: ADMIN_REJECT_BOOKING_SUCCESS, payload: data });
      
    } 
    else{
       dispatch({ type: ADMIN_REJECT_BOOKING_FAILURE, payload:  data?.message  });
   
    }
  } catch (error) {
    dispatch({ type: ADMIN_REJECT_BOOKING_FAILURE, payload:  error?.response?.data?.message  });
    
  }
};