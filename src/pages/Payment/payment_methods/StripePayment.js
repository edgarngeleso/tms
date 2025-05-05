import React from 'react'
import { useNavigate } from 'react-router-dom';

const StripePayment = () => {
  const navigate = useNavigate();
  const handlePay = ()=>{
    navigate("/profile");
  }
  return (
    <div>StripePayment</div>
  )
}

export default StripePayment;