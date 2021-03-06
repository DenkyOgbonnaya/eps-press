import React, {useState, useEffect, useContext, useRef} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Comment from './comment'
import{Container, Row, Col} from 'reactstrap';
import CommentForm from './commentForm';
import {PostContext} from '../../context/postContext';
import {AuthContext} from '../../context/authContext';
import {getPost, likePost, unlikePost, postComment, deletePost} from '../../actions/postActions';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import './style.css';
import Can from '../includes/can';
import Paginate from '../includes/pagination';
import Spinnar from '../includes/spinner';
import decorator from '../editor/linkDecorator';
import Spinner from '../includes/spinner';
import SocialShare from '../includes/socialShare';
import { getWordCount, getReadingTime } from './helper';

const PostDetails = props => {
    const[editorState, setEditorState] = useState(EditorState.createEmpty());
    const[isOpen, setIsOpen] = useState(false);
    const[comment, setComment] = useState('');
    const{postData, dispatch} = useContext(PostContext);
    const{authData} = useContext(AuthContext);
    const[currentPage, setCurrentPage] = useState(1);
    const[limit] = useState(20);
    const {post, isPostLoading} = postData;
    const[isCommenting, setIsCommenting] = useState(false);
    const[isLiked, setIsLiked] = useState(false);
    const {currentUser} = authData;
    const bottom = useRef(null);
    const postSlug = props.match.params.slug;
    const{content, _id} = post;
    
    useEffect( () => {
        getPost(postSlug, dispatch)
        .then( () => {
            if(_id){
                setEditorState(EditorState
                .createWithContent(convertFromRaw(JSON.parse(content)), decorator))
            } 
        })      
    }, [_id, postSlug, dispatch, content]);
    useEffect( ()=>{
        if(post.likers)
            post.likers.includes(currentUser._id) ? setIsLiked(true) : setIsLiked(false)
    }, [post.likers, currentUser._id])
    const handleEditClick = post => {
        props.history.push(`/edit/${post.slug}`);
    }
    const handleLikeClick = (e, post) => {
        const currentUser = authData.currentUser._id;
        
        if( e.target.textContent.trim() === 'Like'){
            likePost(post, currentUser , dispatch);
        }else
            unlikePost(post, currentUser, dispatch );
        
    }
    const likeBtn = (post) => {
       return isLiked ? 'unLike' : 'Like'
    }
    const submitComment = e => {
        const currentUser = authData.currentUser._id;
        const pages = Math.ceil(post.comments.length / limit);
        setIsCommenting(true);
        e.preventDefault();
        
        const commentData = {
            text:comment,
            owner: currentUser,
            post: post._id,
            createdDate: new Date()
        }
        postComment(commentData, dispatch)
        .then(data => {
            if(data.status === 'success'){
                setIsOpen(false);
                if(bottom.current)
                bottom.current.scrollIntoView({behavior: 'smooth'});
                pages > 1 && handlePageChange(pages);
            }
            setIsCommenting(false);
        })
    }
    const handleDelete = id => {
        deletePost(id, dispatch);
        props.history.push('/');
    }
    const handleReplyClick = () => {
        if(authData.isAuthenticated){
            setIsOpen(!isOpen);
        }else
            props.history.push('/login');
    }                       
    const handlePageChange = number => {
        setCurrentPage(number);
    }
    const currentComments = () => {
        const{comments} = post;
        const indexOfLastComment = currentPage * limit;
        const indexOfFirstComment = indexOfLastComment - limit;
        return comments.slice(indexOfFirstComment, indexOfLastComment);
    }
    
    if(isPostLoading)
        return <Spinnar />
    return (
        <div className='post'> 
            <Container> 
                <Row> 
                    <Col xs='12' > 
                        <div className='post-content'> 
                            
                            <h2> {post.title.substring(0,200)} </h2>
                            <div className='post-author'> 
                                <span> <img src={post.owner.avatar ? post.owner.avatar : '/images/defavatar.png'} alt='author' /> </span>  <br />
                                <small > By <Link to = {`/${post.owner.username}/profile`}> {post.owner.username} </Link>  | {" "} {new Date(post.createdDate).toDateString()} - {getReadingTime(getWordCount(editorState))} </small>
                            </div>
                            <Editor 
                                editorState = {editorState}
                                readOnly = {true}
                            />
                            <div className='post-picture'> 
                                {post.picture && <img src={post.picture} alt='post-pix'/>}
                            </div>
                            <div className = 'react-bar'>
                                <span onClick = {() => handleReplyClick() } > {isOpen ? 'close reply' : 'Reply'} </span> 
                                        
                            {
                                <Can 
                                    role= {currentUser.isAdmin}
                                    perform = "post:edit"
                                    data= {{
                                        userId: currentUser._id,
                                        postOwnerId: post.owner._id
                                    }}
                                    yes = { () => (
                                        <span onClick={() => handleEditClick(post)}> Edit </span> 
                                    )}
                                />
                            }
                            {
                                <Can 
                                    role= {authData.currentUser.isAdmin}
                                    perform = "post:delete"
                                    yes = { () => (
                                        <span onClick={() => handleDelete(post._id)}> Delete  </span> 
                                    )}
                                />
                            }
                            {
                                <Can 
                                    role= {currentUser.isAdmin}
                                    perform = "post:like"
                                    yes = { () => (
                                        <span onClick = { e => handleLikeClick(e, post) } > {likeBtn(post)}  </span>  
                                    )}
                                />
                            }
                            <div> {post.likes} {post.likes > 1 ? 'likes' : 'like' } </div>
                            </div>
                        </div>
                        <SocialShare post= {post} pathname ={props.location.pathname}  />
                        <br />
                        <h5>Comments: {post.comments.length} </h5> {isCommenting && <Spinner />}
                        {isOpen && <CommentForm setText= {setComment} handleSubmit={submitComment} />}
                        
                    </Col>
                </Row>
                <Row> 
                    {
                        post.comments.length > 0 ? currentComments().map(comment => 
                        <Col key= {comment._id} xs='12'> 
                            <Comment comment= {comment} />
                            <hr />
                            <span ref={bottom}> </span>
                        </Col>
                    ) : 
                        <Col> <div>No Comments! be the first to comment </div> </Col>
                    }
                    <Paginate
                        pages = {Math.ceil(post.comments.length / limit)}
                        currentPage = {currentPage}
                        handlePageChange = {handlePageChange}
                    />
                </Row>
            </Container>
        </div>
    )
}
export default withRouter(PostDetails);