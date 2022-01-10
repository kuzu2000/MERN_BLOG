import './App.css';
import NavBar from './NavBar'
import Content from './Content'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Single from './Single';
import Register from './Register';
import Setting from './Setting';
import Edit from './Edit';
function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
    <Route exact path="/" element={<Navigate to="/posts" />} />
    <Route path="/posts" exact element={<Content/>} />
    <Route path="/posts/search" exact element={<Content/>} />
    <Route path="/post/:postId" element={<Single/>}/>
    <Route path="/register" element={<Register />} />
    <Route path="/setting" element={user?.result ? <Setting /> : <Content/>} />
    <Route path="/edit" element={user?.result ? <Edit /> : <Navigate to="/posts" />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
