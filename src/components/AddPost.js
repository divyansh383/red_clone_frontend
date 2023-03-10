import React, { useContext } from 'react'
//-----
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
}from 'mdb-react-ui-kit';
//---
import AuthContext from '../context/AuthContext'

export default function AddPost() {
  let {User}=useContext(AuthContext);
  let userdata=JSON.parse(User.user);
  console.log(userdata.id);
  let {makePost}=useContext(AuthContext);
  if(User.user==null){
    return(
      <p> Create an account to make a post</p>
    )
  }
  return (
    <div>
      <h2>Post page</h2>
      <form onSubmit={makePost} enctype="multipart/form-data">
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <input type="hidden" name="poster" value={userdata.id}/>
          <textarea className="form-control" rows="3" name="caption" placeholder='add Caption'></textarea>
          <MDBInput wrapperClass='mb-4' id='url' type='file' name="file" />
          <MDBBtn className="mb-4" onSubmit={makePost}>Post</MDBBtn>
        </MDBContainer>
      </form>
    </div>
  )
}
