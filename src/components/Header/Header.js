import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const currentPageColor = props.pageColor === 'light' ? 'Night mode' : 'Light mode'

  const handlePageChange = () => {
    props.currentPageColor(currentPageColor)
  }


  return (
    <>
     <header className="header">
       <Navbar
         color={props.pageColor}
         dark={!props.isLight}
         light={props.isLight}
         expand="md"
       >
         <Container>
           <NavbarBrand tag={Link} to={"/"}>life doesn't suck</NavbarBrand>
           <NavbarToggler onClick={toggle} />
           <Collapse isOpen={isOpen} navbar>
             <Nav className="mr-auto" navbar>
               <NavItem>
                 <NavLink onClick={handlePageChange}>{currentPageColor}</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink tag={Link} to={"/blog"}>Blog</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink tag={Link} to={"/motivation"}>Motivation</NavLink>
               </NavItem>
               <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav caret>
                   Options
                 </DropdownToggle>
                 <DropdownMenu right>
                   <DropdownItem>
                     Option 1
                   </DropdownItem>
                   <DropdownItem>
                     Option 2
                   </DropdownItem>
                   <DropdownItem>
                     Option 3
                   </DropdownItem>
                   <DropdownItem divider />
                   <DropdownItem>
                     Reset
                   </DropdownItem>
                 </DropdownMenu>
               </UncontrolledDropdown>
             </Nav>
             <NavbarText tag={Link} to={"/login"}>Log in</NavbarText>
           </Collapse>
        </Container>
       </Navbar>
     </header>
    </>
  )
}

export { Header };
