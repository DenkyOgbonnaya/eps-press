import React, {useState, useEffect} from 'react';
import PostFeeds from './postFeeds';

const Home = () => {
    const[posts, setPosts] = useState([]);

    useEffect( () => {
        setPosts([
            {
                _id: 1, title: 'Welcome to eps-press', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 500, owner: 'Denky', comments: [1, 2, 3, 4, 5, 6, 7, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            },
            {
                _id: 2, title: 'How to keep your enviroment cleen', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 200, owner: 'Belly', comments: [1, 2, 3,3,4, 4, 5, 6, 7, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            },
            {
                _id: 3, title: 'Sentisization exize at dasa', content: 'Hi, welcome to the very first post on eps press, the official blogging platform for the eps cds group Lafia',
                likes: 50, owner: 'Nwakali', comments: [1, 2, 3, 4, 5, 4, 3, 3, 4, 4, 4,5, 5, 5]
            }
        ])
    }, []);
    return(
        <div> 
            <p> The official blogging platform for the EPS CDS group Lafia. <i>...saving the environment! </i> </p>
            <hr />
            <PostFeeds posts = {posts} />
        </div>
    )
}
export default Home;