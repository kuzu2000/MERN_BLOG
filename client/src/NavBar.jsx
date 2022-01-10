import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from './../../client/src/constants/actionTypes'
import decode from 'jwt-decode';
import {searchPost} from './actions/posts'
const Navbar = () => {
    const dispatch = useDispatch();
    const searchRef = useRef(null);
    const PF = "http://localhost:5000/images/"
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [searchForm, setSearchForm] = useState(false)
    const [search, setSearch] = useState('');
    const logout = React.useCallback(() => {
        dispatch({ type: actionType.LOGOUT });
    
        navigate('/register');
    
        setUser(null);
      }, [dispatch, navigate]);

      useEffect(() => {
        const token = user?.token;

        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

      const searchPostt = () => {
        if(search.trim()) {
            dispatch(searchPost(search))
            navigate(`/posts/search?searchQuery=${search}`)
            searchForm(false)
        } else {
            navigate('/')
        }
      }

      const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPostt();
            searchForm(false)
        }
      }

      const searchToggle = () => {
          setSearchForm(!searchForm)
      }

    return (
        <nav>
        <div className="navbar">
            <div className="navbar-title" title="Swan's Blog"><Link to="/" className="link">Swan's Blog</Link></div>
            <div className="navbar-items">
                <ul className="navbar-lists">
                    <li title="Home"><Link to="/" className="link">Home</Link></li>
                    <li title="About">About</li>
                    <li title="Contact">Contact</li>
                    <li title="Edit"><Link to="/edit" className="link">Edit</Link></li>
                    {user?.result && <li title="logout" onClick={logout}>Logout</li>}
                </ul>
            </div>
            <div className="navbar-user">
                {user?.result ? 
                (
                    <Link to="/setting" className="link">
                        {/* <div className="navbar-profilePic" title={user?.result?.username}>
                        {user?.result?.username.charAt(0)}
                        </div> */}
                <img alt="" className="navbar-profilePic" title={user?.result?.username} src={PF+user?.result?.profilePic}/>
                </Link>
                    )
                 : (
                 <>
                 <div className="navbar-login"><Link to="/register" className="link" title="Login">Login</Link></div>
                </>
                )}
                <div><i className="navbarIcon fa fa-search" title="Search" onClick={searchToggle}></i></div>
            </div>
            {searchForm && <div className="searchForm">
                <input type="search" name="search" autoFocus  value={search} onChange={e => setSearch(e.target.value)} placeholder='Search here...' onKeyDown={handleKeyPress} className="searchInput" id="" />
            </div>}
        </div>
    </nav>

    );
}

export default Navbar;
