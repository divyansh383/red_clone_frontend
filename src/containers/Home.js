import React, { useContext,useState,useEffect } from 'react'
import PostBox from '../components/PostBox';
import AuthContext from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom';
import bgimg from './appbg.jpg';
import LoginPage from './LoginPage';
export default function Home(props) {
  let {User}=useContext(AuthContext);
  let userdata=JSON.parse(User.user);
  let {searchResult,setSearch}=useContext(AuthContext);
  let [posts,setPosts]=useState([]);
  useEffect(()=>{
    if(Object.keys(props).length === 0){
      getPosts();
    }
  },[searchResult])

  let getPosts=async()=>{
    let response =await fetch('http://localhost:8000/getpost')
    let data = await response.json();  
    setPosts(data);
  }
  
  let getFilter=async(filter)=>{
    console.log(filter)
    let response =await fetch(`http://localhost:8000/search/?s=${filter}`)
    let data=await response.json()
    setSearch(data)
  }
  //----------------------------------------
  let basics={
    backgroundColor:'#dae0e6'
  }
  let homePage={
    display:"grid",
    gridTemplateColumns: "2fr 1fr",
    margin:"60px 15vw",
  }
  let card={
    backgroundColor:"white",
    padding:"10px",
    margin:"20px",
    display:"flex",
    flexDirection:"row",
    boxShadow: "0px 10px 10px #C5C6D0",
  }
  let glow = {
    color: "black",
    ":hover": {
      color: "blue"
    }
  }
  //----------------------------------------
  return (
    <div style={basics}>
      {User.user?
      <div className='generalPage' style={homePage}>
        <div className='centralBar'>
           <div style={card}>
              <Link to={`/profile/${userdata.id}`}>
                <img src={userdata.profile_picture} className="rounded-circle" height="30" style={{marginRight:"7px"}}/>
              </Link>
              <Link to="/post"><input type="text" className="form-control ml-3" name="caption" placeholder='make a post !' style={{height:"35px",width:"30vw"}}/></Link>
            </div>

          <div style={card}>
            <div className="btn-group">
              <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" onChange={()=>{getFilter('new')}}/>
              <label className="btn btn-primary" for="option1">New</label>

              <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off"  onChange={()=>{getFilter('hot')}}/>
              <label className="btn btn-primary" for="option2">Hot</label>

              <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off"  onChange={()=>{getFilter('top')}}/>
              <label className="btn btn-primary" for="option3">Top</label>
            </div>
          </div>
          {searchResult && searchResult.length > 0 ?
            searchResult.map((postitem) => {
              return (
                <PostBox 
                  id={postitem.id}
                  poster={postitem.poster.first_name} 
                  caption={postitem.caption} 
                  file={postitem.file} 
                  profile_picture={postitem.poster.profile_picture}
                  likes={postitem.likes}
                />
              )
            }) :
            posts.map((postitem) => {
              return (
                <PostBox 
                  id={postitem.id}
                  poster={postitem.poster.first_name} 
                  caption={postitem.caption} 
                  file={postitem.file} 
                  profile_picture={postitem.poster.profile_picture}
                  likes={postitem.likes}
                />
              )
            })
          }

        </div>
        <div className='Lbar'>
          <div>
            <div style={card}>
              <h1>Try premium</h1>
            </div>
            <div style={card}>
              <div className='d-flex flex-column'>
                <p>Join a Community</p>
                <hr></hr>
                <Link to="/create_a_community"><button className='btn btn-secondary'>Create Community</button></Link>
              </div>
            </div>
            <div style={card}>
              <h1>terms and conditions</h1>
            </div>
          </div>  
        </div>
      </div>
      :
      //------------------------------------------------------
      <div className='generalPage ' style={{display:"grid",gridTemplateColumns: "3fr 1fr",}}>
          <div><img src={bgimg} style={{height: '100%', width: '100%'}} alt="background image" /></div>
          <div></div>
      </div>
      //---------------------------------------------------------
      }
    
    </div>
    
  )
}
