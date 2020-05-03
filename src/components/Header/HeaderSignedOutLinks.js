import React from 'react';

import { NavLink } from 'react-router-dom';

function HeaderSignedOutLinks() {
  return (
    <>
      <NavLink to={"/login"} className="nav-link">
        log in
      </NavLink>
      <NavLink to={"/signup"} className="nav-link ml-4">
        sign up
      </NavLink>
    </>
  )
}

export { HeaderSignedOutLinks };
