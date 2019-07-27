import React, {useEffect, useContext} from 'react';
import {Container, Row, Col, Table, Button} from 'reactstrap';
import './style.css';
import PostFeeds from '../post/postFeeds';
import { getUserPost } from '../../actions/postActions';
import { AuthContext } from '../../context/authContext';
import { PostContext } from '../../context/postContext';

const Profile = () => {
    const{authData} = useContext(AuthContext);
    const{postData, dispatch} = useContext(PostContext);

    useEffect( () => {
        getUserPost(authData.currentUser._id, dispatch);
        
    }, [])
    return (
        <div className = 'profile-container'> 
            <h3>Your Profile  </h3>
            <Container > 
                <Row> 
                    <Col xs='12' md='4' className='profile-col'> 
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
                        <h3>Posts </h3>
                        {
                            !postData.posts.length > 0 ? <div> no posts to display </div>:  
                            <PostFeeds posts = {postData.posts} />
                        }
                    </Col>
                </Row>
                <Row> 
                    
                </Row>
            </Container>
        </div>
    )
}

export default Profile;