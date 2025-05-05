import React, { useContext } from 'react';
import "./index.css";
import { Button, FormCheck, Modal, Toast } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Select from "react-select";
import { FiX } from 'react-icons/fi';
import { DataURLS } from '../../utils/DataURLS';
import Lottie from 'lottie-react';
import { CartContext, HeaderFooterContext } from '../../contexts';
import { BottomSheet, TopBarImage } from '../../components';


const positions = ["A","B","C","D",
                  "E","F","G","H",
                  "I","J","K","L",
                  "M","N","O","P",
                  "Q","R","S","T",
                  "U","V","W","X",
                  "Y","Z"];
const frontSeats = ["Fr"];

const SelectSeat = () => {
  const params = useParams();
  const [show,setShow] = useState(false);
  const [cartContext,setCartContext] = useContext(CartContext);
  const [selectedSeats,setSelectedSeats] = useState([]);
  const [selectedSeatsInfo,setSelectedSeatsInfo] = useState([]);
  const [seatsError,setseatsError] = useState({
    shown:false,
    error:false,
    message:""
  });

  const [userInfo,setUserInfo] = useState({
    gender:null
  })

    const [ticketInfo,setTicketInfo] = useState({
        pickupPoint:params?.pickupPoint,
        destination:params?.destinationPoint,
        date:params?.date,
        error:false,
        message:""
    });

  const [isFocused,setIsFocused] = useState(false);
  const [iconsShown,setIconsShown] = useState(false);

  const navigate = useNavigate();
  const [fareCost,setFareCost] = useState(0);
  const addSeat = (seatNumber)=>{

  };

  const [seats,setSeats] = useState([]);
  const createArray = (arrayLength)=>{
    let len = arrayLength;
    if(arrayLength<=0){
      return [];
    }
    let arr = [];
    for (let index = 0; index < len; index++) {
      arr.push(index);
    }
    return arr;
  }

  const seatChunks = (vehicle)=>{
    let chunkSize = vehicle.seatsConfiguration.left+vehicle.seatsConfiguration.right;
    if ((chunkSize)<=0){
      return [];
    }
    let arr = createArray(vehicle.totalSeats);
    let out = [];
    for (let index = 0,len=arr.length; index < len; index+=chunkSize) {
      out.push(arr.slice(index,index+chunkSize));
    }
    setSeats(out);
    return out;
  }

  let seatNumber = 0;
  const [vehicle,setVehicle] = useState({
    seatsConfiguration:{left:2,right:2},
    totalSeats:0,
    seatsInfront:0
  });

  const [bookedSeats,setBookedSeats] = useState([]);

  const isBooked = (item)=>{
    for (let index = 0; index < bookedSeats.length; index++) {
      if(item == bookedSeats[index]){
        return true;
      }
    }

    return false;
  }

  const [bus,setBus] = useState({
        error:false,
        loading:false,
        message:"",
        results:[]
  });
    const fetchBus = ()=>{
        setBus({
                ...bus,
                error:false,
                loading:true,
                message:"",
            })
        fetch(`${DataURLS.buses}/${params.slug}`,{
            method:"GET"
        }).then(req=>req.json())
        .then(res=>{
            console.log(res);
            setBus({
                error:false,
                loading:false,
                message:"",
                results:res
            })
            setVehicle({
              ...vehicle,
              totalSeats:res.numberOfSeats
            });

            setFareCost(res.fare);
            seatChunks({
              seatsConfiguration:{left:2,right:2},
              totalSeats:res.numberOfSeats,
              seatsInfront:0
            });
            setBookedSeats(res.bookedSeat??[])
        }).catch(e=>{
            console.log(e);
            setBus({
                ...bus,
                error:true,
                loading:false,
                message:"An error occurred, try again later.",
            })
        })
    }


  const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);

  useEffect(()=>{
    //seatChunks(vehicle);
    fetchBus();
    setHeaderFooter(true);
    window.scroll(0,0);
  },[])

  const saveLocally = ()=>{
    try {
      let data = JSON.stringify({
      seats:selectedSeats,
      fare:fareCost,
      bus:""
    });
    window.localStorage.setItem("seatsData",data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    setCartContext({
      seats:selectedSeats,
      fare:fareCost,
      bus:bus?.name,
      seatsInfo:selectedSeatsInfo
    })


    if(bus.name){
      saveLocally();
    }
    
  },[selectedSeats]);
  return (
    <div>
      <TopBarImage>
          <p>{ticketInfo.pickupPoint}</p>
          <p>-</p>
          <p>{ticketInfo.destination}</p>
      </TopBarImage>
    <div
    className='select-seat'
    >
      

    <Toast
        show={seatsError.shown}
        onClose={()=>setseatsError({...seatsError,shown:false})}
        style={{
            position:"fixed",
            top:0,
            right:0,
            zIndex:100,
            backgroundColor:seatsError.error?"red":"var(--app-color)"
        }}
        
        >
            <Toast.Header>
                {seatsError.error?"Error":"Success"}
            </Toast.Header>
            <Toast.Body>
                {seatsError.message}
            </Toast.Body>
        </Toast>


      <Modal 
        show={show}
        onHide={()=>setShow(false)}
        onBackdropClick={()=>setShow(false)}
        >
        <Modal.Header closeButton >
          Confirm
        </Modal.Header>
        <Modal.Body>
          Do you want to proceed and pay for seat{selectedSeats.length>1?"s":""} {selectedSeats.map((seat,index)=>`${seat+1}${index<selectedSeats.length-1?",":""}`)}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={()=>setShow(false)} >Reject</Button>
          <Button variant='success' onClick={()=>{
            setShow(false);
            navigate("/payment-gateway");
          }} >Confirm</Button>
        </Modal.Footer>
      </Modal>
      <div
      className='holder'
      >
          <div
      className='select-seat-info'
      >
        <div
        style={{
          width:"100%",
          display:"flex",
          flexDirection:"column",
          gap:10,
          marginBottom:20
        }}
        >
          <label>From</label>
          <Select
            options={[]}
            placeholder={ticketInfo.pickupPoint??"Pickup point"}
          />
          <label>To</label>
          <Select
            options={[]}
            placeholder={ticketInfo.destination??"Dropping point"}
          />
          <label>Date</label>
          <input 
               className='input'
                type={isFocused?"date":"text"}  
                placeholder='Departure date' 
                value={ticketInfo.date??""}
                style={{
                  paddingLeft:30
                }}
                
                onFocus={(e)=>{
                    setIsFocused(true);
                    setIconsShown(true);
                }}
                onBlur={(e)=>{
                    setIsFocused(false);
                    setIconsShown(false);
                }}

                onChange={(e)=>setTicketInfo({...ticketInfo,date:e.target.value})}
                
                />   
        </div>
        <h3 className='isBigScreen' style={{textAlign:"center",textDecorationLine:"underline"}} >
          Selected seats {selectedSeats.length>0?`(${selectedSeats.length})`:""}
        </h3>
        {
          selectedSeats.length>0?
          <div className='isBigScreen' >
          {
            selectedSeats.map((seat,index)=>{
              return(
                <div key={index} 
                  style={{
                    position:"relative",
                    display:"flex",
                    flexDirection:"column",
                    gap:10,
                    padding:5,
                    boxShadow:"2px 2px 2px rgba(0,0,0,0.1)"
                  }}
                >
                  <div style={{
                    position:"relative",
                    display:"flex",
                    flexDirection:"row",
                    gap:10
                  }} >
                      <p>seat: {seat+1}</p>
                      <p>Ksh.{fareCost}</p> 
                  </div>
                  <div  style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:5
                  }}>
                      <label>Name</label>
                      <input onChange={(e)=>{
                        let travellers = [...selectedSeatsInfo];
                        travellers[index].name = e.target.value;
                        setSelectedSeatsInfo(travellers); 
                      }} type='text' title='name' placeholder='Enter passenger name...' />
                       <label>ID (Optional)</label>
                      <input onChange={(e)=>{
                        let travellers = [...selectedSeatsInfo];
                        travellers[index].id = e.target.value;
                        setSelectedSeatsInfo(travellers); 
                      }} type='text' title='name' placeholder='Enter passenger ID number...' />
                  </div>
                  

                  <FiX onClick={()=>{
                    let out = [...selectedSeats];
                    out.splice(index,1);
                    setSelectedSeats(out);
                  }} 
                  style={{
                    position:"absolute",
                    right:5
                  }}
                  color='red'
                  />
                </div>
              )
            })
          }
          <div
          style={{
                    position:"relative",
                    display:"flex",
                    flexDirection:"row",
                    fontWeight:"bold",
                    marginTop:10
                  }}
          >
            <p>Total : </p>
            <p>Ksh.{fareCost*selectedSeats.length}</p>
          </div>
        </div>:
        <p className='isBigScreen' >No seats have been selected</p>
        }
        <div
        className='isBigScreen'
          style={{
                    position:"relative",
                   
                    flexDirection:"row",
                    gap:20,
                  }}
        >
          <div
            style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              gap:5
            }}
          ><FormCheck
            type='radio'
            name='gender'
          onChange={(e)=>{
          }}
          /> Male</div>
          <div
            style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              gap:5
            }}
          ><FormCheck
          type='radio'
          name='gender'
          /> Female</div>
        </div>
        
        <Button
        className='isBigScreen'
        onClick={()=>{
          setShow(true);
          console.log(selectedSeatsInfo);
        }}
        disabled={selectedSeats.length<1?true:false}
        style={{
              width:"100%",
              marginTop:20,
              backgroundColor:"var(--app-color)",
              borderColor:"var(--app-color)",
              
              alignItems:"center"
            }}
        >Proceed</Button>
      </div>

      {
        bus.error?
        <div style={{
          display:"flex",
          flexDirection:"column",
          width:"100%",
          height:"100%",
          alignItems:"center"
        }} >
          <p>An error occurred</p>
          <Button 
          variant='success'
          onClick={fetchBus}
          >Retry...</Button>
        </div>:
        bus.loading?
        <div
        className='select-seat-vehicle'
        >
          <Lottie 
                    size={100}
                    loop 
                    animationData={require("../../assets/lottie_animations/progress1.json")}/>
        </div>:
        !bus.results?
        <p>Bus not found</p>:
      <div
      className='select-seat-vehicle'
      >
        <div
        className='driver-and-door'
        >
          <div
            style={{
              display:"flex",
              flexDirection:"row",
              gap:5
            }}
          >
            {
              createArray(vehicle.seatsInfront).map((item,frontSeatIndex)=>{
                return(
                  <div
                              style={{
                                marginTop:5,
                                marginLeft:5,
                                marginRight:vehicle.seatsConfiguration.left-1==frontSeatIndex?5:5,
                                
                              }}
                              className='customer-seat'
                              onClick={()=>{
                                if(isBooked(`Front${item}`)){
                                  return;
                                }
                                  if(userInfo.gender == null){
                                    /*setseatsError({
                                      shown:true,
                                      error:true,
                                      message:"Please select a gender!"
                                    })*/
                                    //return;
                                  }

                                  
                                  
                                  if(selectedSeats.length>0){
                                  for (let index = 0; index < selectedSeats.length; index++) {
                                    if (selectedSeats[index] == `Front${item}`) {
                                      let output = [...selectedSeats];
                                      output.splice(index,1);
                                      setSelectedSeats(output);
                                      let infoOutput = [...selectedSeatsInfo];
                                      infoOutput.splice(index,1);
                                      setSelectedSeatsInfo(infoOutput);
                                      return;
                                    }
                                    
                                  }
                                }
                                setSelectedSeats([...selectedSeats,`Front${item}`]);
                                //setCartContext(selectedSeats);
                                let info = {
                                  seat:`Front${item}`,
                                  name:null,
                                  id:null
                                }
                                setSelectedSeatsInfo(info);

                                }} 
                              >
                                <img
                                  src='/assets/images/icons/car-seat.png'
                                  />
                                  <div
                                  style={{
                                    width:"100%",
                                    height:15,
                                    border:"1px solid #ffffff",
                                    backgroundColor:isBooked(`Front${item}`)?"grey":selectedSeats.filter(i=>i==`Front${item}`).length>0?"var(--app-color)":"#ffffff",
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center"
                                  }}
                                  >
                                    <label style={{fontSize:11,
                                      fontWeight:800,
                                       color:selectedSeats.filter(i=>i==`Front${item}`).length>0?"#ffffff":"#000000",
                                      }} >Fr{frontSeatIndex+1}</label>
                                  </div>
                                </div>
                )
              })
            }
          </div>
          <img
          src='/assets/images/icons/car-steering-wheel.png'
          />
        </div>
        <div
          className='seats-holder'
        >

        <div style={{
        display:"flex",
        flexDirection:"column",

      }} >
        {
        seats.map((group,i)=>{
          return (<div style={{
            display:"flex",
            flexDirection:"row"
          }} >
              {
                group.map((seat,seatIndex)=>{
                  seatNumber ++;
                  const seatNum = i<=0?seatIndex:seats[i-1].length*i+seatIndex;
                  return <div
                              style={{
                                marginTop:5,
                                marginLeft:5,
                                marginRight:vehicle.seatsConfiguration.left-1==seatIndex?"auto":5,
                  
                              }}
                              className='customer-seat'
                              onClick={()=>{
                                if(isBooked(seatNum)){
                                  return;
                                }
                                  if(userInfo.gender == null){
                                    /*setseatsError({
                                      shown:true,
                                      error:true,
                                      message:"Please select a gender!"
                                    })*/
                                    //return;
                                  }

                                  
                                  
                                  if(selectedSeats.length>0){
                                  for (let index = 0; index < selectedSeats.length; index++) {
                                    if (selectedSeats[index] == seatNum) {
                                      let output = [...selectedSeats];
                                      output.splice(index,1);
                                      setSelectedSeats(output);
                                      let infoOutput = [...selectedSeatsInfo];
                                      infoOutput.splice(index,1);
                                      setSelectedSeatsInfo(infoOutput);
                                      return;
                                    }
                                    
                                  }
                                }
                                setSelectedSeats([...selectedSeats,seatNum]);
                                let info = {
                                  seat:seatNum+1,
                                  name:null,
                                  id:null
                                }
                                setSelectedSeatsInfo([...selectedSeatsInfo,info]);
                                }} 
                              >
                                <img
                                  src='/assets/images/icons/car-seat.png'
                                  />
                                  <div
                                  style={{
                                    width:"100%",
                                    height:15,
                                    border:"1px solid #ffffff",
                                    backgroundColor:isBooked(seatNum)?"grey":selectedSeats.filter(i=>i==seatNum).length>0?"var(--app-color)":"#ffffff",
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center"
                                  }}
                                  >
                                    <label 
                                    style={{fontSize:11,
                                      fontWeight:800,
                                      color:selectedSeats.filter(i=>i==seatNum).length>0?"#ffffff":"#000000",
                                      }} >{seatNum+1}</label>
                                  </div>
                                </div>;
                })
              }

          </div>);
        })
      }
        </div>
        </div>

        <div
        style={{
          display:"flex",
          flexDirection:'row',
          justifyContent:"space-between",
          alignItems:"center",
          width:"100%",
          marginTop:10,
          borderTop:"1px solid #000000",
          padding:10
        }}
        >
          {
            [1,2,3].map((_,index)=>{
              return <div key={index} className='customer-seat' >
            <img
              src='/assets/images/icons/car-seat.png'
              />
              <div
                  style={{
                          width:"100%",
                          height:15,
                                    border:"1px solid #ffffff",
                                    backgroundColor:index==0?"var(--app-color)":index==1?"grey":"#ffffff",
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center"
                                  }}
                                  />
              <label>{index==0?"Selected":index==1?"Booked":"Empty"}</label>
          </div>
            })
          }
        </div>
      </div>
      }
      </div>
      {/* For small screens */}
      <BottomSheet heading={`Selected seats ${selectedSeats.length>0?`(${selectedSeats.length})`:""}`} >
        {
          selectedSeats.length>0?
          <div>
          {
            selectedSeats.map((seat,index)=>{
              return(
                <div key={index} 
                  style={{
                    position:"relative",
                    display:"flex",
                    flexDirection:"column",
                    gap:10,
                    padding:5,
                    boxShadow:"2px 2px 2px rgba(0,0,0,0.1)"
                  }}
                >
                  <div style={{
                    position:"relative",
                    display:"flex",
                    flexDirection:"row",
                    gap:10
                  }} >
                      <p>seat: {seat+1}</p>
                      <p>Ksh.{fareCost}</p> 
                  </div>
                  <div  style={{
                    display:"flex",
                    flexDirection:"column",
                    gap:5
                  }}>
                      <label>Name</label>
                      <input onChange={(e)=>{
                        let travellers = [...selectedSeatsInfo];
                        travellers[index].name = e.target.value;
                        setSelectedSeatsInfo(travellers); 
                      }} type='text' title='name' placeholder='Enter passenger name...' />
                       <label>ID (Optional)</label>
                      <input onChange={(e)=>{
                        let travellers = [...selectedSeatsInfo];
                        travellers[index].id = e.target.value;
                        setSelectedSeatsInfo(travellers); 
                      }} type='text' title='name' placeholder='Enter passenger ID number...' />
                  </div>
                  

                  <FiX onClick={()=>{
                    let out = [...selectedSeats];
                    out.splice(index,1);
                    setSelectedSeats(out);
                  }} 
                  style={{
                    position:"absolute",
                    right:5
                  }}
                  color='red'
                  />
                </div>
              )
            })
          }
          <div
          style={{
                    position:"relative",
                    display:"flex",
                    flexDirection:"row",
                    fontWeight:"bold",
                    marginTop:10
                  }}
          >
            <p>Total : </p>
            <p>Ksh.{fareCost*selectedSeats.length}</p>
          </div>
        </div>:
        <p>No seats have been selected</p>
        }
        <div
        style={{
          width:"100%",
          display:"flex",
          flexDirection:"row",
          gap:10
        }}
        >
          <div
            style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              gap:5
            }}
          ><FormCheck
            type='radio'
            name='gender'
          onChange={(e)=>{
          }}
          /> Male</div>
          <div
            style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              gap:5
            }}
          ><FormCheck
          type='radio'
          name='gender'
          /> Female</div>
        </div>
        
        
        <Button
        onClick={()=>setShow(true)}
        disabled={selectedSeats.length<1?true:false}
        style={{
              width:"100%",
              marginTop:20,
              backgroundColor:"var(--app-color)",
              borderColor:"var(--app-color)",
              marginBottom:10
            }}
        >Proceed</Button>
      </BottomSheet>
    </div>
    </div>
    
  )
}

export default SelectSeat;