import React, { useEffect,useState,useContext } from 'react'
import { useParams,Link } from 'react-router-dom';
import PostBox from './PostBox'
import AuthContext from '../context/AuthContext'

export default function ProfilePage() {

  const { id } = useParams();
  let [userData,setUser]=useState();
  let {User}=useContext(AuthContext);
  let userdata=JSON.parse(User.user);

  let changePassword=async ()=>{
    console.log('password reset');
    let response=await fetch('http://localhost:8000/auth/users/reset_password/',
    {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            "email":userdata.email
        })
    }
    )
    if(response.status==204){
        alert('CONFIRMATION_MAIL_SENT')}
    else{console.log('FAILED')}
  }
  useEffect(()=>{
    let getUser=async()=>{
      let response=await fetch(`http://localhost:8000/getUser/${id}`);
      let data=await response.json();
      setUser(data);
    }
    getUser();
  },[id]);

  let {searchResult,setSearch}=useContext(AuthContext);
  let getFilter=async(filter)=>{
    console.log(filter)
    let response =await fetch(`http://localhost:8000/search/?s=${filter}`)
    let data=await response.json()
    setSearch(data)
  }
  //--------------------------------------------
  let basics={
    backgroundColor: "#282c34",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding:"10px",
    margin:"10px"
  }
  let homePage={
    display:"grid",
    gridTemplateColumns: "1fr 2fr",
    margin:"100px 15vw",
  }
  let card={
    backgroundColor:"white",
    padding:"10px",
    margin:"20px",
    display:"flex",
    flexDirection:"row",
    boxShadow: "0px 10px 10px #C5C6D0",
  }
  const imgStyles = {
    borderRadius: '10px',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxWidth: '80%',
    maxHeight: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  //--------------------------------------------
  return (
    <div style={homePage}>
      {/* column1----------------------------- */}
      <div className="column1">
        {User.user?
          <div style={basics}>
            {userData && (
              <>
                <div class={imgStyles}>
                 <img src={userData.user.profile_picture} className="rounded-circle" height="200px" width="200px"></img>
                </div><br></br>
                <h3 style={{textAlign:"center",color:"white"}}>{userData.user.first_name +" "+userData.user.last_name}</h3>
                <h6 style={{textAlign:"center",fontWeight:"lighter",color:"white"}}>{userData.user.email}</h6><br></br>
                {(userdata.id==id)?
                  (<div className='d-flex flex-column'>
                    <button className='btn btn-primary'><Link to="/post" style={{color:"white"}}>Make Post</Link></button><br></br>
                    <button className='btn btn-secondary' onClick={changePassword}>change password</button>
                  </div>):
                  (
                   <div></div> 
                  )
                }
              </>
            )}
          </div>
        :
        <div></div>
      }
      </div>

      {/* ---------------------------------------- */}

      {/* column2----------------------------- */}
      <div className="column2">

        <div className="userposts">
          {User.user?
            <div>
              {userData && (
                <>
                  <div style={card}>
                    <div className="btn-group">
                      <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" onChange={()=>{getFilter('new')}}/>
                      <label className="btn btn-outline-info" for="option1">New</label>

                      <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off"  onChange={()=>{getFilter('hot')}}/>
                      <label className="btn btn-outline-info" for="option2">Hot</label>

                      <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off"  onChange={()=>{getFilter('top')}}/>
                      <label className="btn btn-outline-info" for="option3">Top</label>
                    </div>
                  </div>
                  <div>{
                    userData.posts.map((postitem)=>{
                      return(
                        <PostBox 
                            id={postitem.poster.id}
                            poster={postitem.poster.first_name} 
                            caption={postitem.caption} 
                            file={postitem.file} 
                            profile_pic={postitem.poster.profile_picture}
                          />
                      )
                    })
                  }</div>
                </>
              )}
            </div>
          :
            (<div></div>)
          }
        </div>
      </div>
      {/* --------------------------------------------------- */}
  </div>
  )  
}
