import React, { useState,useEffect,useContext } from 'react'
import CommentBox from "../containers/CommentBox"
import AuthContext from '../context/AuthContext';
//------------------------------------------------
export default function CommentTree(props) {
  const [comments,setComments]=useState([]);
  let {commentCount,setCommentCount}=useContext(AuthContext);
  let getComments=async()=>{
    try{
      let response = await fetch(`http://localhost:8000/getComments?pid=${props.pid}`)
      let data = await response.json();
      setComments(data);
    }
    catch(error){console.log("Error");}
  }
  useEffect(()=>{
    getComments()
  },[props.pid,commentCount])
  
  return (
    <div>
      {comments.map((cmt)=>{
        return(
          (cmt.parent==null)?<CommentBox commentData={cmt} allcomments={comments}/>:null
         
        )
      })
      }
    </div>
  )
}
