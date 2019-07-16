import React, {useState} from 'react';
import {Container, Row, Col, Table, Button} from 'reactstrap';
import './style.css';
import PostFeeds from '../post/postFeeds';

const Profile = () => {
    const[posts, setPost] = useState(
        [
            {
                _id: 1, title: 'Welcome to eps-press', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 500, slug: 'Welcome-to-eps-press', createdDate: Date.now(),  owner: 'Denky', comments: [1, 2, 3, 4, 5, 6, 7, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            },
            {
                _id: 2, title: 'How to keep your enviroment cleen', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 200, slug: 'How-to-keep-your-enviroment-cleen', createdDate: Date.now(), owner: 'Belly', comments: [1, 2, 3,3,4, 4, 5, 6, 7, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            },
            {
                _id: 3, title: 'Sentisization exize at dasa', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 50, slug:'Sentisization-exize-at-dasa',   createdDate: Date.now(), owner: 'Nwakali', comments: [1, 2, 3, 4, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            }
        ]
    )
    return (
        <div className = 'profile-container'> 
            <h3>Your Profile  </h3>
            <Container > 
                <Row> 
                    <Col xs='12' md='4'> 
                        <div className ='profile-image'>
                            <img src={require('./Denkys.jpg')} alt='profile pix' /> <br />
                            <Button className='edit-profile-btn' size='sm' color='success' > Change profile </Button>
                            <Table size='sm' > 
                            <tbody> 
                                <tr> 
                                    <td>Username </td>
                                    <td>Denky </td>
                                </tr>
                                <tr> 
                                    <td>Email </td>
                                    <td>Denky.com </td>
                                </tr>
                            </tbody>
                        </Table>
                         </div>
                         <br />
                    </Col>
                    <Col xs='12' md='7'>
                        <h3>Your Posts </h3>
                        <PostFeeds posts = {posts} />
                    </Col>
                </Row>
                <Row> 
                    
                </Row>
            </Container>
        </div>
    )
}

export default Profile;