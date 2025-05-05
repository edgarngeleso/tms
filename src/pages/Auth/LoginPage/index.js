import React, { useContext, useEffect } from 'react';
import {Link,useLocation,useNavigate} from "react-router-dom";
import { CustomButton, SmallScreenHeader } from '../../../components';
import "./index.css";
import { Button } from 'react-bootstrap';
import { CartContext, HeaderFooterContext, UserContext } from '../../../contexts';
import { useState } from 'react';
import { DataURLS } from '../../../utils/DataURLS';
import { ProgressLoading } from '../../../components/Loading';
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData,setUserData] = useContext(UserContext);
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
  const handleLogin = ()=>{
    if(credentials.email == ""){
      return false;
    }
    if(credentials.password == ""){
      return false;
    }

    setData({
      state:false,
      loading:true,
      message:"",
    });

    let formData = new FormData();
    formData.append("email",credentials.email);
    formData.append("password",credentials.password);
    let data = {
      email:credentials.email,
      password:credentials.password
    }

    fetch(DataURLS.userSignIn,{
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
      let user = response.user??{};
      setUserData({loggedIn:true,data:{token:response.token,user}});
      localStorage.setItem("app_user",JSON.stringify({loggedIn:true,data:{token:response.token,user}}));
      let goToLocation = location.state?.from?.pathname || "/";
      
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
      style={{
        display:"flex",
        position:"relative"
      }}
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
            <p className="login_into_account" >Log In to your Account!</p>
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
              onChange={(e)=>setCredentials({...credentials,email:e.target.value})}
              />
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Password..." 
                onChange={(e)=>setCredentials({...credentials,password:e.target.value})} />
              <p>
                  <Link className="link" to="/forgot-password" >Forgot password?</Link>
                </p>
              <div className="login_register" >
                <div>
                  <Button
                  onClick={handleLogin}
                  variant='success'
                  >Login</Button>
                </div>
                
                <p>
                  Dont have an account?
                  <Link className="link" to="/register" >Register here</Link>
                </p>
              </div>

              <div
              style={{
                width:"100%",
                display:"flex",
                flexDirection:"row",
                marginTop:30
              }}
              >
                <input
                type="checkbox"
                style={{
                  width:20,
                  height:20,
                }}
                />
                <p>Remember me</p>
              </div>
              
              
            </div>

            
          </div>
          
        </div>

      </div>

    </div>
  )
}

export default LoginPage