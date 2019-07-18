import React from 'react';
import HeaderStyleDropdown from './headerStyleDropdown';
import BlockStyleButton from './blockStyleButton';
const BlockStyleToolbar = props  => {

  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
     
  return (
    <div>
       
      <span className="RichEditor-controls">
        {BLOCK_TYPES.map(type => 
          <BlockStyleButton
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            key={type.label}
            type={type}
          />
        )}
         <HeaderStyleDropdown
         headerOptions={HEADER_TYPES}
         active={blockType}
         onToggle={props.onToggle}
         />
       </span>
      </div>
     );
   }
    const BLOCK_TYPES = [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: " “ ” ", style: "blockquote" },
    { label: "{ }", style: 'code-block' }
   ];
   const HEADER_TYPES = [
     { label: "h1", style: "header-one" },
     { label: "h2", style: "header-two" },
     { label: "h3", style: "header-three" },
     { label: "h4", style: "header-four" },
     { label: "h5", style: "header-five" },
     { label: "h6", style: "header-six" }
   ]
   export function getBlockStyle(block) {
    switch (block.getType()) {
     case "blockquote":
      return "RichEditor-blockquote";
     default:
      return null;
    }
   }
   export default BlockStyleToolbar;