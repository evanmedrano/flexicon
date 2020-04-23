import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
     <header className="header">
       <nav className="header__nav">
         <ul className="header__list">
           <li className="header__item">
             <Link to="/about">About</Link>
           </li>
           <li className="header__item">
             <Link to="/">Home</Link>
           </li>
         </ul>
       </nav>
     </header>
    </>
  )
}

export { Header };
