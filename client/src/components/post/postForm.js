import React, {useState, useContext, useEffect} from 'react';
import {Container, Row, Col, Label, Input, Alert, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {PostContext} from '../../context/postContext';
import {AuthContext} from '../../context/authContext';
import {addPost, editPost} from '../../actions/postActions';
import './style.css';
import PostEditor from '../editor/postEditor';
import propTypes from 'prop-types';
import decorator from '../editor/linkDecorator';
import Spinner from '../includes/spinner';

 const PostForm = (props) => {
  const[editorState, setEditorState] = useState(EditorState.createEmpty());
  const[title, setTitle ] = useState(props.title || '');
  const[image, setImage] = useState(null);
  const[imageurl, setImageUrl] = useState(props.picture || '');
  const[isError, setIsError] = useState(false);
  const{postData, dispatch} = useContext(PostContext);
  const{authData} = useContext(AuthContext)
  const[isPosting, setIsposting] = useState(false);
  const{content, postId} = props
  useEffect(() => {
    if(!postId){
      setEditorState(EditorState.createEmpty(decorator))
    }else {
      setEditorState(EditorState
      .createWithContent(convertFromRaw(JSON.parse(content)), decorator))
    }
  }, [postId, content]);
  
  const changeEditorState = state => {
    setEditorState(state);
  }
  const handlePost = () => {
    const formData = new FormData();
    const contentState = editorState.getCurrentContent();

    const content = JSON.stringify(convertToRaw(contentState));
    URL.revokeObjectURL(imageurl);
    
    formData.set('title', title);
    formData.set('content', content);
    formData.set('owner', authData.currentUser._id);
    formData.set('image', image);

    if(!props.postId){
      setIsposting(true);

      addPost(formData, dispatch)
      .then(data => {
        if(data.status === 'success'){
          props.history.push(`/post/${data.post.slug}`)
        }else 
        setIsError(true);

        setIsposting(false);
      })
    }else {
      setIsposting(true);
      editPost(props.postId, formData, dispatch)
      .then(data => {
        if(data.status === 'success'){
          props.history.push(`/post/${data.post.slug}`)
        }else 
        setIsError(true);

        setIsposting(false);
      })
    }
  }
  const handleFileChange = e => {
    let file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file))
  }
  
  return(
    <div className='editor'>
      <h3> {props.postId ? 'Edit Post': 'Start a new post'} </h3>
      <Container> 
        <Row> 
          <Col md={{size: 8, offset: 2}}>
          <Alert color='danger' isOpen={isError} > {postData.postError} </Alert>
          {isPosting && <Spinner />}
            <Label for='title'> Title </Label>
            <Input name='title' value={title} placeholder='post title' onChange = { e => setTitle(e.target.value)} /> <br />
            <Label for='content'> Content (select text to format) </Label>
          </Col>
        </Row>
        <PostEditor 
          editorState = {editorState}
          setEditorState = {changeEditorState}
        />
        <Row> 
          <Col md={{size: 8, offset: 2}} > 
            <Label for='image' >Add Picture (optional, 1mb max, jpg,png,jpeg) </Label>
            <Input type='file' name="image" accept='image/*' onChange = { handleFileChange }  /> {imageurl && <img src={imageurl} alt='file' /> } <br /> 
          </Col>
        </Row>
        <Row> 
          <Col md={{size: 8, offset: 2}} > <Button  color='success' onClick = {handlePost} >
            {props.postId ? 'Save post': 'Post'} 
           </Button>  </Col>
        </Row>
      </Container>
    </div>
  )
  
}

PostForm.propTypes = {
  postId: propTypes.string,
  title: propTypes.string,
  content: propTypes.string,
  picture: propTypes.string
}
export default withRouter(PostForm);