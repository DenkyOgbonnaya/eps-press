import React, {Component} from "react";
import {Button} from 'reactstrap';

class BlockStyleButton extends Component {
  onToggle = (e) => {
    e.preventDefault()
    this.props.onToggle(this.props.style)
  }
  render() {
    let className = "RichEditor-styleButton"
    if(this.props.active) {
      className += " RichEditor-activeButton"
    }
    return (
      <Button size='sm' className={className} onClick={this.onToggle}>
        {this.props.label}
      </Button>
    );
  }
}
export default BlockStyleButton
