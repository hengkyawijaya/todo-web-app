import { combineReducers } from 'redux';
import postReducer from './postReducer';
import statusReducer from './statusReducer';
import authReducer from './authReducer';

export default combineReducers({
    posts: postReducer,
    status: statusReducer,
    auth: authReducer
})