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

const PostDetails = props => {
    const[editorState, setEditorState] = useState(EditorState.createEmpty());
    const[isOpen, setIsOpen] = useState(false);
    const[comment, setComment] = useState('');
    const{postData, dispatch} = useContext(PostContext);
    const{authData} = useContext(AuthContext);
    const[currentPage, setCurrentPage] = useState(1);
    const[limit] = useState(20);
    const {post, isPostLoading} = postData;
    const {currentUser} = authData;
    const bottom = useRef(null);
    const postSlug = props.match.params.slug;
    const{content, _id} = post;
    
    useEffect( () => {
        getPost(postSlug, dispatch)
        .then( () => {
            if(_id){
                setEditorState(EditorState
                .createWithContent(convertFromRaw(JSON.parse(content))))
            } 
        })      
    }, [_id, postSlug, dispatch, content]);

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
       return post.likers.includes(authData.currentUser._id) ? 'unLike' : 'Like'
    }
    const submitComment = e => {
        const currentUser = authData.currentUser._id;
        const pages = Math.ceil(post.comments.length / limit);
        e.preventDefault();
        
        const commentData = {
            text:comment,
            owner: currentUser,
            post: post._id
        }
        postComment(commentData, dispatch);
        setIsOpen(false);
       
        bottom.current.scrollIntoView({behavior: 'smooth'});
        pages > 1 && handlePageChange(pages);
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
        const indexOfLastTodo = currentPage * limit;
        const indexOfFirstTodo = indexOfLastTodo - limit;
        return comments.slice(indexOfFirstTodo, indexOfLastTodo);
    }
    
    if(isPostLoading)
        return <Spinnar />
    return (
        <div className='post'> 
            <div className='post-author'> 
                <span> <img src={post.owner.avatar ? post.owner.avatar : '/images/defavatar.png'} alt='author' /> </span>  <br />
                <small > By <Link to = {`/${post.owner.username}/profile`}> {post.owner.username} </Link>  | {" "} {new Date(post.createdDate).toDateString()} </small>
            </div>
            <Container> 
                <Row> 
                    <Col xs='12' > 
                        <div className='post-content'> 
                            
                            <h2> {post.title.toUpperCase()} </h2>
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
                        <br />
                        <h5>Comments: {post.comments.length} </h5>
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