import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import AuthContext from '../context/AuthContext';

export default function LoginPage() {
  const { loginUser, User, googleLogin } = useContext(AuthContext);
  if (User.user != null) {
    return <p>You are already logged in</p>;
  }

  return (
    <div style={{margin:"20vh 10vw"}}>
      <form onSubmit={loginUser}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBInput wrapperClass="mb-4" label="Email" id="form1" type="email" name="email" />
          <MDBInput wrapperClass="mb-4" label="Password" id="form2" type="password" name="password" />
          <div class="invalid-feedback">Please choose a username.</div>
          <div className="d-flex justify-content-between mx-3 mb-4">
            <Link to="/reset-password">Forgot password?</Link>
          </div>

          <MDBBtn className="mb-4" type="submit">
            Sign in
          </MDBBtn>
          <MDBBtn color="danger" onClick={googleLogin}>
              <i className="fab fa-google me-2" aria-hidden="true"></i>
              
              <span>continue with <strong>Google</strong></span>
          </MDBBtn><br></br>
          <div className="text-center">
            <p>
              Not a member? <Link to="/signup">Register</Link>
            </p>
            
          </div>
        </MDBContainer>
      </form>
    </div>
  );
}
