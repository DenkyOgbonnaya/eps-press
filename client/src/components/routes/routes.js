import React, {lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';

const Home = lazy( () => import('../post/home'));
const PageDetails = lazy( () => import('../post/postDetails'));

const Routes = () => {
return(
    <Suspense fallback= 'loading..' > 
        <Switch> 
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/post/:slug' component = {PageDetails} />
        </Switch>
    </Suspense>
)
}
export default Routes;