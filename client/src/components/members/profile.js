import React, {useEffect, useContext, useRef} from 'react';
import {Container, Row, Col, Table, Button, Input} from 'reactstrap';
import './style.css';
import PostFeeds from '../post/postFeeds';
import { getUserPost } from '../../actions/postActions';
import { AuthContext } from '../../context/authContext';
import { PostContext } from '../../context/postContext';
import { changeAvatar } from '../../actions/authActions';

const Profile = () => {
    const{authData, dispatchAuth} = useContext(AuthContext);
    const{postData, dispatch} = useContext(PostContext);
    const fileInput = useRef(null);
    const{currentUser} = authData;

    useEffect( () => {
        getUserPost(currentUser._id, dispatch);
        
    }, [])
    const handleAvaterChange = e => {
        let formdata = new FormData();

        formdata.set('image', e.target.files[0]);
        
        changeAvatar(currentUser._id, formdata, dispatchAuth)
        .then(data => {
            if(data && data.status !== 'success'){
                alert(data.message)
            }
        })
    }
    const handleBtnClick = () => {
        
        fileInput.current.click();
    }
    return (
        <div className = 'profile-container'> 
            <h3>Your Profile  </h3>
            <Container > 
                <Row> 
                    <Col xs='12' md='4' className='profile-col'> 
                        <div className ='profile-image'>
                            <img src={currentUser.avatar ? currentUser.avatar : require('./Denkys.jpg')} alt='profile pix' /> <br />
                            <input type='file' accept='image/*' ref={fileInput} onChange={handleAvaterChange} />
                            <Button className='edit-profile-btn' size='sm' color='success' onClick={ handleBtnClick} > Change profile </Button>
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