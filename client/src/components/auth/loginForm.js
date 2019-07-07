import React, {useState} from 'react';
import { Button, FormGroup ,Form, Label, Input } from 'reactstrap';
import {Link} from 'react-router-dom';
import './style.css';

const LoginForm = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = e => {

    }
    return(
        <div className = 'authForm'>
            
        <div className = 'form'>
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
export default LoginForm;