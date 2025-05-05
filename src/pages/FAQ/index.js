import React, { useEffect } from 'react'
import { TopBarImage } from '../../components';
import { Card, CardGroup } from 'react-bootstrap';
import styles from "./index.module.css";


const faqs = [
  {
    question:"How do I book a ticket on this platform?"
  },
  {
    question:"Does TMS allow cashback?"
  },
];
const FAQ = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  return (
    <div
    style={{
        marginTop:0
    }}
    >
      <TopBarImage heading='Frequently Asked Questions' />
      <CardGroup className={styles.cards}>
      {
        faqs.map((item,index)=>{
          return(
            <Card key={index} className={styles.card}>
              <p>{index+1}. {item?.question}</p>
            </Card>
          )
        })
      }
      </CardGroup>
      </div>
  )
}

export default FAQ;