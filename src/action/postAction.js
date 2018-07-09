import { FETCH_POSTS, FETCH_POST, ERROR, SUCCESS } from './type';
import { BASE_API_URL } from '../config';
import axios from 'axios';
import getToken from './getToken';

export default { 
    createPost: (post, callback ) => async dispatch => {
        try {

            const response = await axios.post(`${BASE_API_URL}/posts/create`, {
                post
            }, {
                headers: {
                    Authorization : `Bearer ${getToken()}`
                }
            });
            
            dispatch({
                type: SUCCESS,
                payload: response.data
            })

            callback()

        } catch(err){
            dispatch({
                type: ERROR,
                payload: err
            })
        }
    },
    fetchPosts: ({ search=false,searchBy=false, page=false, limit=false, orderBy=false, order=false }) => async dispatch => {
        try {
        
        const response = await axios.get(`${BASE_API_URL}/posts?${search ? `search=${search}&` : '' }${searchBy ? `searchBy=${searchBy}&`: '' }${page ? `page=${page}&` : ''}${limit ? `limit=${limit}&`: ''}${orderBy ? `orderBy=${orderBy}&`: ''}${order ? `order=${order}`: ''}`, {
            headers: {
                Authorization : `Bearer ${getToken()}`
            }
        });

        dispatch({
            type: FETCH_POSTS,
            payload: response.data
        })
        
        } catch(err) {
            dispatch({
                type: ERROR,
                payload: err
            })
            
        }
    },
    fetchPost: ({ id }) => async dispatch => {
        try {

            const response = await axios.get(`${BASE_API_URL}/posts/${id}`, {
                headers: {
                    Authorization : `Bearer ${getToken()}`
                }
            });
        
            dispatch({
                type: FETCH_POST,
                payload: response.data
            })

        } catch(err){
            dispatch({
                type: ERROR,
                payload: err
            })
        }
    },
    updatePost: ({id, post}, callback) => async dispatch => {
        try {

            const response = await axios.put(`${BASE_API_URL}/posts/${id}/update`, {
                post
            }, {
                headers: {
                    Authorization : `Bearer ${getToken()}`
                }
            });
            
            dispatch({
                type: SUCCESS,
                payload: response.data
            })

            callback()

        } catch(err){
            dispatch({
                type: ERROR,
                payload: err
            })
        }
    },
    deletePost: ({ id }, callback) => async dispatch => {
        try {
            
        const response = await axios.delete(`${BASE_API_URL}/posts/${id}/delete`, {
                headers: {
                    Authorization : `Bearer ${getToken()}`
                }
        });

        callback()

        dispatch({
            type: SUCCESS,
            payload: response.data
        })
        
        } catch(err) {
            dispatch({
                type: ERROR,
                payload: err
            })
            
        }
    }
}