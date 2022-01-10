import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, signin } from './actions/auth'
const initialState = { username: '', email: '', password: '' };
const Register = () => {
  const [form, setForm] = useState(initialState);
  const [isSignIn, setIsSignIn] = useState(true)
const [showPassword, setShowPassword] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();

  useEffect(() => {
    if (isSignIn) {
      document.title = "Login - Swan's Blog"
    }
    else {
      document.title = "Register - Swan's Blog"
    }
  }, [isSignIn, dispatch])

  const switchMode = () => {
    setForm(initialState);
    setShowPassword(false);
    setIsSignIn(!isSignIn);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      if (isSignIn) {
        dispatch(signin(form, navigate));
      } else {
        dispatch(signup(form, navigate));
      } 
  };

   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="register">
        <div className="registerContent">
          <span className="registerTitle">{isSignIn ? "Login" : "Register"}</span>
          <form className="registerForm" onSubmit={handleSubmit}>
            {!isSignIn && 
            <div className="registerUser">
            <label htmlFor="username">Username</label>
              <input className="registerInput" name="username" id="username" onChange={handleChange}  type="text" placeholder="Enter your username..." autoFocus={true} />
              </div>
            }
              <div className="registerUser">
            <label htmlFor="email">Email</label>
              <input className="registerInput" name="email" id="email" onChange={handleChange}  type="text" placeholder="Enter your email..." />
            </div>
            <div className="registerPassword">
              <label htmlFor="password">Password</label>
              <input className="registerInput" name="password" id="password" onChange={handleChange}  type={showPassword ? "text" : "password"} placeholder="Enter your password..." />
              <i onClick={() => setShowPassword(!showPassword)} className={showPassword ? "fa fa-eye": "fa fa-eye-slash"} id="togglePassword" style={{marginLeft: "-30px", cursor: "pointer"}}></i>
            </div>
              <button className="registerButton">{isSignIn ? "Login" : "Register"}</button>
          </form>
          <button className="registerLoginButton" onClick={switchMode}>{isSignIn ? "Register" : "Login"}</button>
        </div>
      </div>
    );
}

export default Register;
