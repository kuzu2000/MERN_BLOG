import { FETCH_ALL, LIKE, CREATE, GET_POST, DELETE, UPDATE, VIEW, FETCH_BY_SEARCH } from "../constants/actionTypes";
import * as api from './../api/index';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
    } catch (err)
    {
         console.log(err)
    }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const {data} = await api.getPost(id);
    dispatch({type: GET_POST, payload: data})
  } catch (err) {
    console.log(err)
  }
}

export const searchPost = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.searchPost(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      const { data } = await api.likePost(id, user?.token);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const likeSingle = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      const { data } = await api.likeSingle(id, user?.token);
  
      dispatch({ type: "LIKE_SINGLE", payload: data });
    } catch (error) {
      console.log(error);
    }
  };


export const viewPost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    const {data} = await api.viewPost(id, user?.token);
    dispatch({type: VIEW, payload: data})
  } catch (err) {
    console.log(err);
  }
}

  export const updatePost = (id, post) => async (dispatch) => {
    try {
      const {data} = await api.updatePost(id, post)
      dispatch({type: UPDATE, payload: data})
      // navigate('/posts/' + id)
    } catch (error) {
      console.log(error);
    }
  }

  export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: DELETE, payload: id });
      // navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
