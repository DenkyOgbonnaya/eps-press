import React, {useEffect, useState, useContext, useRef} from 'react';
import {Container, Row, Col, Table, Button} from 'reactstrap';
import './style.css';
import PostFeeds from '../post/postFeeds';
import { getUserProfile } from '../../actions/authActions';
import Can from '../includes/can';
import { AuthContext } from '../../context/authContext';
import { changeAvatar } from '../../actions/authActions';
import Paginate from '../includes/pagination';
import Spinnar from '../includes/spinner';

const Profile = props => {
    const[userProfile, setUserProfile] = useState({});
    const{authData, dispatchAuth} = useContext(AuthContext);
    const fileInput = useRef(null);
    const{currentUser} = authData;
    const[currentPage, setCurrentPage] = useState(1);
    const[limit] = useState(5);
    const[isUploading, setIsUploading]= useState(false);
    const[isLoading, setIsLoading] = useState(true);
    const{posts} = userProfile
    const username = props.match.params.username;

    useEffect( () => {
        getUserProfile(username)
        .then(data => {
            if(data.status === 'success'){
                setUserProfile(data.userProfile);
                setIsLoading(false);
            }
        })
    }, [username])

    const handleAvaterChange = e => {
        let formdata = new FormData();
        setIsUploading(true);

        formdata.set('image', e.target.files[0]);
        const isCurrentUser =   currentUser._id === userProfile._id; 
        const userId = isCurrentUser ? currentUser._id : userProfile._id

        changeAvatar(userId, formdata, dispatchAuth, isCurrentUser)
        .then(data => {
            if(data && data.status !== 'success'){
                alert(data.message)
            }else{
                setUserProfile(Object.assign({}, userProfile, {avatar: data.avatar}));
                setIsUploading(false);
            }
        })
    }
    const handleBtnClick = () => {
        
        fileInput.current.click();
    }
    const handlePageChange = number => {
        setCurrentPage(number);
    }
    const currentPosts = () => {
        const indexOfLastTodo = currentPage * limit;
        const indexOfFirstTodo = indexOfLastTodo - limit;
        return posts.slice(indexOfFirstTodo, indexOfLastTodo);
    }
    if(isLoading)
        return <Spinnar />
    return (
        <div className = 'profile-container'> 
            <h3>Profile  </h3>
            <Container > 
                <Row> 
                    <Col xs='12' md='4' className='profile-col'> 
                        <div className ='profile-details'>
                            <img src={userProfile.avatar ? userProfile.avatar : '/images/defavatar.png'} alt='profile pix' /> <br />
                            {isUploading && <span id='spinner'> uploading avatar... </span>}
                            <Can 
                                role = {currentUser.isAdmin}
                                perform='profile:edit'
                                data = {{
                                    currentUserId: currentUser._id,
                                    profileOwnerId: userProfile._id
                                }}
                                yes = { () => 
                                <div> 
                                    <input type='file' accept='image/*' ref={fileInput} onChange={handleAvaterChange} />
                                    <Button className='edit-profile-btn' size='sm' color='success' onClick={ handleBtnClick} > Change avatar </Button>
                                </div>}
                            />
                            <Table size='sm' > 
                            <tbody> 
                                <tr> 
                                    <td>Username </td>
                                    <td> {userProfile.username} </td>
                                </tr>
                                <tr> 
                                    <td>Email </td>
                                    <td>{userProfile.email}</td>
                                </tr>
                                <tr> 
                                    <td>Member since </td>
                                    <td>{new Date(userProfile.createdAt).toDateString()}</td>
                                </tr>
                            </tbody>
                        </Table>
                         </div>
                         <br />
                    </Col>
                    <Col xs='12' md='7'>
                        <h3>Posts </h3>
                        {
                            !posts || posts.length <=0  ? <div> no posts to display </div> :  
                            <PostFeeds posts = {currentPosts()} />
                        }
                    </Col>
                    {
                        userProfile.posts &&
                        <Paginate 
                            pages = {Math.ceil(posts.length / limit)}
                            currentPage = {currentPage}
                            handlePageChange = {handlePageChange}
                        />
                    }
                    
                </Row>
                <Row> 
                    
                </Row>
            </Container>
        </div>
    )
}

export default Profile;