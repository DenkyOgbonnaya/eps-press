import React, {Component} from 'react';
import HeadlinesPicker from './headlinePicker';
import './editorStyles.css';

class HeadlinesButton extends Component {
    // When using a click event inside overridden content, mouse down
    // events needs to be prevented so the focus stays in the editor
    // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
    onMouseDown = (event) => event.preventDefault()
  
    onClick = () =>
      // A button can call `onOverrideContent` to replace the content
      // of the toolbar. This can be useful for displaying sub
      // menus or requesting additional information from the user.
      this.props.onOverrideContent(HeadlinesPicker);
  
    render() {
      return (
        <div onMouseDown={this.onMouseDown} className='.headlineButtonWrapper'>
          <button onClick={this.onClick} className='headlineButton'>
            H
          </button>
        </div>
      );
    }
  }

  export default HeadlinesButton;