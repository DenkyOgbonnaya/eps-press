import React, {useState} from 'react';
import {Container, Row, Col, Label, Input, Button} from 'reactstrap';
import {Editor, EditorState, RichUtils} from 'draft-js';
import BlockStyleToolbar, {getBlockStyle} from '../blockStyles/blocKStyleToolBar';

 const NewPost = () => {
  const[editorState, setEditorState] = useState(EditorState.createEmpty())// {editorState: EditorState.createEmpty() }
  
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
  const styles = [
    {symbol: 'B', name:'BOLD'}, {symbol: 'I', name:'ITALIC'}, {symbol: 'U', name:'UNDERLINE'}, {symbol: '</>', name:'CODE'}];
  const buttons = styles.map(style => 
    <Button  size='sm'  key={style.name} onClick={_onClick} name={style.name}>{style.symbol}</Button>
  )
    return(
      <div>
        <h3>Start new post </h3>
        <Container> 
          <Row> 
            <Col md={{size: 8, offset: 2}}>
              <Label for='title'> Title </Label>
              <Input name='title' placeholder='post title' /> <br />
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
              <Input type='file' /> <br />
              <Button  color='success'> Post </Button> <br />
            </Col>
          </Row>
        </Container>
      </div>
    )
  
}
export default NewPost;