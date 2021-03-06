import React, {useEffect, useContext} from 'react';
import {PostContext} from '../../context/postContext';
import {getPost} from '../../actions/postActions';
import PostForm from './postForm';

const EditPost = (props) => {
    const{postData, dispatch} = useContext(PostContext);
    const postSlug = props.match.params.slug;
    useEffect( () => {
        
        getPost(postSlug, dispatch);
    }, [postSlug, dispatch]);

    const{_id, title, content, picture} = postData.post;
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
        picture = {picture}
      />
    </div>
  )

}
export default EditPost;