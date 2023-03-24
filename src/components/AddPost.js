import React, { useContext, useState } from 'react'
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
  let {makePost}=useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const options = ["Option 1", "Option 2", "Option 3"];

  if(User.user==null){
    return(
      <p> Create an account to make a post</p>
    )
  }

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Post page</h2>
      <form onSubmit={makePost} enctype="multipart/form-data">
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <input type="hidden" name="poster" value={userdata.id}/>
          <textarea className="form-control" rows="3" name="caption" placeholder='add Caption'></textarea>
          <MDBInput wrapperClass='mb-4' id='url' type='file' name="file" />
          <MDBBtn className="mb-4" onSubmit={makePost}>Post</MDBBtn>
          <div class="dropdown">
            <button class="btn btn-primary dropdown-bs-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Select a Community
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <input class="form-control dropdown-search" type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
              <div class="dropdown-divider"></div>
              {filteredOptions.map((option) => (
                <a class="dropdown-item" href="#" key={option}>
                  {option}
                </a>
              ))}
            </div>
          </div>
        </MDBContainer>
      </form>
    </div>
  )
}
