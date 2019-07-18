import React, {useState} from 'react';
import {Link as RRNavlink, withRouter} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const NavBar = props => {
  const[isOpen, setIsOpen] = useState(false);
  const[dropdownOpen, setDropDownOpen] = useState(false);

  return (
    <div>
      <Navbar color="dark" dark expand="xs">
        <NavbarBrand href="/"> <img src= {require('./logo_ic50.png')} alt='logo'/>EPSpress</NavbarBrand>
        <NavbarToggler onClick={ () => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
              <NavItem>
              { true ?
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
               <NavLink to='/login' tag={RRNavlink} > Login </NavLink>
             </NavItem>
               <NavItem>
               <NavLink to='/signup' tag={RRNavlink} > Signup </NavLink>
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