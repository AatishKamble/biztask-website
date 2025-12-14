import {
  ADMIN_GET_BOOKINGS_REQUEST,
  ADMIN_GET_BOOKINGS_SUCCESS,
  ADMIN_GET_BOOKINGS_FAILURE,
  ADMIN_VERIFY_BOOKING_REQUEST,
  ADMIN_VERIFY_BOOKING_SUCCESS,
  ADMIN_VERIFY_BOOKING_FAILURE,
  ADMIN_REJECT_BOOKING_REQUEST,
  ADMIN_REJECT_BOOKING_SUCCESS,
  ADMIN_REJECT_BOOKING_FAILURE,
  CLEAR_ADMIN_BOOKING_ERROR,
  CLEAR_ADMIN_BOOKING_MESSAGE
} from "./ActionType.js";

const initialState = {
  isLoading: false,
  error: null,
  message: null,
  bookings: []
};


export const adminBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_BOOKINGS_REQUEST:
    case ADMIN_VERIFY_BOOKING_REQUEST:
    case ADMIN_REJECT_BOOKING_REQUEST:
      return { ...state, isLoading: true };

    case ADMIN_GET_BOOKINGS_SUCCESS:
      return { ...state, isLoading: false, bookings: action.payload };

    case ADMIN_VERIFY_BOOKING_SUCCESS: {
      const updated = state.bookings.map(b => (b._id === action.payload.booking._id ? action.payload.booking : b));
      return { ...state, isLoading: false, bookings: updated ,message:action.payload.message};
    }

    case ADMIN_REJECT_BOOKING_SUCCESS: {
      const updated = state.bookings.map(b => (b._id === action.payload.booking._id ? action.payload.booking : b));
      return { ...state, isLoading: false, bookings: updated,message:action.payload.message };
    }

    case ADMIN_GET_BOOKINGS_FAILURE:
    case ADMIN_VERIFY_BOOKING_FAILURE:
    case ADMIN_REJECT_BOOKING_FAILURE:
      return { ...state, isLoading: false, error: action.payload };



    case CLEAR_ADMIN_BOOKING_MESSAGE:
      return {
        ...state,
        message: null,

      };
    case CLEAR_ADMIN_BOOKING_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
