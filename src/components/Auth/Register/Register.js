import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './Register.css';
import '../Auth.css';
import '../../../App.css';

const Register = ({ form, setForm }) => {
  return (
    <div className="layout-cols">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" />
        </Form.Group>

        <Form.Group className="auth-form-switch">
          <button className="auth-form-switch-btn" onClick={() => setForm(true)}>
            Already have an account ? Log in
          </button>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
