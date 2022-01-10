import { combineReducers } from 'redux';

import auth from './auth';
import posts from './posts'
import users from './user'

export const reducers = combineReducers({ auth, posts, users });