import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import "./index.css";
import { TopBarImage } from '../../components';

const Contact1 = () => {
  return (
    <div
    style={{
      marginTop:100,
      width:"100%"
    }}
    >
      <TopBarImage/>
      <div>
        <label>name</label>
        <input/>
        <label>email</label>
        <input/>
        <label>message</label>
        <textarea></textarea>
        <Button>Send</Button>
      </div>
      <div>
        Follow us on our social media platforms
        <div>
          <FaFacebook/>
          <FaInstagram/>
          
        </div>

      </div>
    </div>
  )
}

//export default Contact1;



const Contact = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  return (
    <>
    <TopBarImage heading='Contact us' />
    <div
    className="contact-us"
    >
      
      <label>Name</label>
      <div className="names" >
        <input type='text' placeholder="First name..." />
        <input type='text' placeholder="last name..."/>
      </div>
      <div className="email"  >
        <label>Email</label>
        <input type='email' required placeholder="email..." />
      </div>
      <div className="message" >
        <label>Message</label>
        <textarea
        aria-multiline
        placeholder="Type your message here..."
        ></textarea>
      </div>
      <Button 
        title="Send" 
        variant="success" 
        onClick={()=>{}}>Send</Button>
    </div>
    
    </>
  )
}

export default Contact;