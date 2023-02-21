import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Home from '../containers/Home';
import AuthContext from '../context/AuthContext'
import {
  MDBInput,
}from 'mdb-react-ui-kit';
export default function Navbar() {
  
  let {logoutUser}=useContext(AuthContext)
  let User=JSON.parse(localStorage.getItem('user_info'));
  //css-----
  let userInfoBox={
    backgroundColor:'#DBDBDB',
    width:'10vw',
    padding:'3px',
    borderRadius:'15px'
  }
  let [searchUser,setSearchInput]=useState();
  let {searchResult,setSearch}=useContext(AuthContext);
  let handleSearch=async()=>{
    try {
      const response = await fetch(`http://localhost:8000/search/?s=${searchUser}`);
      const data = await response.json();
      setSearch(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    handleSearch();
  },[searchUser])
  //---------
  
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position: 'fixed', top: 0, left: 0, width: '100%' }}>
      <div className="container-fluid" style={{display:'flex',justifyContent:'space-around'}}>
      <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
        <div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" >
            
            <Link className="navbar-brand mt-2 mt-lg-0"  to='/'>
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
              />
            </Link>
            <div className="d-flex flex-row">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
                <li className="nav-item">
                  <a className="nav-link" href="#">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Team</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Projects</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div >
            <form onSubmit={handleSearch} style={{display:'flex',flexDirection:'rows'}}>
              <MDBInput  label='Search' type='search' name="search" style={{borderRadius:'0px 0px 0px 0px'}}
                         onChange={(event)=>{setSearchInput(event.target.value);} } onSubmit={handleSearch}
              />
            </form>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <a className="text-reset me-3" href="#">
            {
              User==null?
              (<div><Link to="/login"><button type="button" className="btn btn-primary me-1">Login</button></Link>
              <Link to='/signup'><button type="button" className="btn btn-primary">Signup</button></Link></div>):(<></>)
            }
          </a>

          {User!=null?
           
            (<div className="dropdown">
               <Link to="/post"><i className="fas fa-plus me-3"></i></Link>
              <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">Some news</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">Another news</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </div>)
            :(<div></div>)
          }
          { User!=null ?
            (<div className="userName dropdown" style={userInfoBox}>
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={User.profile_picture}
                    className="rounded-circle"
                    height="25"
                    loading="lazy"
                  />
                  <div style={{paddingLeft:'5px'}} className="hide-name">
                    <small style={{fontWeight:'bold'}}>{User.first_name}</small>
                  </div>
                </a>
              
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li> 
                  <Link to={`/profile/${User.id}`} className="dropdown-item" href="#">My profile</Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">Settings</a>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={logoutUser}>Logout</Link>
                </li>
              </ul>
            </div>)
            :
            (<div></div>)
          } 
        </div>
      </div>
    </nav>

      
    </div>
  )
}
//------------
