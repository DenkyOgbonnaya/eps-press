import React from "react";
import {Button} from 'reactstrap';

const BlockStyleButton = props => {
  const onToggle = (e) => {
    e.preventDefault()
    props.onToggle(props.style)
  }
  
  let className = "RichEditor-styleButton"
  if(props.active) {
    className += " RichEditor-activeButton"
  }
  return (
    <Button size='sm' className={className} onClick={onToggle}>
      {props.label}
    </Button>
    );

}
export default BlockStyleButton
