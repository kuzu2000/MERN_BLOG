import { FETCH_ALL, LIKE, CREATE, GET_POST, UPDATE, DELETE, VIEW, FETCH_BY_SEARCH } from "../constants/actionTypes";

export default function postReducers(posts = [], action) {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case "LIKE_SINGLE":
            return action.payload;
        case CREATE:
             return [...posts, action.payload];
        case GET_POST:
            return action.payload;
        case UPDATE:
            return action.payload;
        case VIEW:
            return posts.map((post) => (post._id === action.payload._id ? action.payload: post));
        case FETCH_BY_SEARCH:
                return action.payload;
        case DELETE:
             return action.payload;
      default:
            return posts;
    }
};


