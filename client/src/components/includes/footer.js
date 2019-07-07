import React from 'react';

const AppFooter = () => {
    return(
        <div className= 'footer'> 
            
            <div > Made with <span role='img'>❤️‍</span> by 
                <a href='https://devdenky.herokuapp.com' style={{color: '#ccc'}}> Dennis Ogbonnaya </a> (18c1)
            </div>
              
            <div > 
                © {new Date().getFullYear()} Enviromental Protection and Sanitation CDS
            </div> 

        </div>

    )
}
export default AppFooter;