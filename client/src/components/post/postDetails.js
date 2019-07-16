import React, {useState,  useEffect} from 'react';
import Comment from './comment'
import{Container, Row, Col, Card, CardFooter, CardHeader, CardBody, CardText, CardSubtitle, CardTitle} from 'reactstrap';
import CommentForm from './commentForm';
import './style.css';

const postt ={
    _id: 2, title: 'welcome to eps-press', content: 'Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
    likes: 200, createdDate: Date.now(), slug: 'welcome-to-eps-press', owner: {username: 'Belly'}, comments: [
        {_id: 1, likes: 5, createdDate: Date.now(), text: 'wow! nice one Denky', owner: {username:'Chimex'}, replies:[
            {_id: 1, owner: {username: 'mike'}, text: 'yes i am fine', createdDate: Date.now()},
            {_id: 2, owner: {username: 'usman'}, text: 'great eps', createdDate: Date.now()},
            {_id: 3, owner: {username: 'seun'}, text: 'naso we be the best', createdDate: Date.now()}
        
        ]},
        {_id: 2, likes: 2, createdDate: Date.now(), text: 'nice! nice one Denky', owner: {username:'Presido'}, replies:[
            {_id: 1, owner: {username: 'mike'}, text: 'yes i am fine', createdDate: Date.now()},
            {_id: 2, owner: {username: 'usman'}, text: 'great eps', createdDate: Date.now()},
            {_id: 3, owner: {username: 'seun'}, text: 'naso we be the best', createdDate: Date.now()}
        ]},
        {_id: 3, likes: 0, createdDate: Date.now(), text: 'TRASH!!!', owner: {username:'Badbelle'}, replies:[
            {_id: 1, owner: {username: 'mike'}, text: 'yes i am fine', createdDate: Date.now()},
            {_id: 2, owner: {username: 'usman'}, text: 'great eps', createdDate: Date.now()},
            {_id: 3, owner: {username: 'seun'}, text: 'naso we be the best', createdDate: Date.now()}
        ]}
    ]
}
const PostDetails = props => {
    const[post, setPost] = useState({});
    const[isOpen, setIsOpen] = useState(false);

    useEffect( () => {
        console.log(props.match.params.slug)
        setPost(
            {
                _id: 2, title: 'welcome to eps-press', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 200, slug: 'welcome-to-eps-press', owner: {username: 'Belly'}, comments: [
                    {_id: 1, likes: 5, text: 'wow! nice one Denky', owner: {username:'Chimex'}, replies:[1,6,8]},
                    {_id: 2, likes: 2, text: 'nice! nice one Denky', owner: {username:'Presido'}, replies:[1,8, 3,6,8]},
                    {_id: 3, likes: 0, text: 'TRASH!!!', owner: {username:'Badbelle'}, replies:[
                        {_id: 1, owner: {username: 'mike'}, text: 'yes i am fine', createdDate: Date.now()},
                        {_id: 2, owner: {username: 'usman'}, text: 'great eps', createdDate: Date.now()},
                        {_id: 3, owner: {username: 'seun'}, text: 'naso we be the best', createdDate: Date.now()}
                    ]}
                ]
            }
        )
    }, [])
    return (
        <div className='post'> 
            <div className='post-author'> 
                <span> <img src={require('./Denkys.jpg')} alt='author' /> </span>  <br />
                <small text-muted> By {postt.owner.username} | {" "} {new Date(postt.createdDate).toDateString()} </small>
            </div>
            <Container> 
                <Row> 
                    <Col xs='12' > 
                        <div className='post-content'> 
                            
                            <h2> {postt.title.toUpperCase()} </h2>
                            <p> {postt.content} </p>
                            <span onClick = {() => setIsOpen(!isOpen)} > {isOpen ? 'close reply' : 'Reply'} </span> {" "}
                            <span> Like {postt.likes} </span> {" "}
                            <span> Edit </span> {" "}
                            <span> Delete  </span> {" "}
                        </div>
                        <br />
                        <h3>Post Replies </h3>
                        {isOpen && <CommentForm />}
                        <hrv/>
                    </Col>
                </Row>
                <Row> 
                    {postt.comments.length > 0 && postt.comments.map(comment => 
                        <Col key= {comment._id} xs='12'> 
                            <Comment comment= {comment} />
                            <br />
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}
export default PostDetails;