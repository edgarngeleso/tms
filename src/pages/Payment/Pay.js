import React from 'react'
import { useContext } from 'react';
import { HeaderFooterContext } from '../../contexts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MPesaPayment from './payment_methods/MPesaPayment';
import PayPalPayment from './payment_methods/PayPalPayment';
import StripePayment from './payment_methods/StripePayment';
import { TopBarImage } from '../../components';

const Pay = () => {
  const {paymentType} = useParams();
const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);
  useEffect(()=>{
    setHeaderFooter(true);
    window.scroll(0,0);
  },[])
  return (
    <div
    style={{
      marginTop:50
    }}
    >
      <TopBarImage/>
      {
        paymentType=="m-pesa"?
        <MPesaPayment/>:
        paymentType=="paypal"?
        <PayPalPayment/>:
        paymentType=="stripe"?
        <StripePayment/>:<></>
      }
    </div>
  )
}

export default Pay;