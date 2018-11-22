import axios from 'axios';
import {LOGIN_USER, SIGNUP_USER} from './actionTypes';
import {BACKEND_HOST} from './host_config';

//function/ action to post the login form
export const login = (values, callback) => dispatch =>  {    
    axios.post(BACKEND_HOST + '/login', values)
        .then((res) => {
            if(res.status === 200){  
                localStorage.setItem('jwt_token', res.data.token);
                dispatch({
                    type : LOGIN_USER,
                    payload: res.data
                });
                callback(res.data);
            }
            else{
                console.log("Some error")
                callback({status: "ERROR", message: "Could not log in"});
            }            
        });        
}

//function/ action to post the user sign up form
export const signup = (values, callback) => dispatch => {        
    axios.post(BACKEND_HOST+ '/userSignup', values)
        .then((res) => {
            if(res.status === 200){  
                dispatch({
                    type : SIGNUP_USER,
                    payload: res.data
                });
                callback(res.data);
            }
        });
} 
