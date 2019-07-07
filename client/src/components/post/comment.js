import React, {useState} from 'react';
import Replies from './commentReplies';
import {Card, CardBody, CardSubtitle, CardText} from 'reactstrap';

const Comment = ({comment}) => {
    const[isOpen, setIsOpen] = useState(false);

    return(
        <div> 
            <Card> 
                <CardBody> 
                    <CardSubtitle> 
                        <span><b> {comment.owner.username} </b> </span>
                        <small className='text-muted' > {new Date(comment.createdDate).toDateString()} </small>
                    </CardSubtitle>
                    <CardText> {comment.text}  </CardText>
                    <CardText> 
                        <small onClick= {() => setIsOpen(!isOpen)}  > {isOpen ? 'close reply' : 'reply'} {comment.replies.length} </small>
                        <small> like {comment.likes} </small>
                    </CardText>
                </CardBody>             
            </Card>
            {
                isOpen && <Replies replies={comment.replies} />
            }
        </div>
    )
}

export default Comment;