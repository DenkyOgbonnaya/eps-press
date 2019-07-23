import React, {useState, useEffect, useContext} from 'react';
import {PostContext} from '../../context/postContext';
import {getPost} from '../../actions/postActions';
import PostForm from './postForm';

const EditPost = (props) => {
    const{postData, dispatch} = useContext(PostContext);

    useEffect( () => {
        const postSlug = props.match.params.slug;
        getPost(postSlug, dispatch);
    }, []);

    const{_id, title, content, image} = postData.post;
    if(postData.isLoading)
        return(
            <div> 
                ...loading
            </div>
        )
    return(
    <div className='editpost'>
      <PostForm 
        postId = {_id}
        title = {title}
        content = {content}
      />
    </div>
  )

}
export default EditPost;