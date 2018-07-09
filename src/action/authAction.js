import { CHECK_AUTH, LOGIN_AUTH, SIGNUP_USER, ERROR, SUCCESS } from './type';
import { BASE_API_URL } from '../config';
import axios from 'axios';
import getToken from './getToken';

export default { 
    checkAuth: ( ) => async dispatch => {
        try {

            const response = await axios.get(`${BASE_API_URL}/auth/check`, {
                headers: {
                    Authorization : `Bearer ${getToken()}`
                }
            });
            
            dispatch({
                type: CHECK_AUTH,
                payload: response.data
            })

           

        } catch(err){
            dispatch({
                type: ERROR,
                payload: err
            })
        }
    },
    loginUser: (user, callback) => async dispatch => {
      try {

        const response = await axios.post(`${BASE_API_URL}/auth/login`, {
          user
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
    signupUser: (user, callback) => async dispatch => {
      try {

        const response = await axios.post(`${BASE_API_URL}/users/create`, {
          user
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
    }
  }