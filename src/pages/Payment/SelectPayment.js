import React from 'react';
import "./selectPayment.css";
import { useNavigate,useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext, HeaderFooterContext, UserContext } from '../../contexts';
import { Toast } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { TopBarImage } from '../../components';

const SelectPayment = () => {
const [cartContext,setCartContext] = useContext(CartContext);
const [userData,setUserData] = useContext(UserContext);

const [signIn,setSignIn] = useState({
    error:false,
    message:""
});

const [selectedPayment,setselectedPayment] = useState(null);
const paymentModes = [
    {
        id:1,
        name:"M-Pesa",
        image:"/assets/images/payment/mpesa.png"
    },
    {
        id:2,
        name:"PayPal",
        image:"/assets/images/payment/paypal.png"
    },
    {
        id:3,
        name:"Stripe",
        image:"/assets/images/payment/stripe.png"
    },
];

const navigate = useNavigate();
const location = useLocation();
const handlePay = (paymentType)=>{
    if(userData.loggedIn){
        setSignIn({

            error:false,
            message:"Successfully booked!"
        });
        navigate(`/pay/${paymentType.name.toLowerCase()}`)
    }else{
        setSignIn({
            error:true,
            message:"Login in first to continue with booking!"
        });
        setTimeout(()=>{
            navigate("/login",{state:{from:location},replace:true});
        },1000)
        
    }
}

const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);
  useEffect(()=>{
    setHeaderFooter(true);
    window.scroll(0,0);
  },[])
  return (
    <>
   <TopBarImage>
    <p>{cartContext.pickupPoint}</p>
          <p>-</p>
    <p>{cartContext.destination}</p>
   </TopBarImage>

      <div
    className='payments-holder'
    >
        <Toast
        show={signIn.error}
        onClose={()=>setSignIn({...signIn,error:false})}
        style={{
            position:"fixed",
            top:0,
            right:0,
            zIndex:102,
            backgroundColor:signIn.error?"red":"var(--app-color)"
        }}
        
        >
            <Toast.Header>
                Error
            </Toast.Header>
            <Toast.Body>
                {signIn.message}
            </Toast.Body>
        </Toast>
        <h4 className='text-success' >Select payment method</h4>
        <div className='payments'>
            {
                paymentModes.map((paymentMode,index)=>{
                    return(
                        <div
                        className='payment'
                        onClick={()=>handlePay(paymentMode)}
                        >
                            <img src={paymentMode.image}/>
                            <div/>
                            <p>{paymentMode.name}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
    </>
    
  )
}

export default SelectPayment;