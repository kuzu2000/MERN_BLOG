import React, {useEffect, useState} from 'react';
import { createPost } from './actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import axios from 'axios'
const Edit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        document.title = "Edit - To create contents"
      }, [])
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          username: user?.result?.username,
          title,
          desc,
        };
        if (file) {
          const data =new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {console.log(err)}
        }
        dispatch(createPost(newPost))
        navigate('/')
      }

    return (
        <div className="write">
          {file && 
          <img
          className="writeImg" src={URL.createObjectURL(file)}
          alt=""
        />
          }
        
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
            <label htmlFor="fileInput">
                <i className="fa fa-image writeIcon"></i>
            </label>
          <input type="file" name="" id="fileInput" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" className="writeInput" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
        </div>
        <div className="writeFormGroup">
            <textarea className="writeInput writeText" placeholder="Tell your story..."  onChange={e=>setDesc(e.target.value)}
            ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    );
}

export default Edit;
