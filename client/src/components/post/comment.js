import React, {useState, useContext, Fragment} from 'react';
import Replies from './commentReplies';
import {Form, Input, Button} from 'reactstrap';
import {withRouter, Link} from 'react-router-dom';
import {AuthContext} from '../../context/authContext';
import {PostContext} from '../../context/postContext';
import {likeComment, unlikeComment, editComment, deleteComment} from '../../actions/postActions';
import './style.css';
import Can from '../includes/can';
import { fromNow } from './helper';
import propTypes from 'prop-types';

const Comment = (props) => {
    const[isOpen, setIsOpen] = useState(false);
    const[isEdit, setIsEdit] = useState(false);
    const[text, setText] = useState(props.comment.text || '')
    const{authData} = useContext(AuthContext);
    const{dispatch} = useContext(PostContext);


    const{currentUser} = authData;
    const{comment} = props;

     const handleLikeClick = (e, comment) => {
        const currentUser = authData.currentUser._id;
        
        if( e.target.textContent.trim() === 'Like'){
            likeComment(comment, currentUser , dispatch);
        }else
            unlikeComment(comment, currentUser, dispatch );
        
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
                <img src={comment.owner.avatar ? comment.owner.avatar : '/images/defavatar.png'} alt='owner pix' /> 
            </div>
            <div className='author-date'>
                <span className='author' > <b> <Link to = {`/${comment.owner.username}/profile`}>{comment.owner.username} </Link> </b> </span>
                <span className='date' > {fromNow(comment.createdDate)}  </span>
            </div>
            <p className='text'> {comment.text} </p>
            <div className='reaction'>
                {
                    <Can 
                        role = {currentUser.isAdmin}
                        perform ='comment:like'
                        yes = { () => (
                            <span onClick={e => handleLikeClick(e, comment)} > {comment.likers.includes(authData.currentUser._id) ? 'unLike' : 'Like'}  </span>
                        )}
                    />
                }
                    <div> {comment.likes } {comment.likes >1 ? 'likes' : 'like'} </div>
                {
                    <Can 
                        role = {currentUser.isAdmin}
                        perform ='comment:reply'
                        yes = { () => (
                            <span id='reply' onClick= {() => setIsOpen(!isOpen)}  > {isOpen ? <b>close</b>: 'Reply'} {comment.replies.length} </span>
                        )}
                        no = { () => 
                            <div > {comment.replies.length} {comment.replies.length > 1 ? 'replies' : 'reply'} </div>
                        }
                    />
                }
                {authData.isAthaunticated ? <span onClick= {() => handleReplyClick()} >Reply </span> : ''}
                    
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
Comment.propTypes = {
    comment: propTypes.object.isRequired
}

export default withRouter(Comment);