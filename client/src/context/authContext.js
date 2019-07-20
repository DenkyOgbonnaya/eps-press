import React, {useReducer} from 'react';
import authReducer from '../reducers/authReducer';

export const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
    const[authData, dispatch] = useReducer(authReducer, {
        currentUser: {},
        isAuthenticated: false,
        authError: '',
    })
    return (
        <AuthContext.Provider value= {{authData, dispatch}}> 
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider