import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const{authData} = useContext(AuthContext);
    
    return(
        <Route {...rest} render = {(props) => (
            authData.isAuthenticated ? <Component {...props} /> : <Redirect to = {{
                pathname: '/login',
                state: {from: props.location}
            }} />
        )} />
    )
}

export default PrivateRoute;