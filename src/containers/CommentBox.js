import React, { useState,useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext';
//---------------------------------------------
export default function CommentBox(props) {
  let handleReply=async()=>{

  }
  let {User}=useContext(AuthContext);
  let {commentCount,setCommentCount}=useContext(AuthContext);

  let userdata=JSON.parse(User.user);
  const [reply,setReply]=useState('');
  let addReply = async (event) => {
    event.preventDefault();
    if (!reply) {
      console.log("Can't send empty reply");
      return;
    }
    let response = await fetch('http://localhost:8000/addComment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: reply,
        uid: userdata.id,
        pid: props.commentData.comment_post,
        parent: props.commentData.id,
      }),
    });
    let data = await response.json();
    console.log(data);
    setCommentCount(commentCount + 1);
    setReply('');
  };
  
  
  //-----------------------------------------------------------
  let commentBoxStyles={
    backgroundColor:'#D3D3D3',
    padding:'3px 10px',
    borderRadius:'25px 25px 0px 0px',
    margin:'5px'
  }
  //----------------------------------------------------------
  return (
    <div style={commentBoxStyles}>
      <div className='header me-5 d-flex flex-row'> 
        <Link to={`/profile/${props.commentData.commented_by.id}`}><img src={props.commentData.commented_by.profile_picture} className="rounded-circle me-2" height="25"/></Link>
        <Link to={`/profile/${props.commentData.commented_by.id}`}><p>{props.commentData.commented_by.first_name}</p></Link>
      </div>

      <div className='px-2' style={{backgroundColor:"white"}}>{props.commentData.text}</div> 

      <div style={{textAlign:'right'}}>
        <Link onClick={handleReply} data-bs-toggle="collapse" data-bs-target={`#collapseExample-${props.commentData.id}`} role="button" aria-expanded="false">add reply...</Link>
        <div className="collapse" id={`collapseExample-${props.commentData.id}`}>
          <form className="form-group" onSubmit={addReply}>
            <textarea className="form-control" name="cmText" value={reply} onChange={(event)=>{setReply(event.target.value)}} rows="3" placeholder='add a comments'></textarea>
            <button className="btn btn-primary mb-4" onSubmit={addReply} data-bs-toggle="collapse" data-bs-target={`#collapseExample-${props.commentData.id}`} role="button" aria-expanded="false">Post</button>
          </form>
        </div>
      </div>

      <div className='replies'>
        {props.allcomments.map((reps)=>{
          return(
            (reps.parent==props.commentData.id)?<CommentBox commentData={reps} allcomments={props.allcomments}/>:null
          )})
        }
      </div>

    </div>
  )
}
