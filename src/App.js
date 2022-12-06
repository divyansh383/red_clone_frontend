import React from 'react';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
//redux----------

//--------------
import Home from './containers/Home'
import LoginPage from './containers/LoginPage'
import SignUpPage from './containers/SignUpPage'
import Activate from './containers/Activate'
import ConfirmReset from './containers/ConfirmReset'
import PasswordResetPage from './containers/PasswordResetPage'
import Layout from './components/Layout'

function App() {
  return (
    <div className="App">
      <h1>Home page</h1>
      <BrowserRouter>
        <Layout>
          <Routes>  
            <Route exact path='/' element={<Home/>}/>
            <Route exacr path='/login' element={<LoginPage/>}/>
            <Route exacr path='/signup' element={<SignUpPage/>}/>
            <Route exacr path='/reset-password' element={<PasswordResetPage/>}/>
            <Route exacr path='/password/reset/confirm/:uid/:token' element={<ConfirmReset/>}/>
            <Route exacr path='/activate/:uid/:token' element={<Activate/>}/>  
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
