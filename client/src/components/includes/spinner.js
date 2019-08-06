import React from 'react';
import {Spinner} from 'reactstrap';

const Spinnar = () => {
    const style = {textAlign: 'center'}
    return(
        <div className='spinner' > 
            <Spinner color='success'/>
            <p> Loading... </p> 
        </div>
    )
}

export default Spinnar;