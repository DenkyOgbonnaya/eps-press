import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {Editor, RichUtils} from 'draft-js';
import BlockStyleToolbar, {getBlockStyle} from './blocKStyleToolBar';
import './style.css';

const PostEditor = ({editorState, setEditorState}) => {

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if(newState) {
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
  return (
    <div className = 'editor'> 
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
        </Col>
      </Row>
    </div>
  )
}
export default PostEditor;