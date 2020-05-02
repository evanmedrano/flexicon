import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AuthService from '../../services/AuthService';
import { required, email, password } from '../../utilities/form-validation';

function Signup() {
  const [form, setState] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  })
  const history = useHistory();
  const signupForm = useRef(null);
  const checkButton = useRef(null);

  const handleFormSubmit = event => {
    event.preventDefault();

    signupForm.current.validateAll();

    if (checkButton.current.context._errors.length === 0) {
      const { email, password, password_confirmation } = form;

      AuthService.register(email, password, password_confirmation)
        .then(() => {
          history.push('/login');
        })
    }
  }

  const handleInputChange = (event) => {
    setState({...form, [event.target.name]: event.target.value })
  }

  return (
    <Container>
      <div className="form form--shadow">
        <h2 className="mb-5">Join Flexicon</h2>

        <Form
          ref={signupForm}
          onSubmit={handleFormSubmit}
          autocomplete="on"
        >
          <div className="form__field">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <Input
              type="email"
              name="email"
              className="form__input"
              onChange={handleInputChange}
              value={form.email}
              validations={[required, email]} />
          </div>

          <div class="form__field">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <Input
              type="password"
              name="password"
              className="form__input"
              onChange={handleInputChange}
              value={form.password}
              validations={[required, password]}
            />
          </div>

          <div class="form__field">
            <label htmlFor="passwordConfirmation" className="form__label">
              Password Confirmation
            </label>
            <Input
              type="password"
              name="password_confirmation"
              className="form__input"
              onChange={handleInputChange}
              value={form.password_confirmation}
              validations={[required, password]}
            />
          </div>

          <div className="form__actions">
            <CheckButton
              ref={checkButton}
              type="submit"
              className="my-5 button button--primary button--large button--round button--wide"
            >
              Sign up
            </CheckButton>
          </div>
        </Form>

      </div>
    </Container>
  );
}

export { Signup };
