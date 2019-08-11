import axios from 'axios';
import jwt from 'jsonwebtoken';
import actionTypes from './actionTypes';

//the line below some times returns null token value or expired cached token
//axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.authToken}`
axios.defaults.validateStatus = status => status < 500;

export async function signup(userData, dispatch){
    try{
        const {data} = await axios.post('/api/users/signup', userData);
        if(data && data.status === 'success'){
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
        if(data && data.status === 'success'){
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
    if(data && data.isAuthenticated){
        const{currentUser} = jwt.decode(token);

        dispatch({
            type:actionTypes.LOGIN_USER,
            currentUser
        } );
    }
}
export async function changeAvatar(id, avatar, dispatch, isCurrentUser){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    try{
        const{data} = await axios.put(`/api/users/${id}/avatar`, avatar, confiq)
        if(data && data.status ==='success'){
            localStorage.authToken = data.token;
            
            dispatch({
                type: actionTypes.CHANGE_AVATAR,
                payload: {
                    avatar: data.avatar,
                    isCurrentUser
                }
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
export const logout = (dispatch) => {
    localStorage.removeItem('authToken');
    dispatch({
        type: actionTypes.LOGOUT_CURRENT_USER
    })
}
export async function getUserProfile(username){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    try{
        const{data} = await axios.get(`/api/users/${username}/profile`, confiq);
        return data;
    }catch(err){
        console.log(err);
    }
}