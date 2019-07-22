import React, {useState, useContext, useEffect} from 'react';
import {Container, Row, Col, Label, Input, Alert, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {Editor, EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {PostContext} from '../../context/postContext';
import {AuthContext} from '../../context/authContext';
import {addPost, editPost} from '../../actions/postActions';
import './style.css';
import PostEditor from '../editor/postEditor';

 const NewPost = (props) => {
  const[editorState, setEditorState] = useState(EditorState.createEmpty());
  const[title, setTitle ] = useState('');
  const[image, setImage] = useState(null);
  const[isError, setIsError] = useState(false);
  const{postData, dispatch} = useContext(PostContext);
  const{authData} = useContext(AuthContext)
  
  useEffect(() => {
    if(postData.isNewPost){
      setEditorState(EditorState.createEmpty())
    }else {
      setTitle(postData.post.title)
      setEditorState(EditorState
      .createWithContent(convertFromRaw(JSON.parse(postData.post.content))))
    }
  }, [])
  
  const handlePost = () => {
    const formData = new FormData();
    const contentState = editorState.getCurrentContent();

    const content = JSON.stringify(convertToRaw(contentState));
    
    formData.set('title', title);
    formData.set('content', content);
    formData.set('owner', authData.currentUser._id);
    formData.set('image', image);

    if(postData.isNewPost){
      addPost(formData, dispatch)
      .then(data => {
        if(data.status === 'success'){
          props.history.push(`post/${data.post.slug}`)
        }else 
        setIsError(true);
      })
    }else {
      editPost(formData, dispatch)
    }
  }
  
  return(
    <div className='editor'>
      <h3>Start new post </h3>
      <Container> 
        <Row> 
          <Col md={{size: 8, offset: 2}}>
          <Alert color='danger' isOpen={isError} > {postData.postError} </Alert>
            <Label for='title'> Title </Label>
            <Input name='title' placeholder='post title' onChange = { e => setTitle(e.target.value)} /> <br />
            <Label for='content'> Content </Label>
          </Col>
        </Row>
        <PostEditor 
          editorState = {editorState}
          setEditorState = {setEditorState}
        />
        <Row> 
          <Col md={{size: 8, offset: 2}} > 
          <Label >Add Picture (optional, max 1mb, jpg,png,jpeg) </Label>
          <Input type='file' name="image" accept='image/*' onChange = { e => setImage(e.target.files[0])}  /> <br /> 
          </Col>
        </Row>
        <Row> 
          <Col md={{size: 8, offset: 2}} > <Button  color='success' onClick = {handlePost} > Post </Button>  </Col>
        </Row>
      </Container>
    </div>
  )
  
}
export default withRouter(NewPost);