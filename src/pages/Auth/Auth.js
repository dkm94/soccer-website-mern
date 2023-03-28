import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Login from '../../components/Auth/Login/Login';
import Register from '../../components/Auth/Register/Register';
import './Auth.css';

const Auth = () => {
  const [form, setForm] = useState(true);

  return (
    <Container className="layout">
      <Row>
        <Col xs={12} md={6}>
          {form ? (
            <Login form={form} setForm={setForm} />
          ) : (
            <Register form={form} setForm={setForm} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
