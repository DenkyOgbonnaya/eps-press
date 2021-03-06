import axios from 'axios';
import actionTypes from './actionTypes';

const authToken = localStorage.getItem('authToken');
axios.defaults.headers.common = {'Authorization': `Bearer ${authToken}`}
axios.defaults.validateStatus = status => status < 500;

export async function addPost(post, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    try{
        const{data} = await axios.post('/api/post', post, confiq);
        if(data && data.status === 'success'){
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
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    try{
        const{data} = await axios.put(`/api/post/${id}`, credentials, confiq);
        if(data && data.status === 'success'){
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
export async function getPosts(dispatch, page, limit){
    try{
        const{data} = await axios.get(`/api/post?page=${page}&limit=${limit}`);
        if(data && data.status === 'success'){
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
        if(data && data.status === 'success'){
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
export async function deletePost(id, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    dispatch({
        type: actionTypes.DELETE_POST,
        id
    });
    try{
        const{data} = await axios.delete(`/api/post/${id}`, confiq);
        if(data && data.status === 'success'){
            dispatch({
                type: actionTypes.DELETE_POST,
                id
            });
        }
    }catch(err){
        console.log(err);
    }
}
export async function likePost(post, liker, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    try{
        dispatch({
            type: actionTypes.LIKE_POST,
            payLoad: {likers: post.likers, inc: 1}
        });
        const{data} = await axios.post(`/api/post/${post._id}/likes`, {liker}, confiq);
        if(data && data.status === 'success'){
            dispatch({
                type: actionTypes.LIKE_POST,
                payLoad: {likers: data.likers, inc: 0}
            });
        }else
            dispatch({
                type: actionTypes.LIKE_POST,
                payLoad: {likers: post.likers, inc: -1}
        });
    }catch(err){
        console.log(err);
    }
}
export async function unlikePost(post, unLiker, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`},
        data: {unLiker}
    }
    try{
        dispatch({
            type: actionTypes.UNLIKE_POST,
            payLoad: {likers: post.likers, dec: 1}
        });
        const{data} = await axios.delete(`/api/post/${post._id}/likes`, confiq)

        if(data && data.status === 'success'){
            dispatch({
                type: actionTypes.UNLIKE_POST,
                payLoad: {likers: data.likers, dec: 0}
            });
        }else
            dispatch({
                type: actionTypes.UNLIKE_POST,
                payLoad: {likers: post.likers, dec: -1}
            });
    }catch(err){
        console.log(err);
    }
}
export async function postComment(commentData, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    try{
        const {data} = await axios.post('/api/comment', commentData, confiq);
        if(data && data.status === 'success')
        dispatch({
            type: actionTypes.COMMENT_POST,
            comment: data.comment
        })
        return data;
    }catch(err){
        console.log(err);
        
    }
}
export async function likeComment(comment, liker, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    try{
        dispatch({
            type: actionTypes.LIKE_COMMENT,
            payLoad: {likers: comment.likers, inc: 1, comment}
        });
        const{data} = await axios.post(`/api/comment/${comment._id}/likes`, {liker}, confiq);
        
        if(data && data.status === 'success'){
            dispatch({
                type: actionTypes.LIKE_COMMENT,
                payLoad: {likers: data.likers, inc: 0, comment}
            });
        }else
            dispatch({
                type: actionTypes.LIKE_COMMENT,
                payLoad: {likers: comment.likers, inc: -1, comment}
            });
    }catch(err){
        console.log(err);
    }
}
export async function unlikeComment(comment, unliker, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`},
        data:{unliker}
    }
    try{
        dispatch({
            type: actionTypes.UNLIKE_COMMENT,
            payLoad: {likers: comment.likers, dec: 1, comment}
        });
        const{data} = await axios.delete(`/api/comment/${comment._id}/likes`, confiq);
        
        if(data && data.status === 'success'){
            dispatch({
                type: actionTypes.UNLIKE_COMMENT,
                payLoad: {likers: data.likers, dec: 0, comment}
            });
        }else
            dispatch({
                type: actionTypes.UNLIKE_COMMENT,
                payLoad: {likers: comment.likers, dec: -1, comment}
            });
    }catch(err){
        console.log(err);
    }
}
export async function postReply(replyData, comment, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    try{
        const {data} = await axios.post(`/api/comment/${comment._id}`, replyData, confiq);
        if(data && data.status === 'success')
        dispatch({
            type: actionTypes.REPLY_COMMENT,
            payLoad: {replies: data.replies, comment}
        })
    }catch(err){
        console.log(err);
        
    }
}
export async function editComment(credentials, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    dispatch({
        type: actionTypes.EDIT_COMMENT,
        credentials
    })
    try{
        const {data} = await axios.put(`/api/comment/${credentials._id}`, credentials, confiq);
        
        if(data && data.status === 'success')
        dispatch({
            type: actionTypes.EDIT_COMMENT,
            credentials: data.comment
        })
    }catch(err){
        console.log(err)
    }
}
export async function deleteComment(id, dispatch){
    const confiq = {
        headers: {'Authorization': `Bearer ${localStorage.authToken}`}
    }
    dispatch({
        type: actionTypes.DELETE_COMMENT,
        id
    })
    try{
        const {data} = await axios.delete(`/api/comment/${id}`, confiq);
        if(data && data.status === 'success'){
            dispatch({
                type: actionTypes.DELETE_COMMENT,
                id
            })
        }
    }catch(err){
        console.log(err)
    }
}
export async function getUserPost(userId, dispatch){
    try{
        const{data} = await axios.get(`/api/users/${userId}/post`);
        if(data && data.status === 'success'){
            dispatch({
                type: actionTypes.GET_USER_POST,
                posts: data.posts
            });
            return data;
        }
    }catch(err){
        console.log(err);
    }
}
export async function searchPost(search, dispatch){
    try{
        const{data} = await axios.get(`/api/search?search=${search}`);
        if(data && data.status === 'success'){
            dispatch({
                type: actionTypes.SEARCH_POST,
                data
            })
        }
    }catch(err){
        console.log(err);
    }
    
}
