import React, {useContext, useState} from 'react';
import { Button, FormGroup ,Form, Label, Input } from 'reactstrap';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/authContext';
import {login} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import {Alert} from 'reactstrap';
import Spinner from '../includes/spinner';

import './style.css';

const LoginForm = props => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[isError, setIsError] = useState(false);
    const[loggingIn, setLogingIn] = useState(false);

    const{authData, dispatchAuth} = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();

        const {from} = props.location.state || {from : {pathName: '/' }};
        setLogingIn(true);

        login({username, password}, dispatchAuth)
        .then(data => {
            if(data && data.status === 'success'){
                
                props.history.push(from.pathname || from.pathName);
            }else {
                setIsError(true);
            }
            setLogingIn(false);
        })
    }
    return(
        <div className='auth'>
            <img src='/favicon.ico' alt='logo' /> 
        <div className = 'authForm'>
            
            
        <div className = 'form'>
            <Alert color='danger' isOpen={isError} > {authData.authError} </Alert>
                <h5>Login  </h5> <br />
            {loggingIn && <Spinner color='success' />}

            <Form className='inputs'  onSubmit = {handleSubmit}  > 
                <FormGroup>
                    <Label for= 'username'> Username </Label>
                    <Input name='username' required placeholder = 'Enter username' onChange={e => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for ='password'>Password </Label>
                    <Input type = 'password' required name='password' placeholder = 'Enter password' 
                    onChange={e => setPassword(e.target.value)} />
                </FormGroup> <br />
                <Button color='success'> login </Button> {" "} <Link to= '/signup'> Don't have an account? </Link> <br />
            </Form>
        </div>
</div>
</div>
    )
}
export default withRouter(LoginForm);