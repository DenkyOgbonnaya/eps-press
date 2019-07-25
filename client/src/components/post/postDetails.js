import React, {useState, useEffect, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import Comment from './comment'
import{Container, Row, Col, Card, CardFooter, CardHeader, CardBody, CardText, CardSubtitle, CardTitle} from 'reactstrap';
import CommentForm from './commentForm';
import {PostContext} from '../../context/postContext';
import {AuthContext} from '../../context/authContext';
import {getPost, likePost, unlikePost} from '../../actions/postActions';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import './style.css';

const PostDetails = props => {
    const[editorState, setEditorState] = useState(EditorState.createEmpty());
    const[isOpen, setIsOpen] = useState(false);
    const{postData, dispatch} = useContext(PostContext);
    const{authData} = useContext(AuthContext);
    const post = postData.post;

    useEffect( () => {
        const postSlug = props.match.params.slug;
        getPost(postSlug, dispatch)
        .then( () => {
            if(post._id){
                setEditorState(EditorState
                .createWithContent(convertFromRaw(JSON.parse(post.content))))
            } 
        })      
    }, [post._id]);

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
    
    if(!post._id)
    return(<div> Empty post </div>)
    return (
        <div className='post'> 
            <div className='post-author'> 
                <span> <img src={require('./Denkys.jpg')} alt='author' /> </span>  <br />
                <small > By {post.owner.username}  | {" "} {new Date(post.createdDate).toDateString()} </small>
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
                            <span onClick = {() => setIsOpen(!isOpen)} > {isOpen ? 'close reply' : 'Reply'} </span> {" "}
                            <span onClick = { e => handleLikeClick(e, post) } > {likeBtn(post)}  </span> likes {post.likes}
                            <span onClick={() => handleEditClick(post)}> Edit </span> {" "}
                            <span> Delete  </span> {" "}
                        </div>
                        <br />
                        <h5>Comments: {post.comments.length} </h5>
                        {isOpen && <CommentForm />}
                        
                    </Col>
                </Row>
                <Row> 
                    {
                        post.comments.length > 0 ? post.comments.map(comment => 
                        <Col key= {comment._id} xs='12'> 
                            <Comment comment= {comment} />
                            <hr />
                        </Col>
                    ) : 
                        <Col> <div>No Comments! be the first to comment </div> </Col>
                    }
                </Row>
            </Container>
        </div>
    )
}
export default withRouter(PostDetails);