import actionTypes from '../actions/actionTypes';
const postReducer = (state, action) => {
    switch(action.type){
        case actionTypes.GET_POSTS :
        return {
            ...state,
            posts: action.data.posts,
            currentPage: action.data.page,
            pages: action.data.pages,
            isLoading: false
        }
        case actionTypes.ADD_POST :
            return{
                ...state,
                posts: state.posts.concat(action.post)
            }
            case actionTypes.GET_POST :
            return {
                ...state,
                post: action.post,
                isLoading: false
            }
        case actionTypes.SEARCH_POST :
            return{
                ...state,
                post: action.post.data,
                currentPage: action.post.page,
                pages: action.post.pages
            }
        case actionTypes.EDIT_POST :
        return{
            ...state,
            post: Object.assign({}, state.post, action.post )
        }
        case actionTypes.DELETE_POST :
        return{
            ...state,
            posts: state.posts.filter( post => post._id !== action.postId)
        }
        case actionTypes.ERROR :
        return {
            ...state,
            postError: action.message
        }
        case actionTypes.LIKE_POST :
        const{post} = state;
        return {
            ...state,
            post: Object.assign({}, post, {likes: post.likes+1} ) 
        }
        default : return state;
    }
    
}

export default postReducer;