import { DELETE_USER, UPDATE_USER } from "../constants/actionTypes";

const userReducer = (users = {}, action) => {
    switch(action.type) {
        case UPDATE_USER:
            return {users: action.payload};
        case DELETE_USER:
            return action.payload;;
        default:
            return users;
    }
}

export default userReducer;