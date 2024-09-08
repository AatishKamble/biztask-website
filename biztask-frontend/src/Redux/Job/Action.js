import {
    JOB_REGISTER_REQUEST,
    JOB_REGISTER_SUCCESS,
    JOB_REGISTER_FAILURE,
    JOB_GET_BY_ID_REQUEST,
    JOB_GET_BY_ID_SUCCESS,
    JOB_GET_BY_ID_FAILURE,
    JOB_REMOVE_REQUEST,
    JOB_REMOVE_SUCCESS,
    JOB_REMOVE_FAILURE,
    JOB_UPDATE_REQUEST,
    JOB_UPDATE_SUCCESS,
    JOB_UPDATE_FAILURE,
    GET_ALL_JOB_REQUEST,
    GET_ALL_JOB_SUCCESS,
    GET_ALL_JOB_FAILURE
} from './ActionType.js';


import { API_BASE_URL } from '../../configApi/ConfigApi.js';
import axios from 'axios';
import { getServiceById } from '../ServiceR/Action.js';
import { toast } from 'react-toastify';

//job register
const registerJobRequest = () => ({
    type: JOB_REGISTER_REQUEST
});

const registerJobSuccess = (message) => ({
    type: JOB_REGISTER_SUCCESS,
    payload: message
});

const registerJobFailure = (error) => ({
    type: JOB_REGISTER_FAILURE,
    payload: error
});


//job remove

const removeJobRequest = () => ({
    type: JOB_REMOVE_REQUEST
});

const removeJobSuccess = (message) => ({
    type: JOB_REMOVE_SUCCESS,
    payload: message
});

const removeJobFailure = (error) => ({
    type: JOB_REMOVE_FAILURE,
    payload: error
});


//job update
const updateJobRequest = () => ({
    type: JOB_UPDATE_REQUEST
});

const updateJobSuccess = (job) => ({
    type: JOB_UPDATE_SUCCESS,
    payload: job
});

const updateJobFailure = (error) => ({
    type: JOB_UPDATE_FAILURE,
    payload: error
});

//get by id
const getJobByIdRequest = () => ({
    type: JOB_GET_BY_ID_REQUEST
});

const getJobByIdSuccess = (job) => ({
    type: JOB_GET_BY_ID_SUCCESS,
    payload: job
});

const getJobByIdFailure = (error) => ({
    type: JOB_GET_BY_ID_FAILURE,
    payload: error
});


//get All jobs

const getAllJobsRequest=()=>({
    type:GET_ALL_JOB_REQUEST
});

const getAllJobsSuccess=(jobs)=>({
    type:GET_ALL_JOB_SUCCESS,
    payload:jobs
});
const getAllJobsFailure=(error)=>({
    type:GET_ALL_JOB_FAILURE,
    payload:error
})



//register
const jobRegister = (jobData, jwt) => async (dispatch) => {
    dispatch(registerJobRequest());
    try {

       
        const response = await axios.post(`${API_BASE_URL}/api/jobs/register`, jobData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });
        
        const newJob = response.data;
      
        if (newJob.success === true) {
            dispatch(registerJobSuccess(newJob.message));
            dispatch(getServiceById(newJob.job?.service));
            toast.success(newJob.message);
        } else {
            throw new Error(newJob.message);
        }

    } catch (error) {
        dispatch(registerJobFailure(error.message));
        toast.error(error.message);
    }
};


//remove

const removeJob = (jwt, jobId, serviceId) => async (dispatch) => {
    dispatch(removeJobRequest());
    try {

        const response = await axios.delete(`${API_BASE_URL}/api/jobs/remove/${jobId}?serviceId=${serviceId}`, {
            headers: {
                "authorization": `Bearer ${jwt}`,
            }
        });

        const newJob = response.data;
        if (newJob.success === true) {
            dispatch(removeJobSuccess(newJob.message));
            dispatch(getServiceById(serviceId));
            toast.success(newJob.message);
        } else {
            throw new Error(newJob.message);
        }

    } catch (error) {
        dispatch(removeJobFailure(error.message));
        toast.error(error.message);
    }
};


//update
const updateJob = (jwt, jobData, jobId) => async (dispatch) => {
    dispatch(updateJobRequest());
    try {

        const response = await axios.patch(`${API_BASE_URL}/api/jobs/update/${jobId}`, jobData, {
            headers: {
                "authorization": `Bearer ${jwt}`,
                "Content-Type": "multipart/form-data"
            }
        });

        const updatedJob = response.data;

        if (updatedJob.success === true) {
            dispatch(updateJobSuccess(updatedJob.job));
            dispatch(getJobById(updatedJob.job._id));
            toast.success(updatedJob.message);
      
        } else {
            throw new Error(updatedJob.message);
        }

    } catch (error) {
        dispatch(updateJobFailure(error.message));
        toast.error(error.message);
    }
};

//get by id
//get job
const getJobById = (jobId) => async (dispatch) => {
    dispatch(getJobByIdRequest());
    try {
     
        const response = await axios.get(`${API_BASE_URL}/api/jobs/details/${jobId}`);

        const jobData = response.data;
    
        
        if (jobData.success === true) {
            dispatch(getJobByIdSuccess(jobData.job));
            dispatch(getServiceById(jobData.job?.service?._id))
        } else {
            throw new Error(jobData.message);
        }
    } catch (error) {
        dispatch(getJobByIdFailure(error.message));
        toast.error(error.message);
    }
};


const getAllJobs=(reqData)=>async(dispatch)=>{
    dispatch(getAllJobsRequest());
try {
    
    const {
            jobName,
            jobLocation,
            minSalary,
            maxSalary,
            employmentType,
            page,
            limit
        }=reqData;
    
   
    const response=await axios.get(`${API_BASE_URL}/api/jobs/all?jobName=${jobName}&jobLocation=${jobLocation}&minSalary=${minSalary}&maxSalary=${maxSalary}&employmentType=${employmentType}&page=${page}&limit=${limit}`);
    const allJobs=response.data;

    if(allJobs.success==true){
        dispatch(getAllJobsSuccess(allJobs));
     
    }
} catch (error) {
    dispatch(getAllJobsFailure(error.message));
    toast.error(error.message);
}

}


export{
    jobRegister,
    removeJob,
    updateJob,
    getJobById,
    getAllJobs

}


















