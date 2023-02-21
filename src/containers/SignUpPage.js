import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}from 'mdb-react-ui-kit';
import AuthContext from '../context/AuthContext';
export default function SignUpPage() {
  let {signupUser}=useContext(AuthContext);
  return (
    <div style={{margin:"20vh 10vw"}}>
      <form onSubmit={signupUser}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

        <MDBInput wrapperClass='mb-4' label='First Name' id='form1' type='text' name="first_name" required/>
        <MDBInput wrapperClass='mb-4' label='Last Name' id='form1' type='text' name="last_name" required/>
        <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' name="email" required/>
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name="password" required/>
        <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form2' type='password' name="re_password" required/>
        <div className="d-flex justify-content-between mx-3 mb-4">
          <Link to="/reset-password">Forgot password?</Link>
        </div>

        <MDBBtn className="mb-4" onSubmit={signupUser}>Sign Up</MDBBtn>
        <MDBBtn color="danger">
            <i className="fab fa-google me-2" aria-hidden="true"></i>
            
            <span>Sign up with <strong>Google</strong></span>
        </MDBBtn><br></br>
        <div className="text-center">
          <p>Already registered ? <Link to="/login">Log in</Link></p>
        </div>

      </MDBContainer>
      </form>
    </div>
  )
}
