import React, {useEffect, useContext} from 'react';
import PostFeeds from './postFeeds';
import SearchField from '../includes/searchField';
import {PostContext} from '../../context/postContext';
import {getPosts} from '../../actions/postActions';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import Paginate from '../includes/pagination';

const Home = () => {
    const{postData, dispatch} = useContext(PostContext);
    const{currentPage, pages} = postData;
    
    useEffect( () => {
        getPosts(dispatch, 1,2);
    }, []);
    const handlePageChange = (pageNum) => {
        getPosts(dispatch, pageNum, 2)
    }

    if(!postData || postData.posts.length === 0  )
        return (<div> No posts at the moment</div>)
    return(
        <div> 
            <p> The official blogging platform of the EPS CDS club Lafia. <i>...saving the environment! </i> </p>
            <hr />
            <SearchField />
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