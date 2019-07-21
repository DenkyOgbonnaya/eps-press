import React, {useEffect, useContext} from 'react';
import PostFeeds from './postFeeds';
import SearchField from '../includes/searchField';
import {PostContext} from '../../context/postContext';
import {getPosts} from '../../actions/postActions';

const Home = () => {
    const{postData, dispatch} = useContext(PostContext);
    
    useEffect( () => {
        getPosts(dispatch);
    }, []);
    
    if(!postData || postData.posts.length === 0  )
        return (<div> No posts at the moment</div>)
    return(
        <div> 
            <p> The official blogging platform for the EPS CDS group Lafia. <i>...saving the environment! </i> </p>
            <hr />
            <SearchField />
            <br />
            <PostFeeds posts= {postData.posts} />
        </div>
    )
}
export default Home;