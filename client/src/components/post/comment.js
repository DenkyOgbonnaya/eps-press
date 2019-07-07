import React from 'react';
import {Card, CardBody, CardSubtitle, CardText} from 'reactstrap';

const Comment = ({comment}) => 
    <div> 
        <Card> 
            <CardBody> 
                <CardSubtitle> 
                    <span><h6> {comment.owner.username} </h6> </span>
                    <small className='text-muted' > {new Date(comment.createdDate).toDateString()} </small>
                </CardSubtitle>
                <CardText> {comment.text}  </CardText>
                <CardText> 
                    <span> reply {comment.replies.length} </span> 
                    <span> like {comment.likes} </span>
                </CardText>
            </CardBody>
                                   
        </Card>
    </div>

export default Comment;