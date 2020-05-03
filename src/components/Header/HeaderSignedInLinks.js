import React from 'react';

import { NavLink } from 'react-router-dom';

function HeaderSignedInLinks({ handleLogout }) {
  const handleUserLogout = () => {
    handleLogout()
  }

  return (
    <>
      <NavLink to={"/logout"} onClick={handleUserLogout} className="nav-link">
        log out
      </NavLink>
    </>
  )
}

export { HeaderSignedInLinks };
