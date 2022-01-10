import React, {useEffect, useState} from 'react';
import Sidebar from './SideBar';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getPost, deletePost, updatePost, likePost, likeSingle } from './actions/posts';
import { CircularProgress } from '@material-ui/core';
const Single = () => {
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [updateMode, setUpdateMode] = useState(false)
  const path = location.pathname.split('/')[2];
  const post = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'))
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
    useEffect(() => {
        document.title = "Lorem ipsum dolor"
        dispatch(getPost(path))
      }, [path, dispatch])
      
      const handleUpdate = () => {
        const form = {username: user?.result?.username, title, desc}
        dispatch(updatePost(post._id, form));
        window.location.reload();
        setUpdateMode(false)
      }

      const handleDelete = () => {
       dispatch(deletePost(post._id))
        // window.location.reload();
        const URL = 'http://localhost:3000/posts'
        window.location.href = URL;
        window.location.assign(URL);
      }
      
      const Like = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?._id))
            ? (
                <div className="like" style={{color: "red"}}>
                <i className="fa fa-heart heart"  onClick={() => dispatch(likeSingle(path))}></i>
                <span className="likeCount">
                &nbsp; {post.likes.length}
                    </span>
              </div>
            ) : (
                <div className="like">
                <i className="fa fa-heart-o heart"  onClick={() => dispatch(likeSingle(path))}></i>
                <span className="likeCount">&nbsp; {post.likes.length}</span>
              </div>
            )
        }
        return <><div className="like">
        <i className="fa fa-heart-o heart"  onClick={() => dispatch(likeSingle(path))}></i>
        <span className="likeCount">&nbsp; {post.likes.length}</span>
      </div></>
    }

    return (
        <div className="content">
          
        <div className="single">
        {!post.username ? (<CircularProgress style={{alignItems: "center", justifyContent: "center", height: "20vh", width: "20vw"}}/>) :
         (<div className="singlePostWrapper">
                  <img
                      className="singlePostImg" src={PF + post.photo}
                      alt=""
                    />
                    {updateMode ? (
                      <>
                      <input type="text" value={title} autoFocus
            onChange={(e) => setTitle(e.target.value)} />
                      <textarea type="text" value={desc} autoFocus
            onChange={(e) => setDesc(e.target.value)} />
                      <button onClick={handleUpdate}>Update</button>
                      </>
                    ) : (<>
                    <h1 className="singlePostTitle">
                     {post.title}
                     <div className="postLike">
                      <Like />
                    </div>
                     {user?.result?.username === post.username && 
                     <div className="singlePostEdit">
                     <i title="Edit" className="singlePostIcon fa fa-edit" onClick={() => setUpdateMode(true)}></i>
                     <i title="Delete" className="singlePostIcon fa fa-trash" onClick={handleDelete}></i>
                   </div>
                   }
                      
                    </h1>
                    <div className="singlePostInfo">
                      <span>
                        Author:
                        <b className="singlePostAuthor">
                          <Link className="link" to="/posts?username=Safak">
                            {post.username}
                          </Link>
                        </b>
                      </span>
                      <span>{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    <p className="singlePostDesc">
                     {post.desc}
                    </p>
                    </>
                    )}
                  <p>{post.categories}</p>
                </div>)
                }
                
              </div>
        
       <Sidebar />
    </div>
    );
}

export default Single;
