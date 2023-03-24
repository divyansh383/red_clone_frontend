import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import AuthContext from '../context/AuthContext';

export default function LoginPage() {
  const { loginUser, User, googleLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  if (User.user != null) {
    return <p>You are already logged in</p>;
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await loginUser(e);
    setIsLoading(false);
  };

  return (
    <div style={{ margin: '75px 0px', backgroundColor: 'white' }}>
      <form onSubmit={handleLoginSubmit}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBInput wrapperClass="mb-4" label="Email" id="form1" type="email" name="email" />
          <MDBInput wrapperClass="mb-4" label="Password" id="form2" type="password" name="password" />
          <div className="d-flex justify-content-between mx-3 mb-4">
            <a href="/reset-password">Forgot password?</a>
          </div>

          {isLoading ? (
            <MDBBtn className="mb-4" disabled>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing in...
            </MDBBtn>
          ) : (
            <MDBBtn className="mb-4" type="submit">
              Sign in
            </MDBBtn>
          )}

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
