import React, { useEffect } from 'react';
import "./index.css";
import { Dropdown } from 'react-bootstrap';
import { FiCalendar } from 'react-icons/fi';
import { TopBarImage } from '../../components';
const allBlogs = [
    {
        title:"Fast Ticket Issuance",
        image:"/assets/images/image1.jpg",
        date:"12/12/2023",
        description:"With our automated system, your ticket gets generated instantly."
    }
];
const Blogs = ({marginTop=10,isShown=true}) => {
    useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  return (
    <>
    <div style={{
        display:isShown?"flex":"none"
    }} >
        <TopBarImage heading='Blogs' />
    </div>
    <div
    id='blogs'
    className='blogs-holder'
    style={{
            marginBottom:50,
            marginTop
        }}
        >
        
        <div
        className='blogs'
        >
           {
            allBlogs.map((item,index)=>{
                return(
                    <div
                        className='blog-info'
                        key={index}
                        >
                        <img
                        src={item.image}
                        />
                        <div className='info' >
                                <div className='date' >
                                    <FiCalendar className='icon' size={15} />
                                    <label>{item.date}</label>
                                </div>
                                <div
                                style={{
                                    width:"100%",
                                    height:1,
                                    backgroundColor:"#c7c3c3",
                                    marginTop:10,
                                    marginBottom:5
                                }}
                                />
                                <label className='blog-title' >{item.title}</label>
                                <label className='data' >
                                {item.description}
                                </label> 
                        </div>
                    </div>
                )
            })
           } 
        
        </div>
            
    </div>
    </>
  )
}

export default Blogs;