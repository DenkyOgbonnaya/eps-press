import axios from 'axios';
import jwt from 'jsonwebtoken';
import actionTypes from './actionTypes';
import Axios from 'axios';

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.authToken}`}
axios.defaults.validateStatus = status => status < 500;
/*const config = {headers: {
    'Authorization': `Bearer ${localStorage.authToken}`
}}*/
export async function signup(userData, dispatch){
    try{
        const {data} = await axios.post('/api/users/signup', userData);
        if(data.status === 'success'){
            localStorage.authToken = data.token;
            const{currentUser} = jwt.decode(data.token);

            dispatch({
                type:actionTypes.SIGNUP_USER,
                currentUser
            } );
            return data;
        }else
        dispatch({type: actionTypes.ERROR, message: data.message});
        
    }catch(err){
        console.log(err);
    }

}
export async function login(userData, dispatch){
    try{
        const{data} = await axios.post('/api/users/login', userData);
        if(data.status === 'success'){
            localStorage.authToken = data.token;
            const{currentUser} = jwt.decode(data.token);

            dispatch({
                type:actionTypes.LOGIN_USER,
                currentUser
            } );
            return data;
        }else{
            dispatch({type: actionTypes.ERROR, message: data.message});
        }
        
        
    }catch(err){
        console.log(err);
    }
}
export async function verifyToken(token, dispatch){
    const {data} = await axios.get(`/api/users/verify/${token}`)
    if(data.isAuthenticated){
        const{currentUser} = jwt.decode(token);

        dispatch({
            type:actionTypes.LOGIN_USER,
            currentUser
        } );
    }
}
export async function changeAvatar(id, avatar, dispatch){
    try{
        const{data} = await axios.put(`/api/users/${id}/avatar`, avatar)
        if(data.status ==='success'){
            dispatch({
                type: actionTypes.CHANGE_AVATAR,
                avatar: data.avatar
            })
            return data
        }else{
            dispatch({
                type: actionTypes.ERROR,
                message: data.message
            })
            return data;
        }
        
    }catch(err){
        console.log(err);
    }
}