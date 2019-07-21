import React, {useState, useContext, useEffect} from 'react';
import {Container, Row, Col, Label, Input, Alert, Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import BlockStyleToolbar, {getBlockStyle} from '../blockStyles/blocKStyleToolBar';
import {PostContext} from '../../context/postContext';
import {AuthContext} from '../../context/authContext';
import {addPost, editPost} from '../../actions/postActions';
import './style.css';

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
  
  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
        setEditorState(newState);
        return 'handled';
    }
    return 'not-handled';
  }
  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

  const _onClick = e => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, e.target.name));
  }
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
  const styles = [
    {symbol: 'B', name:'BOLD'}, {symbol: 'I', name:'ITALIC'}, {symbol: 'U', name:'UNDERLINE'}, {symbol: '</>', name:'CODE'}];
  const buttons = styles.map(style => 
    <Button  size='sm'  key={style.name} onClick={_onClick} name={style.name}>{style.symbol}</Button>
  )
    return(
      <div className='editor'>
        <h3>Start new post </h3>
        <Container> 
          <Row> 
            <Col md={{size: 8, offset: 2}}>
            <Alert isOpen={isError} > {postData.postError} </Alert>
              <Label for='title'> Title </Label>
              <Input name='title' placeholder='post title' onChange = { e => setTitle(e.target.value)} /> <br />
              <Label for='content'> Content </Label>
            </Col>
          </Row>
          <Row > 
            <Col xs='6' xs={{offset:0}} md={{offset:2}}> 
              <div className='buttons'> 
                {buttons}
              </div> 
            </Col>
            <Col xs='6' xs={{offset:0}} md={{offset: 0}}> 
              <div className='toolbar' > 
                <BlockStyleToolbar
                  editorState={editorState}
                  onToggle={toggleBlockType}
                />
              </div>
            </Col>
          </Row>
          <Row> 
            <Col md={{size: 8, offset: 2}}>
              <Editor 
                blockStyleFn={getBlockStyle}
                editorState = {editorState}
                handleKeyCommand={handleKeyCommand}
                onChange = {setEditorState}
                placeholder='click below to start typing...'
              /> 
              <Label >Picture (optional) </Label>
              <Input type='file' name="image" accept='image/*' onChange = { e => setImage(e.target.files[0])}  /> <br />
              <Button  color='success' onClick = {handlePost} > Post </Button> <br />
            </Col>
          </Row>
        </Container>
      </div>
    )
  
}
export default withRouter(NewPost);