import './components/includes/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'draft-js/dist/Draft.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import {PostContextProvider} from './context/postContext';

ReactDOM.render(
    <Router>
        <div> 
            <AuthContextProvider> 
                <PostContextProvider> 
                    <App />
                </PostContextProvider>
            </AuthContextProvider>
            
        </div> 
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
