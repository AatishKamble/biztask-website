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
  CLEAR_SERVICE_MESSAGE,
  CLEAR_SERVICE_ERROR,

    PROVIDER_CANCEL_BOOKING_REQUEST,
  PROVIDER_CANCEL_BOOKING_SUCCESS,
  PROVIDER_CANCEL_BOOKING_FAILURE,
  
  SEEKER_CANCEL_BOOKING_FAILURE,
  SEEKER_CANCEL_BOOKING_REQUEST,
  SEEKER_CANCEL_BOOKING_SUCCESS,
} from "./ActionType.js";

const initialState = {
  isLoading: false,
  error: null,
  message: null,

  booking: {},
  bookings: [],
  otpSent: false,
  otpVerified: false
};

export const serviceBookingReducer = (state = initialState, action) => {
  switch (action.type) {

    case SERVICE_BOOKING_CREATE_REQUEST:
    case PROVIDER_CANCEL_BOOKING_REQUEST:
       case SEEKER_CANCEL_BOOKING_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case SERVICE_BOOKING_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        booking: action.payload.booking,
      };

    case SERVICE_BOOKING_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };


    case GET_MY_BOOKINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookings: action.payload,
      };

    case GET_MY_BOOKINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };


    case GET_PROVIDER_BOOKINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_PROVIDER_BOOKINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookings: action.payload.bookings.filter(
          (b) => (b.bookingStatus !== "REQUESTED" && b.bookingStatus !== "CANCELLED" && b.bookingStatus !== "REJECTED")
        ),
      };

    case GET_PROVIDER_BOOKINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case SEND_COMPLETION_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        otpSent: false
      };

    case SEND_COMPLETION_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpSent: true,
        message: action.payload.message
      };

    case SEND_COMPLETION_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        otpSent: false,
        error: action.payload
      };


    case VERIFY_COMPLETION_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        otpVerified: false
      };

    case VERIFY_COMPLETION_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        otpVerified: true,
        message: action.payload.message,


        bookings: state.bookings.map(b =>
          b._id === action.payload.booking._id
            ? action.payload.booking
            : b
        )
      };

    case VERIFY_COMPLETION_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        otpVerified: false,
        error: action.payload
      };


      case PROVIDER_CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        bookings: state.bookings.map(b =>
          b._id === action.payload.booking._id ? action.payload.booking : b
        )
      };

    case PROVIDER_CANCEL_BOOKING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

       case SEEKER_CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        bookings: state.bookings.map(b =>
          b._id === action.payload.booking._id ? action.payload.booking : b
        )
      };

    case SEEKER_CANCEL_BOOKING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case CLEAR_SERVICE_MESSAGE:
      return {
        ...state,
        message: null,

      };
    case CLEAR_SERVICE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
