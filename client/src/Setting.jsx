import React, {useEffect, useState} from 'react';
import Sidebar from './SideBar';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUser, updateUser } from './actions/user';
const Setting = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/"
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user?.result?._id,
      username, email, password
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
  data.append("file", file);
  updatedUser.profilePic = filename;
  try {
    await axios.post("http://localhost:5000/api/upload", data);
  } catch (err) {console.log(err)}
    }
    dispatch(updateUser(user?.result?._id, updatedUser));
    setSuccess(true)
  }

    useEffect(() => {
        document.title = "Setting - Swan's Blog"
      }, [])
    return (
        <div className="content">
            <div className="settingsWrapper">
              <div className="settingsTitle">
                <span className="settingsTitleUpdate">Update Your Account</span>
                <span className="settingsTitleDelete" onClick={() => dispatch(deleteUser(user?.result?._id))}>Delete Account</span>
              </div>
              <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                  <img
                    src={file ? URL.createObjectURL(file) : PF +user?.result?.profilePic}
                    alt=""
                  />
                  <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa fa-user-circle"></i>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{display: "none"}}
                    className="settingsPPInput"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <label>Username</label>
                <input type="text" placeholder={user?.result?.username} onChange={e => setUsername(e.target.value)} name="username" />
                <label>Email</label>
                <input type="email" placeholder={user?.result?.email} onChange={e => setEmail(e.target.value)}  name="email" />
                <label>Password</label>
                <input type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} />
                <button className="settingsSubmitButton" type="submit">
                  Update
                </button>
              </form>
              {success && <span style={{color: "green", fontSize:"2rem"}}>Profile has been updated</span>}
            </div>
            
        
        <Sidebar />
    </div>
    );
}

export default Setting;
