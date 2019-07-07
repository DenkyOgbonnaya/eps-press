import React from 'react';
import {Form, Input, Button} from 'reactstrap';

const CommentForm = ({setText, handleSubmit}) =>
    <Form  onSubmit = {handleSubmit}  >
        <Input type='textarea' placeholder='type a comment'  onChange={e => setText(e.target.value)} /> <br />
        <Button> Send </Button>
    </Form>
export default CommentForm;