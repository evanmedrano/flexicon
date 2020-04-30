import React, { useState } from "react";
import axios from "axios";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

function Signup() {
  const [form, setState] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3030/api/v1/signup', {
      user: {
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordConfirmation
      }
    })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  const handleInputChange = (event) => {
    setState({...form, [event.target.name]: event.target.value })
  }

  return (
    <Container>
      <div className="form form--shadow">
        <h2 className="mb-5">Join Flexicon</h2>

        <Link
          to="#"
          className="mb-4 button button--fb button--large button--round button--wide"
        >
          <FontAwesomeIcon icon={faFacebook} className="button__icon" />
          <span>Sign up with Facebook</span>
        </Link>

        <Link
          to="localhost:3030/api/v1/users/auth/google_oauth2"
          className="mb-5 button button--google button--large button--round button--wide"
        >
          <FontAwesomeIcon icon={faGoogle} className="button__icon" />
          <span>Sign up with Google</span>
        </Link>

        <form autocomplete="on" onSubmit={handleFormSubmit}>
          <div className="form__field">
            <label for="email" className="form__label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form__input"
              onChange={handleInputChange}
              value={form.email}
            />
          </div>

          <div class="form__field">
            <label for="password" className="form__label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form__input"
              onChange={handleInputChange}
              value={form.password}
            />
          </div>

          <div class="form__field">
            <label for="passwordConfirmation" className="form__label">
              Password Confirmation
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              className="form__input"
              onChange={handleInputChange}
              value={form.passwordConfirmation}
            />
          </div>

          <div className="form__actions">
            <button
              type="submit"
              className="mb-5 button button--primary button--large button--round button--wide"
            >
              Sign up
            </button>
          </div>
        </form>

      </div>
    </Container>
  );
}

export { Signup };
