import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import styles from "./index.module.css";

const SmallScreenHeader = () => {
    const navigate = useNavigate();
  return (
    <div 
    className={styles.small_screen}
    >
        <FiArrowLeft
        className={styles.icon}
        onClick={()=>{
           window.history.back(); 
        }}
        />
        <div></div>
    </div>
  )
}

export default SmallScreenHeader