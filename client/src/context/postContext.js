import React, {useReducer} from 'react';
import postReducer from '../reducers/postReducer';

export const PostContext = React.createContext();

export const PostContextProvider = (props) => {
    const[postData, dispatch] = useReducer(postReducer, {
        posts: [],
        post: {},
        page: 1,
        currentPage: '',
        isLoading: true,
        PostError: '',
        isNewPost: true
    })
    return (
        <PostContext.Provider value= {{postData, dispatch}}> 
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider