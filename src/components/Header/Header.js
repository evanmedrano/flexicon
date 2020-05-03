import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

import { userSignedIn } from '../../utilities/user-session';
import { HeaderSignedInLinks } from './HeaderSignedInLinks';
import { HeaderSignedOutLinks } from './HeaderSignedOutLinks';

function Header({ handlePageChange, handleLogout, pageColor, isLight }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const currentPageColor = pageColor === 'light' ? "🌒" : "☀";

  const changePageColor = () => {
    handlePageChange(currentPageColor);
  };

  return (
    <header className="header">
      <Navbar color={pageColor} dark={!isLight} light={isLight} expand="md">
        <Container>
          <NavbarBrand tag={NavLink} to={"/"} className="header__brand">
            flexicon
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="mr-auto">
              <NavItem>
                <a onClick={changePageColor} className="header__colors">
                  {currentPageColor}
                </a>
              </NavItem>
              <NavItem>
                <NavLink className="mr-4 nav-link" to={"/brain-dump"}>
                  brain dump
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="mr-4 nav-link" to={"/word-play"}>
                  word play
                </NavLink>
              </NavItem>
            </Nav>
            <div className="navbar-nav">
              {userSignedIn() ? (
                <HeaderSignedInLinks handleLogout={handleLogout} />
              ) : (
                <HeaderSignedOutLinks />
              )}
            </div>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export { Header };
