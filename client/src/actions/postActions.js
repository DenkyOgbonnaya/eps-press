import axios from 'axios';
import actionTypes from './actionTypes';

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.authToken}`}
axios.defaults.validateStatus = status => status < 500;

export async function addPost(post, dispatch){
    try{
        const{data} = await axios.post('/api/post', post);
        if(data.status === 'success'){
            dispatch({
                type: actionTypes.ADD_POST,
                post: data.post
            });
        }else {
            dispatch({
                type: actionTypes.ERROR,
                message: data.message
            });
    }
        return data;
    }catch(err){
        console.log(err);
    }
}
export async function editPost( id, credentials, dispatch){
    try{
        const{data} = await axios.put(`/api/post/${id}`, credentials);
        if(data.status === 'success'){
            dispatch({
                type: actionTypes.EDIT_POST,
                post: data.post
            });
        }else {
            dispatch({
                type: actionTypes.ERROR,
                message: data.message
            });
        }
        return data;
    }catch(err){
        console.log(err);
    }
}
export async function getPosts(dispatch){
    try{
        const{data} = await axios.get('/api/post');
        if(data.status === 'success'){
            dispatch({
                type: actionTypes.GET_POSTS,
                data
            });
            return data;
        }else {
            dispatch({
                type: actionTypes.ERROR,
                message: data.message
            });
        }
    }catch(err){
        console.log(err);
    }
}
export async function getPost(slug, dispatch){
    try{
        const{data} = await axios.get(`/api/post/${slug}`);
        if(data.status === 'success'){
            dispatch({
                type: actionTypes.GET_POST,
                post: data.post
            });
            return data;
        }
    }catch(err){
        console.log(err);
    }
}