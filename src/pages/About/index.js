import React, { useEffect } from 'react'
import { TopBarImage } from '../../components';

const About = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  return (
    <div
    
    >
      <TopBarImage/>
      About us
    </div>
  )
}

export default About;