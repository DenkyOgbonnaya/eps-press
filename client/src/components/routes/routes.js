import React, {lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import SignupForm from '../auth/signupForm';
import LoginForm from '../auth/loginForm';
import NewPost from '../post/newPost';
import About from '../includes/about';
import PrivateRoute from '../auth/privateRoute';
import Spinnar from '../includes/spinner';

const Home = lazy( () => import('../post/home'));
const PageDetails = lazy( () => import('../post/postDetails'));
const Profile = lazy( () => import('../members/profile'));
const EditPost = lazy( () => import('../post/editPost'));

const Routes = () => {
return(
<Suspense fallback= {<Spinnar /> } > 
        <Switch> 
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/post/:slug' component = {PageDetails} />
            <PrivateRoute exact path = '/edit/:slug' component = {EditPost} />
            <Route exact path = '/signup' component = {SignupForm} />
            <Route exact path = '/login' component = {LoginForm} />
            <PrivateRoute exact path = '/new' component = {NewPost} />
            <PrivateRoute exact path = '/:username/profile' component = {Profile} />
            <Route exact path = '/about' component = {About} />
        </Switch>
    </Suspense>
)
}
export default Routes;