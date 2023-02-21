import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function ConfirmReset() {
  const uid = useParams().uid;
  const token = useParams().token;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  let handleReset = async (event) => {
    event.preventDefault();
    console.log('resetting password');
    try {
      let response = await fetch(`http://localhost:8000/auth/users/reset_password_confirm/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "uid": uid,
            "token": token,
            "new_password": password,
            "re_new_password": passwordConfirm
          })
        });
      if (response.status === 204) {
        alert('PASSWORD_CHANGED');
      } else {
        alert('PASSWORD_RESET_FAILED');
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <h3 style={{ textAlign: "center" }}>Password Reset Confirm</h3>
      <form onSubmit={handleReset}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <MDBInput wrapperClass='mb-4' label='New Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />
          <MDBInput wrapperClass='mb-4' label='New Confirm Password' id='form2' type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} name="confirmpassword" required />
          <MDBBtn className="mb-4" onSubmit={handleReset}>Confirm</MDBBtn>
        </MDBContainer>
      </form>
    </div>
  )
}
