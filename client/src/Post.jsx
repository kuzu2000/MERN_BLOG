import React from 'react';
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {likePost, viewPost} from './../src/actions/posts'
const Post = ({post}) => {
  const PF = "http://localhost:5000/images/" + post.photo;
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const Like = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?._id))
            ? (
                <div className="like" style={{color: "red"}}>
                <i className="fa fa-heart heart"  onClick={() => dispatch(likePost(post._id))}></i>
                <span className="likeCount">
                &nbsp; {post.likes.length}
                    </span>
              </div>
            ) : (
                <div className="like">
                <i className="fa fa-heart-o heart"  onClick={() => dispatch(likePost(post._id))}></i>
                <span className="likeCount">&nbsp; {post.likes.length}</span>
              </div>
            )
        }
        return <><div className="like">
        <i className="fa fa-heart-o heart"  onClick={() => dispatch(likePost(post._id))}></i>
        <span className="likeCount">&nbsp; {post.likes.length}</span>
      </div></>
    }
    return (
        <div className="post" key={post.createdAt}>
          {PF ? (<img alt={post.title} src={PF} className="postImg" />) : (
            <img alt={post.title} src='https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' className="postImg" />
          )}
            
            <div className="postInfo">
                <span className="postTitle" onClick={() => dispatch(viewPost(post._id))}>
                    <Link to={`/post/${post._id}`} className="link">{post.title}</Link> 
                </span>
                <div className="postDateInfo">
                    <div className="author">By:<span className="postAuthor">{post.username}</span></div>
                    <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
              </div>
                <p className="postDesc">
                {post.desc}
              </p>
              <div className="postCats">
                {post.categories.map((category) => (
                  <span className="postCat" key={category}>
                    {category}
                </span>
                ))}
              </div>
              <div className="postInterest">
              <div className="postLike" title={post.likes.length > 1 ? post.likes.length + " likes" : post.views.length + " like"}>
                 <Like />
              </div>
              <div className="postView" title={post.views.length > 1 ? post.views.length + " views" : post.views.length + " view"}>
                <i className="fa fa-eye"></i>
                <div className="postViewCount">{post.views.length}</div>
              </div>
              </div>
            </div>
          )
}

export default Post;
