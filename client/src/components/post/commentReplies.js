import React, {useState} from 'react';
import {Container, Row, Col, Card, CardBody, CardSubtitle, CardText, Form, Input, Button} from 'reactstrap';
import CommentForm from './commentForm';

const Replies = ({replies}) => {
    const[reply, setReply] = useState('');
    return(
        <div> 
            <h6>reply comment </h6>
            <Container> 
                <Row> 
                    <Col xs='11'> 
                        <CommentForm />
                        <br />
                    </Col>
                </Row>
                <Row> 
                    {
                        replies.length > 0 && replies.map( reply => 
                            <Col xs='11' key={reply._id}> 
                                <Card> 
                                    <CardBody> 
                                        <CardSubtitle> 
                                            <small> <b>{reply.owner.username}</b> </small>
                                            <small className='text-muted' > {new Date(reply.createdDate).toDateString()} </small>
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
            
            {

            }
        </div>
    )
}
export default Replies;
    