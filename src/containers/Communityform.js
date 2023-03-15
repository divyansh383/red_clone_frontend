import React, { useContext, useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import AuthContext from '../context/AuthContext';

export default function Communityform() {
  const { User } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  let userdata=JSON.parse(User.user);
  if (User.user == null) {
    window.location = '/';
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true); // Set isLoading to true when the form is submitted
      console.log('Community form submitted:', name, description);
      console.log(User.user)
      let response = await fetch("http://localhost:8000/createCommunity",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'name': name,
            'description': description,
            'admin_id': userdata.id
          })
        })
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set isLoading back to false after the request is complete
    }
  };

  return (
    <div style={{ margin: '20vh 10vw', backgroundColor: 'white' }}>
      <form onSubmit={handleSubmit}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <h1 className="mb-4">Create a Community</h1>
          <MDBInput
            wrapperClass="mb-4"
            label="Community Name"
            id="communityNameInput"
            type="text"
            name="communityName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" rows="3" name="caption" placeholder='Community Description'></textarea><br></br>
          {isLoading ? ( // Use ternary operator to conditionally render a loading message/spinner
            <div>Loading...</div>
          ) : (
            <MDBBtn className="mb-4" type="submit">
              Create
            </MDBBtn>
          )}
        </MDBContainer>
      </form>
    </div>
  );
}
