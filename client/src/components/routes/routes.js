import React, {lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import SignupForm from '../auth/signupForm';
import LoginForm from '../auth/loginForm';
import NewPost from '../post/newPost';


const Home = lazy( () => import('../post/home'));
const PageDetails = lazy( () => import('../post/postDetails'));

const Routes = () => {
return(
    <Suspense fallback= 'loading..' > 
        <Switch> 
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/post/:slug' component = {PageDetails} />
            <Route exact path = '/signup' component = {SignupForm} />
            <Route exact path = '/login' component = {LoginForm} />
            <Route exact path = '/new' component = {NewPost} />
        </Switch>
    </Suspense>
)
}
export default Routes;