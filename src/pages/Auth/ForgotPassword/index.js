import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { HeaderFooterContext } from '../../../contexts';
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataURLS } from '../../../utils/DataURLS';
import { ProgressLoading } from '../../../components/Loading';
import { SmallScreenHeader } from '../../../components';

function ForgotPassword() {
   const navigate = useNavigate();
  const location = useLocation();
  const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);

  const [credentials,setCredentials] = useState({
    email:"",
    password:"",
  });

  const [data,setData] = useState({
    state:false,
    loading:false,
    message:"",
  });
  const handleForgotPassword = ()=>{
    if(credentials.email == ""){
      return false;
    }

    setData({
      state:false,
      loading:true,
      message:"",
    });
    let data = {
      email:credentials.email,
    }

    fetch(DataURLS.userForgotPassword,{
      method:"POST",
      body:JSON.stringify(data),
      // credentials:true,
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    .then(req=>req.json())
    .then(response=>{
      console.log(response);

      let goToLocation = location.state?.from?.pathname || "/sign-in";
      
      if(!response.error){
        setData({
          state:false,
          loading:false,
          message:"Login Successful",
        });
        navigate(goToLocation);
      }
      setData({
        state:true,
        loading:false,
        message:response.error,
      });
      
    }).catch(e=>{
      console.log(e);
      setData({
        state:true,
        loading:false,
        message:"An error occurred. Try again later.",
      });
    });
  }

  useEffect(()=>{
    setHeaderFooter(false);
    window.scrollTo(0,0);
  },[])
  return (
    <div
    className="body"
    >
      <SmallScreenHeader/>
      <div
      className="login_body"
      >
        <img src={"/assets/images/bus1.jpg"}/>

        <div className="container" >
          <div
          className="login_credentials"
          >
            <Link
            to={"/"}
            className="website_name"
            >transport.
              <p style={{color:"#27ae60"}} >com</p>
            </Link>

            <p className="hello" >Hello!</p>
            <p className="login_into_account" >Recover your account!</p>
            <div
              className="credentials_container"
            >
              {
                data.message || data.loading?
                <div
                  style={{
                    height:"fit-content",
                    width:"100%"
                  }}
                >
                  {
                    data.loading?
                    <ProgressLoading height={100} />:
                    data.state?
                    <p className='text-danger' >{data.message}</p>:
                    <p className='text-success' >{data.message}</p>
                  }
                  
                </div>:<></>
              }
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Email..." 
                onChange={(e)=>setCredentials({...credentials,email:e.target.value})} />
              <div className="login_register" >
                <div>
                  <Button 
                  onClick={handleForgotPassword}
                  variant='success' >Request password reset</Button>
                </div>
                
                <p>
                  <Link className="link" to="/login" >Login here</Link>
                </p>
              </div>
              
              
            </div>

            
          </div>
          
        </div>

      </div>

    </div>
  )
}

export default ForgotPassword;