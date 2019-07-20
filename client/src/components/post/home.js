import React, {useState, useEffect, useContext} from 'react';
import PostFeeds from './postFeeds';
import SearchField from '../includes/searchField';
import {AuthContext} from '../../context/authContext';
import {verifyToken} from '../../actions/authActions';

const Home = () => {
    const[posts, setPosts] = useState([]);
    const{dispatch} = useContext(AuthContext);

    useEffect( ()=> {
        const authToken = localStorage.authToken;
        if(authToken)
            verifyToken(authToken, dispatch);
    }, [])
    useEffect( () => {
        setPosts([
            {
                _id: 1, title: 'Welcome to eps-press', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 500, slug: 'Welcome-to-eps-press', createdDate: Date.now(),  owner: 'Denky', comments: [1, 2, 3, 4, 5, 6, 7, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            },
            {
                _id: 2, title: 'How to keep your enviroment cleen', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 200, slug: 'How-to-keep-your-enviroment-cleen', createdDate: Date.now(), owner: 'Belly', comments: [1, 2, 3,3,4, 4, 5, 6, 7, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            },
            {
                _id: 3, title: 'Sentisization exize at dasa', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 50, slug:'Sentisization-exize-at-dasa',   createdDate: Date.now(), owner: 'Nwakali', comments: [1, 2, 3, 4, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            }
        ])
    }, []);
    return(
        <div> 
            <p> The official blogging platform for the EPS CDS group Lafia. <i>...saving the environment! </i> </p>
            <hr />
            <SearchField />
            <br />
            <PostFeeds posts = {posts} />
        </div>
    )
}
export default Home;