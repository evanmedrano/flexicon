import React from 'react';

function Footer(props) {
  return (
    <>
      <footer className="footer" style={props.style}>
        <h3 className="footer__headline">
          &copy; flexicon
        </h3>
        <hr />
        let your words lead the way
      </footer>
    </>
  )
}

export { Footer }
