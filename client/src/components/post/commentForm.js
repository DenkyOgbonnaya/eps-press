import React from 'react';
import {Form, Input, Button} from 'reactstrap';
import propTypes from 'prop-types';

const CommentForm = ({setText, handleSubmit}) =>
    <Form  onSubmit = {handleSubmit}  >
        <Input type='textarea' placeholder='type a comment'  onChange={e => setText(e.target.value)} /> <br />
        <Button color='success'> Send </Button>
    </Form>

CommentForm.propTypes = {
    setText: propTypes.func.isRequired,
    handleSubmit: propTypes.func.isRequired
}
export default CommentForm;