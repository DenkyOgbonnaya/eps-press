import actionTypes from '../actions/actionTypes';

const authReducer = (state, action) => {
    switch(action.type){
        case actionTypes.SIGNUP_USER : 
            return {
                ...state,
                currentUser: action.currentUser,
                isAuthenticated: true
        }
        case actionTypes.LOGIN_USER :
            return {
                ...state,
                currentUser : action.currentUser,
                isAuthenticated : true
            }
        case actionTypes.LOGOUT_CURRENT_USER :
            return {
                ...state,
                currentUser : {},
                isAuthenticated : false
            }
        case actionTypes.ERROR : 
            return {
                ...state,
                currentUser : {},
                isAuthenticated : false,
                authError: action.message
            }
        case actionTypes.CHANGE_AVATAR :
        console.log(action);
        
            return {
                ...state,
                currentUser: Object.assign({}, state.currentUser, {avatar: action.avatar})
            }

        default : return state;
    }
}

export default authReducer;