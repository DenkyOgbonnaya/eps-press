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
export async function likePost(post, liker, dispatch){
    try{
        dispatch({
            type: actionTypes.LIKE_POST,
            payLoad: {likers: post.likers, inc: 1}
        });
        const{data} = await axios.post(`/api/post/${post._id}/likes`, {liker});
        console.log(data)
        if(data.status === 'success'){
            dispatch({
                type: actionTypes.LIKE_POST,
                payLoad: {likers: data.likers, inc: 0}
            });
        }
    }catch(err){
        console.log(err);
    }
}
export async function unlikePost(post, unLiker, dispatch){
    try{
        dispatch({
            type: actionTypes.UNLIKE_POST,
            payLoad: {likers: post.likers, dec: 1}
        });
        const{data} = await axios.delete(`/api/post/${post._id}/likes`, {data: {unLiker}});
        if(data.status === 'success'){
            dispatch({
                type: actionTypes.UNLIKE_POST,
                payLoad: {likers: data.likers, dec: 0}
            });
        }
    }catch(err){
        console.log(err);
    }
}
export async function postComment(commentData, dispatch){
    
    try{
        const {data} = await axios.post('/api/comment', commentData);
        if(data.status === 'success')
        dispatch({
            type: actionTypes.COMMENT_POST,
            comment: data.comment
        })
    }catch(err){
        console.log(err);
        
    }
}
export async function likeComment(comment, liker, dispatch){
    try{
        dispatch({
            type: actionTypes.LIKE_COMMENT,
            payLoad: {likers: comment.likers, inc: 1, comment}
        });
        const{data} = await axios.post(`/api/comment/${comment._id}/likes`, {liker});
        
        if(data.status === 'success'){
            dispatch({
                type: actionTypes.LIKE_COMMENT,
                payLoad: {likers: data.likers, inc: 0, comment}
            });
        }
    }catch(err){
        console.log(err);
    }
}
export async function unlikeComment(comment, unliker, dispatch){
    try{
        dispatch({
            type: actionTypes.UNLIKE_COMMENT,
            payLoad: {likers: comment.likers, dec: 1, comment}
        });
        const{data} = await axios.delete(`/api/comment/${comment._id}/likes`, {data:{unliker}});
        
        if(data.status === 'success'){
            dispatch({
                type: actionTypes.UNLIKE_COMMENT,
                payLoad: {likers: data.likers, dec: 0, comment}
            });
        }
    }catch(err){
        console.log(err);
    }
}
export async function postReply(replyData, comment, dispatch){
    
    try{
        const {data} = await axios.post(`/api/comment/${comment._id}`, replyData);
        if(data.status === 'success')
        dispatch({
            type: actionTypes.REPLY_COMMENT,
            payLoad: {replies: data.replies, comment}
        })
    }catch(err){
        console.log(err);
        
    }
}
export async function editComment(credentials, dispatch){
    console.log(credentials);
    
    dispatch({
        type: actionTypes.EDIT_COMMENT,
        credentials
    })
    try{
        const {data} = await axios.put(`/api/comment/${credentials._id}`, credentials);
        console.log('data',data.comment);
        
        if(data.status === 'success')
        dispatch({
            type: actionTypes.EDIT_COMMENT,
            credentials: data.comment
        })
    }catch(err){
        console.log(err)
    }
}