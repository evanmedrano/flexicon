import React from "react";
import axios from "axios";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

function Login() {
  const handleClick = () => {
    window.location = "http://localhost:3030/api/v1/users/auth/facebook"
  };

  return (
    <Container>
      <div className="form form--shadow">
        <h2 className="mb-5">Log in to Flexicon</h2>

        <form autocomplete="on">
          <div className="form__field">
            <label for="email" className="form__label">
              Email
            </label>
            <input
              type="email"
              name="email"
              autofocus
              className="form__input"
            />
          </div>

          <div class="form__field">
            <div className="d-flex justify-content-between">
              <label for="password" className="form__label">
                Password
              </label>
              <Link to="#" className="form__label">
                Forgot password?
              </Link>
            </div>
            <input type="password" name="password" className="form__input" />
          </div>

          <div className="form__actions">
            <button
              type="submit"
              className="mb-5 button button--primary button--large button--round button--wide"
            >
              Log in
            </button>
          </div>
        </form>

        <Link
          onClick={handleClick}
          className="my-4 button button--fb button--large button--round button--wide"
        >
          <FontAwesomeIcon icon={faFacebook} className="button__icon" />
          <span>Sign in with Facebook</span>
        </Link>

        <Link
          to="localhost:3030/api/v1/users/auth/google_oauth2"
          className="mb-5 button button--google button--large button--round button--wide"
        >
          <FontAwesomeIcon icon={faGoogle} className="button__icon" />
          <span>Sign in with Google</span>
        </Link>
      </div>
    </Container>
  );
}

export { Login };
