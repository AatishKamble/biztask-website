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


import { API_BASE_URL } from '../../configApi/ConfigApi.js';
import axios from 'axios';
import { getServiceById } from "../ServiceR/Action.js";
import { toast } from "react-toastify";

const addReviewRequest=()=>({
    type:ADD_REVIEW_REQUEST
})

const addReviewSuccess=(message,review)=>({
    type:ADD_REVIEW_SUCCESS,
    payload:{message,review}
});

const addReviewFailure=(error)=>({
    type: ADD_REVIEW_FAILURE,
    payload:error
});

//for all review
export const getReviewsRequest = () => ({
    type: GET_REVIEWS_REQUEST,
});

export const getReviewsSuccess = (reviews) => ({
    type: GET_REVIEWS_SUCCESS,
    payload: reviews,
});

export const getReviewsFailure = (error) => ({
    type: GET_REVIEWS_FAILURE,
    payload: error,
});
//for update review
export const updateReviewRequest = () => ({
    type: UPDATE_REVIEW_REQUEST,
});

export const updateReviewSuccess = (message,review) => ({
    type: UPDATE_REVIEW_SUCCESS,
    payload: {message,review},
});

export const updateReviewFailure = (error) => ({
    type: UPDATE_REVIEW_FAILURE,
    payload: error,
});

//for delete review
export const deleteReviewRequest = () => ({
    type: DELETE_REVIEW_REQUEST,
});

export const deleteReviewSuccess = (message,review) => ({
    type: DELETE_REVIEW_SUCCESS,
    payload: {message,review},
});

export const deleteReviewFailure = (error) => ({
    type: DELETE_REVIEW_FAILURE,
    payload: error,
});

const addReview = (formData, jwt) => async (dispatch) => {
    dispatch(addReviewRequest());
    try {

       
        const response = await axios.post(`${API_BASE_URL}/api/reviews/add`, formData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });
        
        const newReview = response.data;
    
        if (newReview.success === true) {
            dispatch(addReviewSuccess(newReview.message,newReview.review));

           dispatch(getServiceById(newReview?.review?.service._id))
           toast.success(newReview.message);
        } else {
            throw new Error(newReview.message);
        }

    } catch (error) {
        dispatch(addReviewFailure(error.message));
        if(jwt===null){
            toast.error("Session expired,Please Login !")
        }
        else{

       
        toast.error(error.message); }
    
    }
};


const removeReview=(reviewId,jwt)=>async (dispatch) =>{
    dispatch(deleteReviewRequest());
    try {
   
       
        const response = await axios.delete(`${API_BASE_URL}/api/reviews/remove/${reviewId}`,{
            headers: {
                "authorization": `Bearer ${jwt}`,
            }
        });
        
        const newReview = response.data;

        if (newReview.success === true) {
            dispatch(deleteReviewSuccess(newReview.message,newReview.review));
            dispatch(getServiceById(newReview?.review?.service?._id))
            toast.success(newReview.message);
        } else {
            throw new Error(newReview.message);
        }

    } catch (error) {
        dispatch(deleteReviewFailure(error.message));
        toast.error(error.message);
    }


}


// const updateReview=async(formData,reviewId,jwt)=>async (dispatch) =>{
//     dispatch(updateReviewRequest());
//     try {

       
//         const response = await axios.patch(`${API_BASE_URL}/api/reviews/update/${reviewId}`,formData,{
//             headers: {
//                 "authorization": `Bearer ${jwt}`,
//                  "Content-Type": "multipart/form-data"
//             }
//         });
        
//         const newReview = response.data;
//     
//         if (newReview.success === true) {
//             dispatch(updateReviewSuccess(newReview.message,newReview.review));
           
//         } else {
//             throw new Error(newReview.message);
//         }

//     } catch (error) {
//         dispatch(updateReviewFailure(error.message));
//     }


// }



const getAllReviews=(serviceId)=>async(dispatch)=>{
    dispatch(getReviewsRequest());
try {

    
    const response=await axios.get(`${API_BASE_URL}/api/reviews/all?serviceId=${serviceId}`);
    const allReviews=response.data;
   

    if(allReviews.success==true){
        dispatch(getReviewsSuccess(allReviews.reviews));
     
    }
} catch (error) {
    dispatch(getReviewsFailure(error.message));
    toast.error(error.message);
}

}
export{
    addReview,
    removeReview,
    // updateReview,
    getAllReviews
}
