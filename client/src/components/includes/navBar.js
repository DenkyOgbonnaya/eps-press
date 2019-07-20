import React, {useContext, useState} from 'react';
import {Button, NavItem, Nav, Navbar, NavLink, NavbarBrand, NavbarToggler, DropdownMenu,
dropdownOpen, DropdownToggle, DropdownItem, Dropdown, Collapse,} from 'reactstrap';
import {withRouter, NavLink as RRNavlink} from 'react-router-dom';
import {AuthContext} from '../../context/authContext';
const NavBar = props => {
  const[isOpen, setIsOpen] = useState(false);
  const[dropdownOpen, setDropDownOpen] = useState(false);
  const{authData} = useContext(AuthContext);
  console.log(authData)

  return (
    <div>
      <Navbar color="dark" dark expand="xs">
        <NavbarBrand href="/"> <img src= {require('./logo_ic50.png')} alt='logo'/>EPSpress</NavbarBrand>
        <NavbarToggler onClick={ () => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
              <NavItem>
              { authData.isAuthenticated ?
              <Dropdown nav isOpen={dropdownOpen} toggle={() => setDropDownOpen(!dropdownOpen)} > 
            <DropdownToggle caret color='dark' >
              <img style= {{borderRadius: '50%', width:'40px'}} src={require('../post/Denkys.jpg')} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header> Dashboard  </DropdownItem>
              <DropdownItem onClick = {()=> props.history.push('/new')} >New Post </DropdownItem>
              <DropdownItem onClick = {()=> props.history.push('/me')} >Profile</DropdownItem>
              <DropdownItem onClick = {()=> props.history.push('/about')} >About</DropdownItem>
              <DropdownItem divider />
              <DropdownItem  > Logout </DropdownItem>
            </DropdownMenu>
          </Dropdown>
             :
             <Nav className="ml-auto" navbar>
               <NavItem>
               <NavLink to='/signup' tag={RRNavlink} > <Button size='sm' outline >Get Started </Button> </NavLink>
             </NavItem>
             <NavItem>
               <NavLink to='/login' tag={RRNavlink} > Login </NavLink>
             </NavItem>
               <NavItem>
               <NavLink to='/about' tag={RRNavlink}  > About </NavLink>
             </NavItem>
           </Nav>
            } 
              
            </NavItem> 
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(NavBar);