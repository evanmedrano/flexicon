import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { FlashMessage, ErrorList } from '../../components';
import AuthService from '../../services/AuthService';
import FlashService from '../../services/FlashService';
import { userSignedIn, required, email, password } from '../../utilities';

function Login(props) {
  const [errors, setErrors] = useState([])
  const [form, setState] = useState({ email: '', password: '' })
  const history = useHistory();
  const loginForm = useRef(null);
  const checkButton = useRef(null);

  useEffect(() => {
    setErrors([]);
  }, [])

  if (userSignedIn()) {
    FlashService.set('message', 'You are already logged in.');
    history.push('/');
    return null
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    loginForm.current.validateAll();

    if (checkButton.current.context._errors.length === 0) {
      const { email, password } = form;

      AuthService.login(email, password)
        .then(() => {
          FlashService.set('message', 'You have successfully logged in.');
          history.push('/');
        })
        .catch(error => { setErrors(['Invalid email or password']) })
    }
  }

  const handleInputChange = (event) => {
    setState({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <Container>
      <FlashMessage />

      <div className="form form--shadow">
        <h2 className="mb-5">Log in to Flexicon</h2>
        <ErrorList errors={errors} />

        <Form ref={loginForm} onSubmit={handleFormSubmit} autocomplete="on">
          <div className="form__field">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <Input
              type="email"
              name="email"
              autoFocus
              className="form__input"
              onChange={handleInputChange}
              validations={[required, email]}
            />
          </div>

          <div class="form__field">
            <div className="d-flex justify-content-between">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <Link to="#" className="form__label">
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              className="form__input"
              onChange={handleInputChange}
              validations={[required, password]}
            />
          </div>

          <div className="form__actions">
            <CheckButton
              ref={checkButton}
              type="submit"
              className="my-5 button button--primary button--large button--round button--wide"
            >
              Log in
            </CheckButton>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export { Login };
