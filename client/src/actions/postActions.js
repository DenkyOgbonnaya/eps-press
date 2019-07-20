import axios from 'axios';
import actions from './actionTypes';

export const addPost = (post, dispatch) => {
    dispatch({
        type: actions.ADD_POST<
        booK
    });
    axios.post('api/posts', {})
}