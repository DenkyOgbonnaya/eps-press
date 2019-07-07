import React, {useState} from 'react';
import { Button, FormGroup, Form, Label, Input } from 'reactstrap';
import {Link} from 'react-router-dom';
import './style.css';

const SignupForm = () => {
    const[userName, setUserName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = e => {}
    return (
        <div className = 'authForm'>
            <div className = 'form'>
            <h5> Create an account </h5>
                <Form onSubmit = {handleSubmit} >
                    <FormGroup>
                        <Label for ='userName'>User Name </Label> 
                        <Input type='text' name='userName' required placeholder = 'Enter userName' onChange={e => setUserName(e.target.value)} /> 
                    </FormGroup>
                    <FormGroup>
                        <Label for ='email'> Email </Label>
                        <Input name='email' required type='email' placeholder = 'Enter email' onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for ='password'> Password </Label>
                        <Input type = 'password' required name='password' placeholder = 'Enter password' onChange={e => setPassword(e.target.value)} />
                    </FormGroup >
                    <Button color='success'> Signup </Button> {" "} <Link to= '/login'> Already have an account? </Link>
                </Form>
            </div>
    
      </div>
    )
}
export default SignupForm;