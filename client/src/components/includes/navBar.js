import React, {useContext, useState} from 'react';
import {Button, NavItem, Nav, Navbar, NavLink, NavbarBrand, NavbarToggler, DropdownMenu,
dropdownOpen, DropdownToggle, DropdownItem, Dropdown, Collapse,} from 'reactstrap';
import {withRouter, NavLink as RRNavlink} from 'react-router-dom';
import {AuthContext} from '../../context/authContext';
import { logout } from '../../actions/authActions';
const NavBar = props => {
  const[isOpen, setIsOpen] = useState(false);
  const[dropdownOpen, setDropDownOpen] = useState(false);
  const{authData, dispatchAuth} = useContext(AuthContext);

  const handleLogout = () => {
    logout(dispatchAuth);
  }
  const gotoHome = e => {
    e.preventDefault();
    props.history.push('/');
  }

  return (
    <div>
      <Navbar color="dark" dark expand="xs">
        <NavbarBrand href='/' onClick= {gotoHome}> <img src= {require('./logo_ic50.png')} alt='logo'/>EPSpress</NavbarBrand>
        <NavbarToggler onClick={ () => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
              <NavItem>
              { authData.isAuthenticated ?
              <Dropdown nav isOpen={dropdownOpen} toggle={() => setDropDownOpen(!dropdownOpen)} > 
            <DropdownToggle caret color='dark' >
              <img style= {{borderRadius: '50%', width:'40px', height:'40px'}} src={authData.currentUser.avatar ? authData.currentUser.avatar : '/images/defavatar.png'} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header> Dashboard  </DropdownItem>
              <DropdownItem onClick = {()=> props.history.push('/new')} >New Post </DropdownItem>
              <DropdownItem onClick = {()=> props.history.push(`/${authData.currentUser.username}/profile`)} >Profile</DropdownItem>
              <DropdownItem onClick = {()=> props.history.push('/about')} >About</DropdownItem>
              <DropdownItem divider />
              <DropdownItem  onClick={ handleLogout} > Logout </DropdownItem>
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