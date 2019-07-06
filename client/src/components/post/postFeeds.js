import React from 'react';
import {Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';

const PostFeeds = ({posts}) => {
    return (
        <div> 
            <Container> 
                <Row> 
                    {
                        posts.map(post => 
                            <Col key = {post._id} xs='12' > 
                                <Card width = '100%' > 
                                    <CardBody> 
                                        <CardTitle> <h4> {post.title} </h4> </CardTitle>
                                        <CardSubtitle> <small className='text-muted'>By {post.owner} </small>  </CardSubtitle>
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
export default PostFeeds;