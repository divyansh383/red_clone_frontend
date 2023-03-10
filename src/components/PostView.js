import React, { useState, useEffect,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import CommentTree from './CommentTree';
//---------------------------------------------------
export default function PostView(props) {
  const { id } = useParams();
  const [post, setPost] = useState({});
  let {User}=useContext(AuthContext);
  let userdata=JSON.parse(User.user);
  let {commentCount,setCommentCount}=useContext(AuthContext);
  const navigate=useNavigate();
  useEffect(() => {
    if (Object.keys(props).length === 0) {
      let getPost = async () => {
        let response = await fetch(`http://localhost:8000/getpostid/${id}`);
        let data = await response.json();
        setPost(data);
      }
      getPost();
    } 
  }, [id, props,commentCount]);
  
  
  const [comment,setComment]=useState('');
  let addComment=async(event)=>{
    event.preventDefault();
    if(userdata==null){
      navigate('/login');
      return;
    }
    let response=await fetch('http://localhost:8000/addComment',
      {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          'text':comment,
          'uid':userdata.id,
          'pid':id,
          'parent':null
        })
      }
    )
    let data=await response.json();
    console.log(data);
    setCommentCount(commentCount+1);
    console.log(commentCount)
    setComment('');
  }
  //-----------------------------------------
  const imgStyles = {
    borderRadius: '10px',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'flex',
    backgroundColor:'gray',
    alignItems: 'center',
    justifyContent: 'center'
  };
  let card={
    backgroundColor:"white",
    padding:"10px",
    margin:"20px",
    display:"flex",
    flexDirection:"row",
    boxShadow: "0px 10px 10px #C5C6D0",
  }
  let basics={
    backgroundColor:'#dae0e6',
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
  let homePage={
    display:"grid",
    gridTemplateColumns: "2fr 1fr",
    margin:"100px 15vw",
    backgroundColor:'#dae0e6'
  }
 let box={
    margin:"10px",
    padding:"10px"
  }
  //--------------------------------------------
  //-----------------------------------------
  return (
    <div style={homePage}>
      {/* image---------------------- */}
      <div className="media d-flex flex-column" style={box}>
        {/* image  */}
        <div style={imgStyles}>
          {post.file && typeof post.file === 'string' && (post.file.includes('.mp4') || post.file.includes('.ogg') || post.file.includes('.webm')) ? (
            <video className="img-fluid" controls style={{ width: '100%', height: '100%' }}>
              <source src={post.file} type="video/mp4" />
              <source src={post.file} type="video/ogg" />
              <source src={post.file} type="video/webm" />
            </video>
          ) : (
            <img className="img-fluid" src={post.file} />
          )}
        </div>
        {/* body */}
        <div className="media-body">
          <h5 className="mt-0">{(Object.keys(props).length === 0) ? (post.caption) : (props.imgdetails.caption)}</h5>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
          <p className="mb-0">Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        </div>
        {/* comment box */}
        <div>
          <form className="form-group" onSubmit={addComment}>
              <textarea className="form-control" name="cmText" value={comment} onChange={(event)=>{setComment(event.target.value)}} rows="3" placeholder='add a comments'></textarea>
              <button className="btn btn-primary mb-4" onSubmit={addComment}>Post</button>
          </form>
        </div>
        {/* comments display */}
        <div>
          {<CommentTree pid={id} />}
        </div>
      </div>

      {/* about user -----------------------*/}
      <div className='Lbar'>
          <div>
            <div style={card}>
              <h1>Try premium</h1>
            </div>
            <div style={card}>
              <h1>create community</h1>
            </div>
            <div style={card}>
              <h1>terms and conditions</h1>
            </div>
          </div>  
        </div>
    </div>
  )
}
