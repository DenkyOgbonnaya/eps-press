import React,{Component, Fragment} from 'react';
import {Row, Col} from 'reactstrap';
import {RichUtils} from 'draft-js';
import './editorStyles.css';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin, {Separator} from 'draft-js-inline-toolbar-plugin';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from 'draft-js-buttons';
import createLinkPlugin from 'draft-js-anchor-plugin';
import 'draft-js-anchor-plugin/lib/plugin.css';
import HeadlinesButton from './headlinesButton';

const linkPlugin = createLinkPlugin({
  placeholder: 'Enter a URL and press enter'
});
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [
  inlineToolbarPlugin,
  linkPlugin
];

class PostEditor extends Component{

  focus = () => {
    this.editor.focus();
  };
  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command)
    if(newState) {
      this.props.setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    }
    
  render(){
    return (
    <div className='editor' onClick={this.focus}>
      <Row> 
        <Col md={{size: 8, offset: 2}}>
          <Editor 
            editorState = {this.props.editorState}
            plugins={plugins}
            onChange = {this.props.setEditorState}
            placeholder='click here to start typing...'
            ref={(element) => { this.editor = element; }}
          /> 
          <InlineToolbar>
          {
            (externalProps) => (
              <Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <Separator {...externalProps} />
                <HeadlinesButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
              </Fragment>
            )
          }
        </InlineToolbar>
 
        </Col>
      </Row>
    </div>
  )
  }
}
export default PostEditor;