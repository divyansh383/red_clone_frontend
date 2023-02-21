import React, { useContext, useState,useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { useParams } from 'react-router-dom';

export default function Activate() {
  let {verifyUser}=useContext(AuthContext);
  const uid=useParams().uid;
  const token=useParams().token;
  console.log(uid);
  const verify=(event)=>{
    verifyUser(uid,token);
  }
  //---------------
  let msgbox={
    margin: "10vw 20vw",
    backgroundColor:"#DEDEDE",
    textAlign:"center",
    padding:"50px",
    borderRadius:"10px"
  }
  //----------------
  return (
    <div style={msgbox}>
        <h4>Activate Your Account</h4><br></br>
        <button type="button" className="btn btn-primary me-1" onClick={verify}>activate</button>
    </div>
  )
}
