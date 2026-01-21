import React from 'react'
import { useSearchParams,useNavigate } from "react-router-dom";
import './verifi.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';
import axios from 'axios';


const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/order/verify`,{success, orderId})
    if(response.data.success){
      navigate("/myOrders")
    }else{
      navigate("/")
    }
  }
  useEffect(()=> {
    verifyPayment();
  },[]);
  return (
    <div className='verify'>
      <div className="spiner">
      </div>
    </div>
  )
}

export default Verify