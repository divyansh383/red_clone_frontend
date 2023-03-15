import {createContext,useState,useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import { json, resolvePath, useNavigate } from 'react-router-dom'

const AuthContext=createContext();
export default AuthContext;

export const AuthProvider=({children})=>{
    const navigate=useNavigate();
    const [auth,setAuth]=useState({
        user:((localStorage.getItem('user_info'))?(localStorage.getItem('user_info')): null),
        access:localStorage.getItem('access'),
        refresh:localStorage.getItem('refresh'),
        isAuthenticated:localStorage.getItem('status'),
    })
    const [searchResult,setSearch]=useState(null);
    //---user-login-----------------------
    let isAuthenticated=async()=>{
        if(localStorage.getItem('access')){
            let accToken=localStorage.getItem('access').replace(/"/g,'');
            let response=await fetch('http://localhost:8000/auth/jwt/verify',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({'token':accToken})
            })
            let data=await response.json();
            if(response.status==200){
                setAuth({
                    user:localStorage.getItem('user_info'),
                    access:localStorage.getItem('access'),
                    refresh:localStorage.getItem('refresh'),
                    isAuthenticated:true
                });  
                localStorage.setItem('status',true);
            }else{
                setAuth({
                    user:JSON.parse(localStorage.getItem('user_info')),
                    access:localStorage.getItem('access'),
                    refresh:localStorage.getItem('refresh'),
                    isAuthenticated:false
                });  
            }
            console.log('inside authenticated :',JSON.stringify(auth));
            navigate('/');
        }
    }
    let loadUser=async()=>{
        console.log('loading user');
        if(!localStorage.getItem('user_info')){
            let accToken=localStorage.getItem('access').replace(/"/g,'');
            let refToken=localStorage.getItem('refresh').replace(/"/g,'');
            let response=await fetch('http://localhost:8000/auth/users/me/',
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization':'JWT '+accToken
                }
            })
            let data=await response.json();
            if(response.status==200){
                localStorage.setItem('user_info',JSON.stringify(data));
                setAuth({...auth,'user':data,'access':accToken,'refresh':refToken})
            }
            isAuthenticated();
            //console.log('inside load :',JSON.stringify(auth));
        }
    }
    let loginUser=async (event)=>{
        try{localStorage.getItem('user_info')}catch(err){console.log("cant find");}
        
        event.preventDefault();
        if(!localStorage.getItem('access')){
            console.log('user login')
            try{
                let response =await fetch('http://localhost:8000/auth/jwt/create',
                    {
                        method:'POST',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({'email':event.target.email.value,'password':event.target.password.value})
                    }
                )
                let data=await response.json();
                if(response.status==200){
                    //setAuth({...auth,'access':data.access,'refresh':data.refresh})
                    localStorage.setItem('access',JSON.stringify(data.access));
                    localStorage.setItem('refresh',JSON.stringify(data.refresh));
                    //console.log('user_info',auth);
                    loadUser();
                }else{
                    alert("login failed");
                }
            }
            catch(err){
                console.log(err);
            }
        }else{
            try{
                loadUser();
            }catch(err){console.log(err)}
            
        }
    }
    let logoutUser=()=>{ 
        setAuth({
            user:null,
            access:null,
            refresh:null,
            isAuthenticated:null
        });  
        localStorage.removeItem('access'); 
        localStorage.removeItem('refresh');
        localStorage.removeItem('user_info'); 
        localStorage.removeItem('status');  
        navigate('/login');
    }
    let signupUser=async (event)=>{
        event.preventDefault();
        try{
                let response = await fetch('http://localhost:8000/auth/users/',
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        'first_name':event.target.first_name.value,
                        'last_name':event.target.last_name.value,
                        'email':event.target.email.value,
                        'password':event.target.password.value,
                        're_password':event.target.re_password.value,
                    })
                }
            )
            let data=await response.json();
            if(response.status==201){
                alert("SIGN UP SUCCESS");
                navigate('/login');
                
            }else{
                console.log('SIGNUP_FAILED');
            }
        }catch(err){console.log(err)}
        
    }
    let verifyUser=async(uid,token)=>{
        console.log('verifying user');
        let response=await fetch('http://localhost:8000/auth/users/activation/',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                "uid":uid,
                "token":token
            })
        }
        )
        if(response.status!=401){
            console.log('ACTIVATION_SUCCESS')
            navigate('/login');}
        else{console.log('ACTIVATION_FAILED')}
    }

    
    let makePost=async (event)=>{
        event.preventDefault();
        console.log('making post');
        let poster=event.target.poster.value;
        let file=event.target.file.files[0];
        let caption=event.target.caption.value;
        let formdata = new FormData();
        formdata.append("poster",poster);
        formdata.append("file",file);
        formdata.append("caption",caption);
        console.log(formdata.values);
        let response =await fetch('http://localhost:8000/userpost',
            {
                method:'POST',
                //headers:{'Content-Type':'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'},
                body:formdata
            }
        )
        let data=await response.json();
        console.log(data);
        navigate('/');
    }

    const [commentCount, setCommentCount] = useState(0);

    let googleLogin = async () => {
        console.log("google login")
        try {
          console.log("google login");
          const response = await fetch(`http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          console.log(data);
          window.location.replace(response.data.authorization_url);
        } catch (err) {
          console.log("error");
        }
      };
    //----------------------------------------------------------
    useEffect(()=>{
        //console.log('inside use effect :',auth);
    },[auth])
    //---------------------------------------------------------
    let contextData={
        loginUser:loginUser,
        logoutUser:logoutUser,
        signupUser:signupUser,
        verifyUser:verifyUser,
        User:auth,
        makePost:makePost,
        searchResult:searchResult,
        setSearch:setSearch,
        commentCount:commentCount,
        setCommentCount:setCommentCount,
        googleLogin:googleLogin
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
