import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import { DataURLS } from '../../utils/DataURLS';
import { UserContext } from '../../contexts';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateBus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData,setUserData] = useContext(UserContext);
    const [credentials,setCredentials] = useState({
        name:"",
        slug:"",
        type:"",
        busNumber:"",
        fare:"",
        boardingPoints:[],
        droppingPoints:[],
        numberOfSeats:0,
        description:"",
        journeyDate:"",
        startLocation:"",
        endLocation:""
    });

    const create = ()=>{
        const token = userData.data.token;
        console.log(userData);
        fetch(DataURLS.buses,{
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(credentials),
            method:"POST",
        }).then(req=>req.json()).then(response=>{
            console.log(response);
            if(response?.error){
                navigate("/login",{state:{from:location},replace:true});
            }
            
        }).catch(e=>{
            console.log(e);
        })
    }

  return (
    <div
    style={{
        marginTop:100,
        display:"flex",
        flexDirection:"column"
    }}
    >
        <label>name</label>
              <input 
                type="text" 
                placeholder="name..." 
                onChange={(e)=>setCredentials({...credentials,name:e.target.value})} />
        <label>slug</label>
              <input 
                type="text" 
                placeholder="slug..." 
                onChange={(e)=>setCredentials({...credentials,slug:e.target.value})} />
        <label>type</label>
              <input 
                type="text" 
                placeholder="type..." 
                onChange={(e)=>setCredentials({...credentials,type:e.target.value})} />
        <label>busNumber</label>
              <input 
                type="text" 
                placeholder="busNumber..." 
                onChange={(e)=>setCredentials({...credentials,busNumber:e.target.value})} />
        <label>fare</label>
              <input 
                type="text" 
                placeholder="fare..." 
                onChange={(e)=>setCredentials({...credentials,fare:e.target.value})} />
        <label>boardingPoints (Separated by a comma)</label>
              <input 
                type="text" 
                placeholder="boardingPoints..." 
                onChange={(e)=>setCredentials({...credentials,boardingPoints:e.target.value.split(",")})} />
        <label>droppingPoints (Separated by a comma)</label>
              <input 
                type="text" 
                placeholder="droppingPoints..." 
                onChange={(e)=>setCredentials({...credentials,droppingPoints:e.target.value.split(",")})} />
        <label>numberOfSeats</label>
              <input 
                type="text" 
                placeholder="numberOfSeats..." 
                onChange={(e)=>setCredentials({...credentials,numberOfSeats:e.target.value})} />
        <label>description</label>
              <input 
                type="text" 
                placeholder="description..." 
                onChange={(e)=>setCredentials({...credentials,description:e.target.value})} />
        <label>journeyDate</label>
              <input 
                type="date" 
                placeholder="journeyDate..." 
                onChange={(e)=>setCredentials({...credentials,journeyDate:e.target.value})} />
        <button 
        variant='success'
        onClick={()=>create()}
        >
            Create
        </button>
              
                                     
    </div>
  )
}

export default CreateBus;