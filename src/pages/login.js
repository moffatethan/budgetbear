import React, { useRef, useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import api from '../api/axios.api';
import ErrorMessage from '../components/errorMessage/errorMessage';
import Form, { FormGroup, FormInput } from '../components/form';
import LoadingButton from '../components/loadingButton/loadingButton';
import { AuthContext } from '../contexts/authContext';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Login = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  
  const onSubmit = async (formValues) => {
    try {
      const { data } = await api.post('auth/login', formValues);
      authContext.setAuth(data);
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700)
    } catch ({ response }) {
    }
  }

  return (
    <>
    {redirectOnLogin && <Redirect to="/dashboard" />}
      <Form
        className="px-7"
        heading={<>
          <h2 className="text-4xl text-blue-600 font-bold my-4">Sign in to your account</h2>
          <p className="py-3 text-gray-600">Get back to saving for that new vacation.</p>
        </>}
        error={errorMessage}
        onSubmit={onSubmit}
        bottomNotice={<><p className="text-gray-400">By clicking "Sign in" you are agreeing to the <a className="underline" href="/tos">Terms of Service</a> and <a className="underline" href="/privacy
        ">Privacy Policy</a>.</p></>}
        buttonText="Sign in"
      >
        <FormGroup>
          <FormInput
            label="Email address"
            type="email"
            name="emailAddress"
            placeholder="buddy_bear@budgetbear.com"
            rules={{
              required: true
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="fish_is_amazing123!"
            rules={{
              required: true
            }}
          />
        </FormGroup>
      </Form>
    </>
  )
}

export default Login

