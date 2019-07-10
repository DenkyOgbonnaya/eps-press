import React from 'react';
import {Form,Label, Input, Button} from 'reactstrap';
import './style.css'

const NewPost = () => {
    return (
        <div> 
            <h4>Start a new post </h4>
            <div className='postForm' > 
                <Form className='form'> 
                    <Label for='title'> Title </Label>
                    <Input name='title' placeholder= 'enter post title' /> <br />
                    <Label for='content'> Content </Label>
                    <Input type='textarea' rows='9' name='content'  placeholder= 'type a post' /> <br />
                    <Label for='image'> Select a picture (optional) </Label>
                    <Input type="file" />  <br />
                    <Button color='success'> Submit </Button>
                </Form>
            </div>
        </div>
    )
}

export default NewPost;