import React, {useContext, useReducer} from 'react';
import postReducer from '../reducers/postReducer';

const PostContext = useContext.createContext();

const PostContextProvider = props => {
    const[posts, dispatch] = useReducer(postReducer, []);
    return(
        <PostContext.Provider value={{posts, dispatch}}  > 
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;