import { AuthContext } from '../contexts/authContext'
import React, { useContext, useState } from 'react'
import api from '../api/axios.api';
import { Redirect } from 'react-router';
import Form, { FormGroup, FormInput, PasswordInputs } from '../components/form';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const Register = (props) => {
  const authContext = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectOnRegister, setRedirectOnRegister] = useState(false);

  const registerUser = async (formValues) => {
    try {
      setErrorMessage('');
      const { data } = await api.post('user/new', formValues);
      authContext.setAuth(data);
      setTimeout(() => {
      setRedirectOnRegister(true);
      }, 700)
    } catch ({ response }) {
      setErrorMessage(response.data.message);
    }
  }

  return (
    <>
      {redirectOnRegister && <Redirect to='/dashboard' />}
      <div className="text-center">
        <Form
          onSubmit={registerUser}
          className="px-7"
          heading={
            <>
              <h2 className="text-4xl text-blue-600 font-bold my-4">Get Started</h2>
              <p className="py-3 text-gray-600">Sign up for an account and link your bank account to get started</p>
            </>
          }
          error={errorMessage}
          bottomNotice={
            <>
              <p className="text-gray-400">By clicking "Create account" you are agreeing to the <a className="underline" href="/tos">Terms of Service</a> and <a className="underline" href="/privacy
        ">Privacy Policy</a>.</p>
            </>
          }
          buttonText="Create account"
        >
          <FormGroup>
            <FormInput
              label="First name"
              type="text"
              name="firstName"
              placeholder="Buddy"
              rules={{
                required: true
              }}
            />
            <FormInput
              label="Last name"
              type="text"
              name="lastName"
              placeholder="Bear"
              rules={{
                required: true
              }}
            />  
          </FormGroup>
          <FormGroup>
            <FormInput
              label="Email address"
              type="email"
              name="emailAddress"
              placeholder="buddy_bear@budgetbear.com"
              rules={{
                required: true,
                pattern: EMAIL_REGEX
              }}
            />
          </FormGroup>
          <FormGroup>
            <PasswordInputs 
              label='Password'
              name='password'
              rules={{
                required: true,
                minLength: 8
              }}
            />
          </FormGroup>
        </Form>
      </div>
    </>
  )
}

export default Register

