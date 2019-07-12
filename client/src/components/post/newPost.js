import React, {Component} from 'react';
import {Container, Row, Col, Label, Input, Button} from 'reactstrap';
import {Editor, EditorState, RichUtils} from 'draft-js';
import BlockStyleToolbar, {getBlockStyle} from '../blockStyles/blocKStyleToolBar';

class NewPost extends Component{
  state = {editorState: EditorState.createEmpty() }

  handleChange = editorState => {
    this.setState({editorState})
  }
  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
        this.handleChange(newState);
        return 'handled';
    }
    return 'not-handled';
  }
  toggleBlockType = (blockType) => {
    this.handleChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };

  _onClick = (e) => {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, e.target.name));
  }
  render(){
    const styles = [
      {symbol: 'B', name:'BOLD'}, {symbol: 'I', name:'ITALIC'}, {symbol: 'U', name:'UNDERLINE'}, {symbol: '</>', name:'CODE'}];
    const buttons = styles.map(style => 
      <Button  size='sm'  key={style.name} onClick={this._onClick} name={style.name}>{style.symbol}</Button>
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
                  editorState={this.state.editorState}
                  onToggle={this.toggleBlockType}
                />
              </div>
            </Col>
          </Row>
          <Row> 
            <Col md={{size: 8, offset: 2}}>
              <Editor 
                blockStyleFn={this.getBlockStyle}
                editorState = {this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange = {this.handleChange}
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
}
export default NewPost;