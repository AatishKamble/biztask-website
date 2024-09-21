import React, { useEffect } from 'react'
import ServiceDetail from '../components/ServiceDetails/ServiceDetail'
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import {getServiceById} from "../Redux/ServiceR/Action.js";
import { getAllReviews } from '../Redux/Review/Action.js';
const ServiceDetailPage = ({userDetails}) => {

const dispatch=useDispatch();
const {id}=useParams();

useEffect(()=>{
if(id){
  dispatch(getServiceById(id));

}


},[id,dispatch]);


const reviewStore = useSelector(store => store.reviewStore);

    useEffect(() => {
        if (id) {
            dispatch(getAllReviews(id));
        }
    }, [id,dispatch]);





const serviceStore = useSelector(store => store.serviceStore)

  return (
   <>
   <ServiceDetail serviceDetails={serviceStore.service} userDetails={userDetails}/>
   </>
  )
}

export default ServiceDetailPage