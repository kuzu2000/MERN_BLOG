import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/api'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');
export const searchPost = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery || 'none'}`);
export const likePost = (id) => API.patch(`/posts/${id}/like`);
export const likeSingle =(id) => API.patch(`/posts/${id}/like`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const getPost = (id) => API.get('/posts/' + id);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const viewPost = (id) => API.patch(`/posts/${id}/view`);

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

export const updateUser = (id, formData) => API.put(`/auth/${id}`, formData);
export const deleteUser = (id) => API.delete(`/auth/${id}`);
