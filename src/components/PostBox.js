import React, { useState, useEffect,useContext } from 'react'
import {Link} from 'react-router-dom'
import LikeManager from '../containers/LikeManager';
import AuthContext from '../context/AuthContext'
// import PostView from './PostView';
// import {Modal,ModalHeader,ModalBody} from 'reactstrap';
export default function PostBox(props) {  
  
  let {User}=useContext(AuthContext);
  let userdata=JSON.parse(User.user);

  
  //---------------------------------------
  let pBox={ 
    backgroundColor:"white",
    padding:"10px",
    margin:"20px",
    display:"flex",
    flexDirection:"column",
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px",
    textAlign:"center",
    boxShadow: "0px 0px 10px #C5C6D0",
  }
  let image_details={
    "poster":props.poster,
    "imglink":props.file,
    "caption":props.caption,
    "profile":props.profile_picture
  }
  //-----------------------------------------
  //=====================================
  return (
    <div style={pBox}>
      <div className='header me-5' style={{display:"flex",flexDirection:"row"}}> 
      <Link to={`/profile/${props.id}`}><img src={props.profile_picture} className="rounded-circle me-2" height="25"/></Link>
      <Link to={`/profile/${props.id}`}><h6>{props.poster}</h6></Link>
      </div>
      <div className='post'>
        {props.file && (props.file.includes('.mp4') || props.file.includes('.ogg') || props.file.includes('.webm')) ? (
          <p><video height="200vh" width="100%" controls>
            <source src={props.file} type="video/mp4" />
            <source src={props.file} type="video/ogg" />
            <source src={props.file} type="video/webm" />
            Your browser does not support the video tag.
          </video></p>
        ) : (
          <p><Link to={`/postView/${props.id}`}><img src={props.file} height="200vh" alt="post image" /></Link></p>
        )}
      </div>
      
      <div className='stats'>
        <Link to={`/postView/${props.id}`}>{props.caption}</Link><br></br>
        <span><LikeManager likes={props.likes} id={props.id}/></span>
        <Link to={`/postView/${props.id}`} style={{color:"grey"}}><i className="fa fa-comment me-4" aria-hidden="true"></i></Link>
        <i className="fa fa-share me-4" aria-hidden="true"></i>
        <i className="fa fa-save me-4" aria-hidden="true"></i>

        {/* <Modal size="lg"  isOpen={modal} toggle={()=>setModal(!modal)} style={{height:"800px"}}>
          <ModalHeader toggle={()=>setModal(!modal)}>
            Post
          </ModalHeader>
          <ModalBody>
            <PostView imgdetails={image_details}/>
          </ModalBody>
        </Modal> */}
      </div>
    </div>
  )
}
