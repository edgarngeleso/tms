import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { FiChevronUp } from 'react-icons/fi';

const FloatingComponent = () => {
    const [shown,setshown] = useState(true);
    useEffect(()=>{
        window.addEventListener("scroll",(e)=>{
            if(window.scrollY>=100){
                setshown(true);
            }else{
                setshown(false);
            }
        })
    },[])
  return (
    <div
    onClick={()=>{
            window.scrollTo(0,0);
        }}
    style={{
        position:"fixed",
        bottom:window.innerHeight/3.7,
        right:20,
        backgroundColor:"#27ae60",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        borderColor:"transparent",
        width:40,
        height:40,
        borderRadius:5,
        display:shown?"flex":"none"
    }}
    >
        <FiChevronUp color='#ffffff' size={30} />
    </div>
  )
}

export default FloatingComponent;