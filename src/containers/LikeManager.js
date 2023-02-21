import React from 'react'
import { useState, useEffect,useContext } from 'react';
import AuthContext from '../context/AuthContext';
export default function LikeManager(props) {
  let {User}=useContext(AuthContext);
  let userdata=JSON.parse(User.user);
  const [upToggled, setUpToggled] = useState(false);
  const [downToggled, setDownToggled] = useState(false);
  let getLikes=async()=>{
    const response=await fetch(`http://localhost:8000/getLike/${props.id}/?u=${userdata.id}`);
    const data = await response.json();
    setUpToggled(data.upToggled);
    setDownToggled(data.downToggled);
  }
  
    const [likes,setLikes]=useState(props.likes);
    useEffect(() => {
      setLikes(props.likes);
      getLikes();
    }, [props.likes]);

    // const [modal,setModal]=useState(false);
    let increment=async()=>{
      if(!upToggled && !downToggled){
        setUpToggled(true);
        const response=await fetch(`http://localhost:8000/updateLike/${props.id}/?v=1&u=${userdata.id}&c=1`);
        const data=await response.json();
        console.log(data);
        console.log("case:",1);
        setLikes(data.likecount);
      }
      else if(!downToggled && upToggled){
        setUpToggled(false);
        const response=await fetch(`http://localhost:8000/updateLike/${props.id}/?v=-1&u=${userdata.id}&c=2`);
        const data=await response.json();
        console.log(data);
        console.log("case:",2);
        setLikes(data.likecount);
      }else if(!upToggled && downToggled){
        setUpToggled(true);
        setDownToggled(false);
        const response=await fetch(`http://localhost:8000/updateLike/${props.id}/?v=2&u=${userdata.id}&c=3`);
        const data=await response.json();
        console.log(data);
        console.log("case:",3);
        setLikes(data.likecount);
      }
    }
    let decrement=async()=>{
      if(!downToggled && !upToggled){
        setDownToggled(true);
        const response=await fetch(`http://localhost:8000/updateLike/${props.id}/?v=-1&u=${userdata.id}&c=4`);
        const data=await response.json();
        console.log(data);
        console.log("case:",4);
        setLikes(data.likecount);
      }
      else if(!upToggled && downToggled){
        setDownToggled(false);
        const response=await fetch(`http://localhost:8000/updateLike/${props.id}/?v=1&u=${userdata.id}&c=5`);
        const data=await response.json();
        console.log(data);
        console.log("case:",5);
        setLikes(data.likecount);
      }else if(!downToggled && upToggled){
        setDownToggled(true);
        setUpToggled(false);
        const response=await fetch(`http://localhost:8000/updateLike/${props.id}/?v=-2&u=${userdata.id}&c=6`);
        const data=await response.json();
        console.log(data);
        console.log("case:",6);
        setLikes(data.likecount);
      }
    }
  return (
    <>
        <i className="fa fa-arrow-up me-2" aria-hidden="true" onClick={increment} style={{ color: upToggled?'blue':'black',  }} ></i>
        <span className='me-2' style={{fontWeight:"bold"}}>{likes}</span>
        <i className="fa fa-arrow-down me-4" aria-hidden="true" onClick={decrement} style={{ color: downToggled?'blue':'black',  }} ></i>
    </>
  )
}
