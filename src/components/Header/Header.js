import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  NavbarText
} from 'reactstrap';

import AuthService from '../../services/AuthService';
import FlashService from '../../services/FlashService';
import { userSignedIn } from '../../utilities/user-session';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const currentPageColor = props.pageColor === 'light' ? "🌒" : "☀";

  const handlePageChange = () => {
    props.currentPageColor(currentPageColor);
  };

  const renderUserLinks = () => {
    if (userSignedIn()) {
      return signedInLink()
    } else {
      return signedOutLinks()
    }
  }

  const handleLogout = () => {
    AuthService.logout()
      .then(() => {
        FlashService.set('message', 'You have successfully logged out.');
        history.push('/login');
      })
  }

  const signedInLink = () => {
    return (
      <NavbarText tag={Link} onClick={handleLogout}>
        log out
      </NavbarText>
    )
  }

  const signedOutLinks = () => {
    return (
      <>
        <NavbarText tag={Link} to={"/login"}>
          log in
        </NavbarText>
        <NavbarText tag={Link} to={"/signup"} className="ml-4">
          sign up
        </NavbarText>
      </>
    )
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
                  <NavLink
                    onClick={handlePageChange}
                    className="header__colors"
                  >
                    {currentPageColor}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="mr-4" tag={Link} to={"/brain-dump"}>
                    brain dump
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="mr-4" tag={Link} to={"/word-play"}>
                    word play
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    options
                  </DropdownToggle>
                  <DropdownMenu right className="header__dropdown">
                    <DropdownItem>option 1</DropdownItem>
                    <DropdownItem>option 2</DropdownItem>
                    <DropdownItem>option 3</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              {renderUserLinks()}
            </Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export { Header };
