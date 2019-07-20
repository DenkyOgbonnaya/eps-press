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
        case actionTypes.LOG_OUT_USER :
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

        default : return state;
    }
}

export default authReducer;