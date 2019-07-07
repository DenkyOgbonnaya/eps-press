import React, {useState} from 'react';
import {Link as RRNavlink} from 'react-router-dom';
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

const NavBar = () => {
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
              { false ?
              <Dropdown nav isOpen={dropdownOpen} toggle={() => setDropDownOpen(!dropdownOpen)} > Welcome {" "}
            <DropdownToggle caret color='light' >
              'Denky'
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header> Dashboard  </DropdownItem>
              <DropdownItem > Post </DropdownItem>
              <DropdownItem >All Post</DropdownItem>
              <DropdownItem >Profile</DropdownItem>
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

export default NavBar;