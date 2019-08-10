import React from 'react';
import {CompositeDecorator} from 'draft-js';
const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }
  const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a rel="nofollow noreferrer" href={url} target="">
        {props.children}
      </a>
    );
  };
  
  const decorator = new CompositeDecorator([{
    strategy: findLinkEntities,
    component: Link
  }]);

  export default decorator;