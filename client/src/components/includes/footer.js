import React from 'react';
import {Link} from 'react-router-dom';

const AppFooter = () => {
    return(
        <div className= 'footer'> 
            <div id='about'> <Link style = {{color: '#ccc'}} to='/about'> About </Link> </div>
            <div > Made with <span role='img'>❤️‍</span> by 
                <a href='https://devdenky.herokuapp.com' style={{color: '#ccc', textDecoration: 'underline'}}> Dennis Ogbonnaya </a> (18C1) 
                <a href ='https://github.com/DenkyOgbonnaya/eps-press'> GitHub(code) </a>
            </div>
              
            <div > 
                © {new Date().getFullYear()} Enviromental Protection and Sanitation Club
            </div> 

        </div>

    )
}
export default AppFooter;