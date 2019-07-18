import React, {useState} from 'react';
import Replies from './commentReplies';
import {Card, CardBody, CardSubtitle, Container, Row, Col, CardText} from 'reactstrap';
import './style.css';

const Comment = ({comment}) => {
    const[isOpen, setIsOpen] = useState(false);

    return(
        <div className='comment-container'> 
            <div className='author-image'> 
                <img src={require('./Denkys.jpg')} /> 
            </div>
            <div className='author-date'>
                <span className='author' > <b> {comment.owner.username} </b> </span>
                <span className='date' > {new Date(comment.createdDate).toDateString()} </span>
            </div>
            <p className='text'> {comment.text} </p>
            <div className='like-reply'>
                <span  > <img src= {require('./like_ic14.png')} alt='like' />  {comment.likes} </span>
                <span id='reply' onClick= {() => setIsOpen(!isOpen)}  > {isOpen ? 'close' : <img src={require('./comment_ic20.png')} />} {comment.replies.length} </span>
            </div>
            <div className ='comment-replies'> 
                {
                isOpen && <Replies replies={comment.replies} />
                }
            </div>
            
        </div>
    )
}

export default Comment;