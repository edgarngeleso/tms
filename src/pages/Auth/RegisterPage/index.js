import React from 'react';
import {Link,useNavigate} from "react-router-dom";
import { CustomButton, Footer, SmallScreenHeader } from '../../../components';
import "./index.css";
import { FiSend } from 'react-icons/fi';
import { Button } from 'react-bootstrap';
import { useEffect,useContext,useState } from 'react';
import { HeaderFooterContext } from '../../../contexts';
import { DataURLS } from '../../../utils/DataURLS';
import { ProgressLoading } from '../../../components/Loading';
const RegisterPage = () => {
  const navigate = useNavigate();
 
  const [credentials,setCredentials] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    location:"",
    password:""
  });

  const [data,setData] = useState({
    state:false,
    loading:false,
    message:"",
  });
  const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);

   const handleRegister = ()=>{
    const data = {name:`${credentials.firstName} ${credentials.lastName}`,
                  email:credentials.email,
                  phone:credentials.phoneNumber,
                  address:credentials.location,
                  password:credentials.password
    }

    setData({
      state:false,
      loading:true,
      message:"",
    });
    fetch(DataURLS.userSignUp,{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }).
    then(req=>req.json()).
    then(response=>{
      console.log(response);
      if(!response.error){
        setData({
          state:false,
          loading:false,
          message:"Registration Successful.",
        });
        
          navigate("/login");
        
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
    })
    
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
            <p className="login_into_account" >Create your Account.</p>
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
              <label
              style={{
                marginTop:5
              }}
              >First name</label>
              <input
              onChange={(e)=>setCredentials({...credentials,firstName:e.target.value})}
              type="text" placeholder="First name..."/>
              <label>Last name</label>
              <input
              onChange={(e)=>setCredentials({...credentials,lastName:e.target.value})}
              type="text" placeholder="Last name..."/>
              <label>Email</label>
              <input
              onChange={(e)=>setCredentials({...credentials,email:e.target.value})}
              type="email" required placeholder="Email..."/>
              <label>Phone number</label>
              <input
              onChange={(e)=>setCredentials({...credentials,phoneNumber:e.target.value})}
              type="text" placeholder="Phone number..."/>
              <label>Location</label>
              <input
              onChange={(e)=>setCredentials({...credentials,location:e.target.value})}
              type="text" placeholder="Location..."/>
              <label>Password</label>
              <input
              onChange={(e)=>setCredentials({...credentials,password:e.target.value})}
              type="password" placeholder="Password..."/>
              <label>Confirm password</label>
              <input type="password" placeholder="Confirm password..."/>
              <div className="login_register" >
                <div>
                  <Button variant='success' onClick={handleRegister} >Register</Button>
                </div>
                
                <p>
                  Have an account?
                  <Link className="link" to="/login" >Sign in here</Link>
                </p>
              </div>

              
              
              
            </div>

            
          </div>
          
        </div>

      </div>

    </div>
  )
}

export default RegisterPage