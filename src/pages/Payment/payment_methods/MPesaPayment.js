import { Button } from 'react-bootstrap';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./index.css";
import { CartContext, UserContext } from '../../../contexts';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { APPURL } from '../../../utils/DataURLS';

const MPesaPayment = () => {
  const [cartContext,setCartContext] = useContext(CartContext);
  const [userData,setUserData] = useContext(UserContext);
  const [phone,setPhone] = useState(userData.data?.user?.phone);
  
  const navigate = useNavigate();

  const config = {
    public_key: 'FLWPUBK_TEST-fc125aec579e6abd8874f40b3e264c91-X',
    tx_ref: Date.now(),
    amount: !isNaN(cartContext.fare*cartContext.seats?.length)?cartContext.fare*cartContext.seats?.length:0,
    currency: 'KES',
    payment_options: 'card,mobilemoney,ussd',
    country:"KEN",
    redirect_url:`${APPURL}/profile`,
    customer: {
      email: userData.data?.user?.email,
      phone_number: phone,
      name: userData.data?.user?.name,
      user_id:userData.data?.user?._id
    },
    customizations: {
      title: 'TMS',
      description: 'Payment for selected seats',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: `Submit (Ksh.${cartContext.fare*cartContext.seats?.length})`,
    callback: (response) => {
       //console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  const handlePay = ()=>{
    navigate("/profile");
  }
  console.log(cartContext);
  return (
        <div className='pay' >
            <div className='details' >
              <p>Paying for seat number(s)</p>
              {
                cartContext.seatsInfo?.map((seat,index)=>{
                  return (
                    <div 
                    className='div'
                    key={index} >
                      <label>Seat: {seat.seat}</label>
                      <label>Name: {seat.name??"N/A"}</label>
                      <label>ID: {seat.id??"N/A"}</label>
                    </div>
                  )
                })
              }
              <p><b>Total : Ksh.{!isNaN(cartContext.fare*cartContext.seats?.length)?cartContext.fare*cartContext.seats?.length:0}</b></p>
            </div>
            <div className='payment' >
              <div>
                  Enter M-Pesa phone number in the box shown.
                  Click submit and an stk push will be sent to your phone.
              </div>
              <div className='user-data' >
                  <label>Phone number:</label>
                  <input placeholder='Enter phone number...' value={phone}  onChange={(e)=>setPhone(e.target.value)} />
                  {/* <Button variant='success' >Submit (Ksh.{cartContext.fare*cartContext.seats?.length}) </Button> */}
                <FlutterWaveButton className='btn btn-success' {...fwConfig} >
                    
                </FlutterWaveButton>
              </div>
            </div>
    </div>
  )
}

export default MPesaPayment;