import React, {useState, useContext, useRef} from 'react';
import {Container, Row, Col, Card, CardBody, CardSubtitle, CardText} from 'reactstrap';
import CommentForm from './commentForm';
import {PostContext} from '../../context/postContext';
import {AuthContext} from '../../context/authContext';
import {postReply} from '../../actions/postActions';
import { fromNow } from './helper';
import propTypes from 'prop-types';

const Replies = ({comment}) => {
    const[reply, setReply] = useState('');
    const{dispatch} = useContext(PostContext);
    const{authData} = useContext(AuthContext);
    const bottom = useRef(null);
    
    const submitReply = e => {
        const currentUser = authData.currentUser._id;
        e.preventDefault();
        
        const replyData = {
            text:reply,
            owner: currentUser,
        }
        postReply(replyData, comment, dispatch)
        .then( () => {
            bottom.current.scrollIntoView({behavior: 'smooth'});
        })
        
    }
    return(
        <div> 
            <h6>reply comment </h6>
            <Container> 
                <Row> 
                    <Col xs='11'> 
                        <CommentForm handleSubmit= {submitReply} setText= {setReply} />
                        <br />
                    </Col>
                </Row>
                <Row> 
                    {
                        comment.replies.length > 0 && comment.replies.map( reply => 
                            <Col xs='11' key={reply._id}> 
                                <Card> 
                                    <CardBody> 
                                        <CardSubtitle> 
                                            <small> <b>{reply.owner.username}</b> </small>
                                            <small className='text-muted' > {fromNow(reply.createdDate)} </small>
                                        </CardSubtitle>
                                        <CardText> {reply.text}  </CardText>
                                    </CardBody>
                                   
                                </Card>
                                <br />
                            </Col>
                        )
                    } 
                </Row>
            </Container>
            
            <span ref={bottom} > </span>
        </div>
    )
}
Replies.propTypes = {
    comment: propTypes.object.isRequired
}
export default Replies;
    