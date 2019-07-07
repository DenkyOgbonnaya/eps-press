import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';

const PostFeeds = (props) => {
    return (
        <div> 
            <Container> 
                <Row> 
                    {
                        props.posts.length > 0 && props.posts.map(post => 
                            <Col key = {post._id} xs='12' > 
                                <Card onClick = { () => props.history.push(`/post/${post.slug}`) } > 
                                    <CardBody> 
                                        <CardTitle> <h4> {post.title} </h4> </CardTitle>
                                        <CardSubtitle> 
                                            <small className='text-muted'>By {post.owner} </small>  {" "}
                                            <small className='text-muted'> {new Date(post.createdDate).toDateString()} </small>
                                        </CardSubtitle>
                                        <CardText> {post.content.substring(0, 200)}... </CardText>
                                        <CardText > 
                                            <small className='text-muted' >Comments: {post.comments.length} </small> 
                                            <small className='text-muted'>Likes: {post.likes} </small>
                                        </CardText>

                                    </CardBody>
                                </Card>
                                <br />
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </div>
    )
}
export default withRouter(PostFeeds);