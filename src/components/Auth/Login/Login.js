import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import ErrorAlert from '../../Alert/Error/Error';
import { Link, withRouter, useNavigate } from "react-router-dom";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import axios from "axios";
import './Login.css';
import '../Auth.css';
import '../../../App.css';

const Login = ({ form, setForm }) => {
  const methods = useForm();
  const { register, handleSubmit, watch, errors, control } = methods;
  const [showError, setShowError] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false)
  const navigate = useNavigate();
  // const validationSchema = Yup.object().shape({
  //   email: Yup.string()
  //       .required('Veuillez compléter ce champ.'),
  //   password: Yup.string()
  //       .required('Veuillez compléter ce champ.')
  // })

  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    setLoadingButton(true)
    const res = await axios.post(`auth/login`,
    {
        email: email,
        password: password,
    })
        .then((res) => {
            localStorage.setItem("token", res.data.token)
                const token = localStorage.getItem('token')
                if(token){
                    setTimeout(() => {
                        setLoadingButton(false)
                        window.location = "/myfavorites" ;
                        navigate("/myfavorites");
                    }, 500);
                }
        })
        .catch((err) => {
          console.log(res);
            console.log(err)
            setShowError(true)
            setLoadingButton(false)
            setTimeout(() => {
                setShowError(false)
            }, 5000);
        })
  };
  return (
    <div className='layout-cols'>
      <ErrorAlert showError={showError} title="Oups, une erreur est survenue" description="Veuillez réessayer plus tard" />
      <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} id='login' >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Controller 
            name="email"
            control={control}
            defaultValue={""}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control 
                type="email" 
                placeholder="Enter your email"
                onChange={onChange} 
                value={value} 
                ref={ref}                            
                 />
            )}
          />
    
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Controller 
            name="password"
            control={control}
            defaultValue={""}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control 
                type="password" 
                placeholder="Enter password"
                onChange={onChange} 
                value={value} 
                ref={ref}                            
                 />
            )}
          />
    
        </Form.Group>

        <Form.Group className='auth-form-switch' >
          <button className='auth-form-switch-btn' onClick={() => setForm(false)}  >Already have an account ? Log in</button>
        </Form.Group>
          <Button 
            type="submit"
            className="btn"
            form='login'
          >
              Log in
          </Button>
      </Form>
      </FormProvider>
    </div>
  )
}

export default Login