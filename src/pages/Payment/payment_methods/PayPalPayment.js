import React from 'react'
import { useNavigate } from 'react-router-dom';

const PayPalPayment = () => {
  const navigate = useNavigate();
  const handlePay = ()=>{
    navigate("/profile");
  }
  return (
    <div>PayPalPayment</div>
  )
}

export default PayPalPayment;