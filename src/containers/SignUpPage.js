import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import AuthContext from '../context/AuthContext';

export default function SignUpPage() {
  const { signupUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await signupUser(event);
    setIsLoading(false);
  };

  return (
    <div style={{ margin: '20vh 10vw' }}>
      <form onSubmit={handleSignUp}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBInput wrapperClass="mb-4" label="First Name" id="form1" type="text" name="first_name" required />
          <MDBInput wrapperClass="mb-4" label="Last Name" id="form1" type="text" name="last_name" required />
          <MDBInput wrapperClass="mb-4" label="Email" id="form1" type="email" name="email" required />
          <MDBInput wrapperClass="mb-4" label="Password" id="form2" type="password" name="password" required />
          <MDBInput wrapperClass="mb-4" label="Confirm Password" id="form2" type="password" name="re_password" required />
          <div className="d-flex justify-content-between mx-3 mb-4">
            <Link to="/reset-password">Forgot password?</Link>
          </div>

          <MDBBtn className="mb-4" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <MDBSpinner size="sm" role="status" aria-hidden="true" />
                Loading...
              </>
            ) : (
              'Sign Up'
            )}
          </MDBBtn>
          <MDBBtn color="danger">
            <i className="fab fa-google me-2" aria-hidden="true"></i>
            <span>Sign up with <strong>Google</strong></span>
          </MDBBtn>
          <br />
          <div className="text-center">
            <p>
              Already registered ? <Link to="/login">Log in</Link>
            </p>
          </div>
        </MDBContainer>
      </form>
    </div>
  );
}
