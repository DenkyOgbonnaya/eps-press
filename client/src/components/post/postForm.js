import React, {useState, useContext, useEffect} from 'react';
import {Container, Row, Col, Label, Input, Alert, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {PostContext} from '../../context/postContext';
import {AuthContext} from '../../context/authContext';
import {addPost, editPost} from '../../actions/postActions';
import './style.css';
import PostEditor from '../editor/postEditor';
import propTypes from 'prop-types';

 const PostForm = (props) => {
  const[editorState, setEditorState] = useState(EditorState.createEmpty());
  const[title, setTitle ] = useState('');
  const[image, setImage] = useState(null);
  const[imageurl, setImageUrl] = useState('');
  const[isError, setIsError] = useState(false);
  const{postData, dispatch} = useContext(PostContext);
  const{authData} = useContext(AuthContext)
  
  useEffect(() => {
    if(!props.postId){
      setEditorState(EditorState.createEmpty())
    }else {
      setTitle(props.title)
      setImageUrl(props.picture)
      setEditorState(EditorState
      .createWithContent(convertFromRaw(JSON.parse(props.content))))
    }
  }, [])
  
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
      addPost(formData, dispatch)
      .then(data => {
        if(data.status === 'success'){
          props.history.push(`/post/${data.post.slug}`)
        }else 
        setIsError(true);
      })
    }else {
      editPost(props.postId, formData, dispatch)
      .then(data => {
        if(data.status === 'success'){
          props.history.push(`/post/${data.post.slug}`)
        }else 
        setIsError(true);
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
      <h3> {props.postId ? 'Edit Post': 'State a new post'} </h3>
      <Container> 
        <Row> 
          <Col md={{size: 8, offset: 2}}>
          <Alert color='danger' isOpen={isError} > {postData.postError} </Alert>
            <Label for='title'> Title </Label>
            <Input name='title' value={title} placeholder='post title' onChange = { e => setTitle(e.target.value)} /> <br />
            <Label for='content'> Content </Label>
          </Col>
        </Row>
        <PostEditor 
          editorState = {editorState}
          setEditorState = {setEditorState}
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