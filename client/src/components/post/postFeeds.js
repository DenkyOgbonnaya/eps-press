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
                                            <small className='text-muted'>By {post.owner.username} </small>  {" "}
                                            <small className='text-muted'> {new Date(post.createdDate).toDateString()} </small>
                                        </CardSubtitle>
                                        <CardText> 
                                            {JSON.parse(post.content).blocks[0].text.substring(0, 280)}...
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