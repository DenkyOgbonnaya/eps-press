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
        const{likes} = post;
        const{inc, likers} = action.payLoad;
        return {
            ...state,
            post: Object.assign({}, post, {likes: likes+inc, likers} ) 
        }
        case actionTypes.UNLIKE_POST :
        const postLikes = state.post.likes;
        const{payLoad} = action;
        return {
            ...state,
            post: Object.assign({}, state.post, {
                likes: postLikes-payLoad.dec, 
                likers: payLoad.likers
            } ) 
        }
        case actionTypes.COMMENT_POST : {
        return {
            ...state,
            post: Object.assign({}, state.post, {
                comments: state.post.comments.concat(action.comment)
            })
        }
        }
        case actionTypes.LIKE_COMMENT : {
            const{post} = state;
            const{comments} = post;
            const{inc, likers, comment} = action.payLoad;

            let updatedComment = comments.map(comnt => comnt._id === comment._id ?
            {...comment, ...{likes: comnt.likes+inc, likers}} : comnt )
            return {
                ...state,
                post: Object.assign({}, post, {comments: updatedComment})
            }
        }
        case actionTypes.UNLIKE_COMMENT : {
            const{post} = state;
            const{comments} = post;
            const{dec, likers, comment} = action.payLoad;

            let updatedComment = comments.map(comnt => comnt._id === comment._id ?
                {...comment, ...{likes: comnt.likes-dec, likers}} : comnt )
            return {
                ...state,
                post: Object.assign({}, post, {comments: updatedComment})
            }
        }
        default : return state;
    }
    
}

export default postReducer;