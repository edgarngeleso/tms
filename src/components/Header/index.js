import React from 'react';
import {FiLogIn, FiMail, FiMenu, FiMoon, FiMoreVertical, FiUser, FiUserCheck, FiUserPlus, FiX} from "react-icons/fi"
import "./index.css";
import { Button, Modal, Toast } from 'react-bootstrap';
import { HeaderFooterContext, UserContext } from '../../contexts';
import { useContext } from 'react';
import { FaChevronDown, FaPhone } from 'react-icons/fa';
import { useEffect } from 'react';
import { useState } from 'react';
import SmallMenu from './SmallMenu';
import { Link, useNavigate } from 'react-router-dom';
const Header = ({isDashboard=false,isShown=true}) => {
    const [userData,setUserData] = useContext(UserContext);
    const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);
    const [topShown,setTopShown] = useState(true);
    const [showToast,setshowToast] = useState(false);
    const [smallMenuShown,setSmallMenuShown] = useState(false);

    const navigate = useNavigate();
    useEffect(()=>{
        window.addEventListener("scroll",(e)=>{
            console.log(window.innerWidth<600)
            if(window.innerWidth<600){
                setTopShown(false);
            }
            else if(window.scrollY>=100 && window.innerWidth>=600 ){
                setTopShown(false);
            }else{
                setTopShown(true);
            }
        })
    },[])

    useEffect(()=>{
        window.addEventListener("resize",(e)=>{
            if(window.innerWidth < 600){
                setTopShown(false);
            }else if(window.screenY<100 && window.innerWidth>=600){
                setTopShown(true);
            }

           
        });
        if(window.innerWidth < 600){
                setTopShown(false);
            }else if(window.screenY<100 && window.innerWidth>=600){
                setTopShown(true);
            }
        console.log(window.screenY,window.innerWidth);
    },[window.innerWidth])
  return (
    <div
    className='header'
    style={{
        display:headerFooter?"flex":"none"
    }}
    >
        <div
        className='header-top'
        style={{
            display:topShown?"flex":'none',
        }}
        >
            <div>
                <label><FaPhone className='icon' /> +254712345678</label>
                <div
                style={{
                    width:1.5,
                    backgroundColor:"#000000",
                    height:15
                }}
                />
                <label><FiMail className='icon' /> transport@gmail.com</label>
            </div>
            <div>
                
                <Button
                style={{
                    border:"none",
                    display:"flex",
                    gap:10,
                    backgroundColor:"transparent"
                }}
                >
                    <label style={{
                        display:"flex",
                        gap:10,
                        color:"#000000",
                        alignItems:"center"
                    }} > English<FaChevronDown size={15} /></label>
                </Button>
                
                {
                            userData.loggedIn?
                            <Button
                                onClick={()=>{
                                    setSmallMenuShown(false);
                                    setshowToast(false);
                                    navigate("/profile")}}
                                style={{
                                border:"none",
                                display:"flex",
                                gap:10,
                                backgroundColor:"transparent"
                            }}
                            >
                                 <label className='icon' style={{color:"#000000"}}><FiLogIn className='icon' /> Dashboard </label>
                            </Button>:
                            <Button
                            onClick={()=>{
                                setSmallMenuShown(false);
                                setshowToast(false);
                                navigate("/login")}}
                            style={{
                                border:"none",
                                display:"flex",
                                gap:10,
                                backgroundColor:"transparent"
                            }}
                            >
                                <label className='icon' ><FiLogIn className='icon' /> SignIn </label>
                                <label style={{color:"#000000"}} >/</label>
                                <label><FiUserPlus className='icon' /> <label style={{color:"#000000"}} >SignUp</label></label>
                            </Button>
                        }
            </div>
            
            <Modal
            show={showToast}
            style={{
                padding:0,
                margin:0
            }}
            onBackdropClick={()=>setshowToast(false)}
            onHide={()=>setshowToast(false)}
            >
                <Modal.Body
                style={{
                    width:"100%",
                    margin:0,
                }}
                >
                    <div>
                        <label><FaPhone className='icon' /> +254712345678</label>
                        <label><FiMail className='icon' /> transport@gmail.com</label>
                    </div>
                    <div>

                        <Button
                        style={{
                            border:"none",
                            display:"flex",
                            gap:10,
                            backgroundColor:"transparent"
                        }}
                        >
                            <label style={{
                                display:"flex",
                                gap:10,
                                color:"#000000",
                                alignItems:"center"
                            }} > English<FaChevronDown size={15} /></label>
                        </Button>
                        {
                            userData.loggedIn?
                            <Button
                                onClick={()=>{
                                    setSmallMenuShown(false);
                                    setshowToast(false);
                                    navigate("/profile")}}
                                style={{
                                border:"none",
                                display:"flex",
                                gap:10,
                                backgroundColor:"transparent"
                            }}
                            >
                                <label className='icon' style={{color:"#000000"}}>
                                    <FiLogIn className='icon' /> Dashboard </label>
                            </Button>:
                            <Button
                            onClick={()=>{
                                setSmallMenuShown(false);
                                setshowToast(false);
                                navigate("/login")}}
                            style={{
                                border:"none",
                                display:"flex",
                                gap:10,
                                backgroundColor:"transparent"
                            }}
                            >
                                <label className='icon' ><FiLogIn className='icon' /> SignIn </label>
                                <label style={{color:"#000000"}} >/</label>
                                <label><FiUserPlus className='icon' /> <label style={{color:"#000000"}} >SignUp</label></label>
                            </Button>
                        }
                        
                    </div>
                </Modal.Body>
            </Modal>
            <Toast
            show={false}
            
            >
                <Toast.Body>
                    <div>
                        <Button
                        style={{
                            border:"none",
                            display:"flex",
                            gap:10,
                            backgroundColor:"transparent"
                        }}
                        >
                            <label style={{
                                display:"flex",
                                gap:10,
                                color:"#000000",
                                alignItems:"center"
                            }} > English<FaChevronDown size={15} /></label>
                        </Button>
                        
                        <Button
                        style={{
                            border:"none",
                            display:"flex",
                            gap:10,
                            backgroundColor:"transparent"
                        }}
                        >
                            <label className='icon' ><FiLogIn className='icon' /> SignIn </label>
                            <label style={{color:"#000000"}} >/</label>
                            <label><FiUserPlus className='icon' /> <label style={{color:"#000000"}} >SignUp</label></label>
                        </Button>
                    </div>
                </Toast.Body>
            </Toast>
        </div>
        <div className='header-info' >
            <Link to='/'
            className='logo'
            >
                <img
            src='/assets/images/bus.jpg'
            />
            </Link>
                <div
                className='links'
                >
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/faqs'>FAQs</Link>
                    <Link to='/blogs'>Blog</Link>
                    <Link to='/contact'>Contact</Link>
                </div>

            <div
                className='buttons'
                >
            {/*<div
            className='header-buttons'
            onClick={()=>userData.loggedIn?navigate("/profile":navigate("/login"}
            >
                <FiUser size={25}  />
                
            </div>*/}
            <div
            className='header-buttons'
            >
                {
                    smallMenuShown?
                    <FiX size={25} onClick={()=>setSmallMenuShown(false)}/>:
                    <FiMenu size={25} onClick={()=>setSmallMenuShown(true)} />
                }
                
            </div>
            <div
            className='header-buttons'
            >
                <FiMoreVertical size={25} onClick={()=>setshowToast(true)} />
            </div>
        </div>

        <Button className='buy-ticket-button header-btn' onClick={()=>navigate("/tickets")} >Buy a ticket</Button>

        <SmallMenu smallMenuShown={smallMenuShown} setSmallMenuShown={setSmallMenuShown} />

        </div>


            
            
        
    </div>
  )
}

export default Header