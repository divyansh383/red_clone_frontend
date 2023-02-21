import React, { useEffect,useState,useContext } from 'react'
import { useParams } from 'react-router-dom';
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
  //--------------------------------------------
  let basics={
    backgroundColor:'#dae0e6',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
  let homePage={
    display:"grid",
    gridTemplateColumns: "1fr 2fr",
    margin:"100px 15vw",
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
                <h1 style={{textAlign:"center"}}>{userData.user.first_name +" "+userData.user.last_name}</h1>
                <div class={imgStyles}>
                 <img src={userData.user.profile_picture} height="200px" width="200px"></img>
                </div><br></br>
                {(userdata.id==id)?
                  (<div>
                    <button className='btn btn-primary' onClick={changePassword}>change password</button>
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

        <div style={{backgroundColor:"green"}} className="userposts">
          {User.user?
            <div>
              {userData && (
                <>
                  <div className='follow details' style={{backgroundColor:"white"}}>
                    <h1>{userData.user.first_name +" "+userData.user.last_name}</h1>
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
