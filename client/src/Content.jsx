import React, {useEffect, useRef} from 'react';
import Header from './Header';
import Sidebar from './SideBar';
import {Link, useLocation} from 'react-router-dom'
import { CircularProgress } from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux'
import Post from './Post';
import {getPosts} from './../src/actions/posts'
// import Pagination from '/Pagination'
const Content = () => {
  
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
    
  // const page = 1;
    
    useEffect(() => {
      document.title = "Swan's Blog - Programming, Web Development and Testing"
    }, [])
    return (
        <>
        <Header />
        <div className="content" key="item4">
        <div className="contentPosts" key="item3">
          {!posts.length ? (<CircularProgress key="item1" />) : (
            <div className="posts" key="item2">
          {posts.map((post) => (
            <Post post={post} />
          ))}
          {/* <Pagination data={posts} title="Posts" page={page}
            pageLimit={5}
            dataLimit={3} /> */}
           </div>
          )}
        </div>
        <Sidebar />
    </div>
    </>
    );
}

export default Content;
