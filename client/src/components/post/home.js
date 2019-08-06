import React, {useEffect, useState, useContext} from 'react';
import PostFeeds from './postFeeds';
import SearchField from '../includes/searchField';
import {PostContext} from '../../context/postContext';
import {getPosts, searchPost} from '../../actions/postActions';
import Paginate from '../includes/pagination';
import Spinner from '../includes/spinner';

const Home = () => {
    const{postData, dispatch} = useContext(PostContext);
    const{currentPage, pages} = postData;
    const[searchTerm, setSearchTerm] = useState('');
    
    useEffect( () => {
        getPosts(dispatch, 1,10);
    }, [dispatch]);
    const handlePageChange = (pageNum) => {
        getPosts(dispatch, pageNum, 10)
    }
    const handleSearch = () => {
        searchPost(searchTerm, dispatch);
    }
    const setSearch = search => {
        setSearchTerm(search);
    }

    if(postData.isLoading )
        return (<Spinner />)
    if(postData.posts.length === 0)
        return(<div> There is currently no post </div>)
    return(
        <div> 
            <p> The official blogging platform of the EPS CDS club Lafia. <i>...saving the environment! </i> </p>
            <hr />
            <SearchField 
                setSearch= {setSearch}
                handleSearch = {handleSearch}
            />
            <br />
            <PostFeeds posts= {postData.posts} />
            <Paginate 
                pages = {pages}
                currentPage = {currentPage}
                handlePageChange = {handlePageChange}
            />
        </div>
    )
}
export default Home