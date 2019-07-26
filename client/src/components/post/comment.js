import React, {useState, useContext} from 'react';
import Replies from './commentReplies';
import {Form, Input, Button} from 'reactstrap';
import {AuthContext} from '../../context/authContext';
import {PostContext} from '../../context/postContext';
import {likeComment, unlikeComment, editComment, deleteComment} from '../../actions/postActions';
import './style.css';
import CommentForm from './commentForm';

const Comment = ({comment}) => {
    const[isOpen, setIsOpen] = useState(false);
    const[isEdit, setIsEdit] = useState(false);
    const[text, setText] = useState(comment.text || '')
    const{authData} = useContext(AuthContext);
    const{dispatch} = useContext(PostContext);

    const handleLike = (e, comment) => {
        const currentUser = authData.currentUser._id;
        const likeSpan = e.target
        
        if(likeSpan.classList.contains('is-liked')){
            likeSpan.classList.remove('is-liked');
            unlikeComment(comment, currentUser, dispatch);
        }else{
            likeSpan.classList.add('is-liked');
            likeComment(comment, currentUser, dispatch);
        }
    }
    const displayLikes = (comment) => {
        return(
            <span className= {comment.likers.includes(authData.currentUser._id) && 'is-liked'} onClick = {e => handleLike(e, comment)}> 
                <img src= {require('./like_ic14.png')} alt='like' />  {comment.likes} 
            </span>
        )
    }
    const handleSave = e => {
        e.preventDefault();
        if(text.length > 0){
            editComment({...comment, ...{text}}, dispatch);
            setIsEdit(false);
        }
    }
    const handleDelete = id => {
        deleteComment(id, dispatch);
    }
    if(isEdit){
    return(
        <div> 
            {isEdit && <span onClick= { () => setIsEdit(!isEdit)} >Cancel Edit </span>}
            <Form  onSubmit = {handleSave}  >
                <Input type='textarea' value={text} placeholder='type a comment'  onChange={e => setText(e.target.value)} /> <br />
                <Button color='success'> Save </Button>
            </Form>
        </div>
    )
    }else
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
                {displayLikes(comment)}
                <span id='reply' onClick= {() => setIsOpen(!isOpen)}  > {isOpen ? 'close' : <img src={require('./comment_ic20.png')} />} {comment.replies.length} </span>
                <span onClick={() => setIsEdit(!isEdit)} > Edit </span>
                <span onClick={() => handleDelete(comment._id)} > Delete </span>
            </div>
            <div className ='comment-replies'> 
                {
                isOpen && <Replies comment={comment} />
                }
            </div>
            
        </div>
    )
}

export default Comment;