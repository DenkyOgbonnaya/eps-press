import React from 'react';
import {Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';


const SearchField = ({setSearch, handleSearch}) => {

    return (
        <div> 
            <InputGroup>
                <Input placeholder = 'Search post..'  onChange = { e => setSearch(e.target.value)}  />
                <InputGroupAddon addonType='append' ><Button color='success' onClick = {() => handleSearch()} >Search</Button></InputGroupAddon>
            </InputGroup>
        </div>
    )
}
export default SearchField;