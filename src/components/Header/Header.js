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

  const currentPageColor = props.pageColor === 'light' ? '🌒' : '☀'

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
           <NavbarBrand tag={Link} to={"/"} className="header__brand">
             flexicon
           </NavbarBrand>
           <NavbarToggler onClick={toggle} />
           <Collapse isOpen={isOpen} navbar>
             <Nav className="mr-auto" navbar>
               <NavItem>
                 <NavLink onClick={handlePageChange} className="header__colors">
                   {currentPageColor}
                 </NavLink>
               </NavItem>
               <NavItem>
                 <NavLink tag={Link} to={"/brain-dump"}>brain dump</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink tag={Link} to={"/word-play"}>word play</NavLink>
               </NavItem>
               <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav caret>
                   options
                 </DropdownToggle>
                 <DropdownMenu right className="header__dropdown">
                   <DropdownItem>
                     option 1
                   </DropdownItem>
                   <DropdownItem>
                     option 2
                   </DropdownItem>
                   <DropdownItem>
                     option 3
                   </DropdownItem>
                   <DropdownItem divider />
                   <DropdownItem>
                     reset
                   </DropdownItem>
                 </DropdownMenu>
               </UncontrolledDropdown>
             </Nav>
             <NavbarText tag={Link} to={"/login"}>log in</NavbarText>
           </Collapse>
        </Container>
       </Navbar>
     </header>
    </>
  )
}

export { Header };
