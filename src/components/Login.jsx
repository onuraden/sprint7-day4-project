import React, { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

export const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must include at least one upperCase, one lowerCase, number and special characters',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&_])[A-Za-z\d@.#$!%*?&_]{8,15}$/;

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if (name === 'email') {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name === 'password') {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name === 'terms') {
      if (value) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  useEffect(() => {
    if (
      validateEmail(form.email) &&
      regex.test(form.password) &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) => item.password == form.password && item.email == form.email
          );
          if (user) {
            setForm(initialForm);
            history.push('/success');
          } else {
            history.push('/error');
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          invalid={errors.email}
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          data-cy="email-input"
        />
        {errors.email && <FormFeedback data-cy="error-message"> {errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          invalid={errors.password}
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          data-cy="pass-input"
        />
        {errors.password && (
          <FormFeedback data-cy="error-message"> {errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          invalid={errors.terms}
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          data-cy="terms-input"
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid} data-cy="button-input">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
