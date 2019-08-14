import React, {useEffect, useState} from 'react';
import {Table, Button, Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import { getUsers, makeAdmin } from '../../actions/authActions';
import Paginate from '../includes/pagination';
import Spinner from '../includes/spinner';

const Users = () => {
    const[loading, setLoading] = useState(true);
    const[users, setUsers] = useState([])
    const[currentPage, setCurrentPage] = useState(1);
    const[pages, setPages] = useState(1);

    useEffect( () => {
        getUsers(1, 20)
        .then(data => {
            if(data && data.status === 'success'){
                setUsers(data.users);
                setPages(data.pages);
                setCurrentPage(data.page)
                setLoading(false);
            }
        })
    }, []);
    const handlePageChange = (pageNum) => {
        setLoading(true);

        getUsers(pageNum, 20)
        .then(data => {
            if(data && data.status === 'success'){
                setUsers(data.users);
                setPages(data.pages);
                setCurrentPage(data.page)
                setLoading(false);
            }
        })
    }
    const handleAdmin = (e, userId) => {
            makeAdmin(userId)
            .then(data => {
                setUsers(users.map(user => user._id === userId ? Object.assign({}, user, {isAdmin: data.isAdmin}) : user ))
            })
    }
    return(
        <div className='users'> 
            <Container>
                <Row>
                    <Col>
                        {loading ? <Spinner /> : 
                        <Table responsive size='sm' className ='table' > 
                            <thead className='thead'> 
                            <tr> 
                            <th>  </th>
                                <th>UserName </th>
                                <th>Email </th>
                                <th>status </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                            users.map(user => 
                            <tr key= {user._id}> 
                                <td> <img src={user.avatar || '/images/defavatar.png'} style={{width:'50px', height:'50px'}} alt='avatar'/> </td>
                                <td> {user.username} </td>
                                <td> {user.email} </td>
                                <td> {user.isAdmin === 0 ? 'member' : 'admin'} </td>
                                <td> <Link to= {`/${user.username}/profile`}> View profile </Link> </td>
                                <td> <Button size='sm' color='success'  disabled={user.isAdmin === 1 ? true : false} onClick= {e => handleAdmin(e, user._id)}>make admin</Button> </td>
                            </tr>
                            )
                            }
                            </tbody>
                        </Table>
                        }
                </Col>
            </Row>
        </Container>
        <Paginate
            pages = {pages}
            currentPage = {currentPage}
            handlePageChange = {handlePageChange}
         />
    </div>
    
    )
}

export default Users;