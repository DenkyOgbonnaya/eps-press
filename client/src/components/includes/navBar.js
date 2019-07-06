import React, {useState} from 'react';
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
      <Navbar color="light" light expand="xs">
        <NavbarBrand href="/"> <img src= {require('./logo_ic50.png')} alt='logo'/>EPSpress</NavbarBrand>
        <NavbarToggler onClick={ () => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
              <NavItem>
              { true === true ?
              <Dropdown nav isOpen={dropdownOpen} toggle={() => setDropDownOpen(!dropdownOpen)} > Welcome {" "}
            <DropdownToggle caret color='light' >
              'Denky'
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header> Dashboard  </DropdownItem>
              <DropdownItem > Profile </DropdownItem>
              <DropdownItem >My pep talks</DropdownItem>
              <DropdownItem divider />
              <DropdownItem  > Logout </DropdownItem>
            </DropdownMenu>
          </Dropdown>
             :
             <Nav className="ml-auto" navbar>
             <NavItem>
               <NavLink to='/login'  > Login </NavLink>
             </NavItem>
               <NavItem>
               <NavLink to='/sign' > Signup </NavLink>
             </NavItem>
               <NavItem>
               <NavLink to='/about'  > About </NavLink>
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