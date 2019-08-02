import React, {useState} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const Paginate = ({pages, currentPage, handlePageChange}) => {

    const displayPageNums = () => {
        const pageNumbers = [];
        //const pages = Math.ceil(list.length / limit);

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
    return(
        displayPageNums()
    )
}
export default Paginate;