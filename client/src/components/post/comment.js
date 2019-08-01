import React, {useState, useContext} from 'react';
import Replies from './commentReplies';
import {Form, Input, Button} from 'reactstrap';
import {withRouter, Link} from 'react-router-dom';
import {AuthContext} from '../../context/authContext';
import {PostContext} from '../../context/postContext';
import {likeComment, unlikeComment, editComment, deleteComment} from '../../actions/postActions';
import './style.css';
import CommentForm from './commentForm';
import Can from '../includes/can';

const Comment = (props) => {
    const[isOpen, setIsOpen] = useState(false);
    const[isEdit, setIsEdit] = useState(false);
    const[text, setText] = useState(props.comment.text || '')
    const{authData} = useContext(AuthContext);
    const{dispatch} = useContext(PostContext);


    const{currentUser} = authData;
    const{comment} = props;

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
                <img src= '/icons/like_ic14.png' alt='like' />  {comment.likes} 
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
    const handleReplyClick = () => {
        if(authData.isAthaunticated){
            setIsOpen(!isOpen);
        }else
            props.history.push('/login');
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
            <div className='post-author'> 
                <img src={currentUser.avatar ? currentUser.avatar : '/images/defavatar.png'} alt='owner pix' /> 
            </div>
            <div className='author-date'>
                <span className='author' > <b> <Link to = {`/${comment.owner.username}/profile`}>{comment.owner.username} </Link> </b> </span>
                <span className='date' > {new Date(comment.createdDate).toDateString()} </span>
            </div>
            <p className='text'> {comment.text} </p>
            <div className='like-reply'>
                {
                    <Can 
                        role = {currentUser.isAdmin}
                        perform ='comment:like'
                        yes = { () => (
                            displayLikes(comment)
                        )}
                        no = { () => <span> {comment.likes } {comment.likes >1 ? 'likes' : 'like'} </span>}
                    />
                }
                {
                    <Can 
                        role = {currentUser.isAdmin}
                        perform ='comment:reply'
                        yes = { () => (
                            <span id='reply' onClick= {() => setIsOpen(!isOpen)}  > {isOpen ? 'close' : <img src='/icons/comment_ic20.png' alt='comment ic' />} {comment.replies.length} </span>
                        )}
                        no = { () => <span onClick= {() => handleReplyClick()}> {comment.replies.length} replies <span>reply</span> </span>}
                    />
                }
                {
                    <Can 
                        role = {currentUser.isAdmin}
                        perform ='comment:edit'
                        data={{
                            userId: currentUser._id,
                            commentOwnerId: comment.owner._id
                        }}
                        yes = { () => (
                            <span onClick={() => setIsEdit(!isEdit)} > Edit </span>
                        )}
                    />
                }
                {
                    <Can 
                        role = {currentUser.isAdmin}
                        perform ='comment:delete'
                        yes = { () => (
                            <span onClick={() => handleDelete(comment._id)} > Delete </span>
                        )}
                    />
                }
                
            </div>
            <div className ='comment-replies'> 
                {
                isOpen && <Replies comment={comment} />
                }
            </div>
            
        </div>
    )
}

export default withRouter(Comment);