import React, {useContext, useState} from 'react';
import { Button, FormGroup ,Form, Label, Input } from 'reactstrap';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/authContext';
import {login} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import {Alert} from 'reactstrap';
import './style.css';

const LoginForm = props => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[isError, setIsError] = useState(false);

    const{authData, dispatch} = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();

        login({username, password}, dispatch)
        .then(data => {
            if(data && data.status === 'success'){
                props.history.push('/');
            }else {
                setIsError(true);
            }
        })
    }
    return(
        <div className = 'authForm'>
            
        <div className = 'form'>
            <Alert color='danger' isOpen={isError} > {authData.authError} </Alert>
            <h5>Login  </h5> <br />
            <Form onSubmit = {handleSubmit}  > 
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
    )
}
export default withRouter(LoginForm);