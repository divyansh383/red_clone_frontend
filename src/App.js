import React from 'react';
import './App.css'
import { HashRouter, Routes , Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

//--------------
import Home from './containers/Home'
import LoginPage from './containers/LoginPage'
import SignUpPage from './containers/SignUpPage'
import Activate from './containers/Activate'
import ConfirmReset from './containers/ConfirmReset'
import Navbar from './components/Navbar'
import AddPost from './components/AddPost';
import PostView from './components/PostView';
import ProfilePage from './components/ProfilePage';

//----------------------------------
let generalCSS={
  backgroundColor:'#dae0e6'
}
//--------------------------------------
function App() {
  return (
    <div className="App" style={generalCSS}>
      <HashRouter>
        <AuthProvider>
          <Navbar/>
          <Routes>  
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/login' element={<LoginPage/>}/>
            <Route exact path='/signup' element={<SignUpPage/>}/>
            <Route exact path='/password_reset/confirm/:uid/:token/' element={<ConfirmReset/>}/>
            <Route exact path='/activate/:uid/:token' element={<Activate/>}/>  
            <Route exact path='/post' element={<AddPost/>}/>
            <Route exact path='/postView/:id' element={<PostView/>}/>
            <Route exact path='/profile/:id' element={<ProfilePage/>}/>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
