import React, {useEffect, useContext} from 'react';
import PostFeeds from './postFeeds';
import SearchField from '../includes/searchField';
import {PostContext} from '../../context/postContext';
import {getPosts} from '../../actions/postActions';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const Home = () => {
    const{postData, dispatch} = useContext(PostContext);
    //const{currentPage, pages} = postData;
    
    useEffect( () => {
        getPosts(dispatch, 1,2);
    }, []);
    const handlePageChange = (pageNum) => {
        getPosts(dispatch, pageNum, 2)
    }
    const displayPageNums = () => {
        const pageNumbers = [];
        const{pages, currentPage} = postData

        for(let number = 1; number <= pages; number++){
            pageNumbers.push(number);
        }
        if(pages > 1)
        return (
            <Pagination >
                <PaginationItem  disabled = {currentPage === 1 ? true : false }> 
                    <PaginationLink previous onClick = { () => handlePageChange(currentPage -1)} />
                </PaginationItem>
                {pageNumbers.map(number =>
                <PaginationItem key = {number} active = {currentPage === number ? true : false}  >
                    <PaginationLink 
                    style={ currentPage === number ? {background: '#4caf50'} : {background: '#fff'}  } 
                    onClick = { ()=> handlePageChange(number)}>   {number}  
                    </PaginationLink>
                </PaginationItem>
                )}
                <PaginationItem disabled = {currentPage > 1 ? true : false } > 
                    <PaginationLink next onClick = { () => handlePageChange(currentPage +1)} />
                </PaginationItem>
            </Pagination>
        )
    }

    if(!postData || postData.posts.length === 0  )
        return (<div> No posts at the moment</div>)
    return(
        <div> 
            <p> The official blogging platform for the EPS CDS group Lafia. <i>...saving the environment! </i> </p>
            <hr />
            <SearchField />
            <br />
            <PostFeeds posts= {postData.posts} />
            {displayPageNums()}
        </div>
    )
}
export default Home