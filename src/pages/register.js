import { AuthContext } from '../contexts/authContext'
import React, { useContext, useRef, useState } from 'react'
import api from '../api/axios.api';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import ErrorMessage from '../components/errorMessage/errorMessage';
import LoadingButton from '../components/loadingButton/loadingButton';
const checkPasswordStrength = require('zxcvbn');
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, handleSubmit, errors, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectOnRegister, setRedirectOnRegister] = useState(false);

  const password = useRef({});
  password.current = watch("password", "");
  const passwordStrength = checkPasswordStrength(password.current).score;

  const registerUser = async (formValues) => {
    try {
      setErrorMessage('');
      setLoading(true);
      const { data } = await api.post('user/new', formValues);
      authContext.setAuth(data);
      setTimeout(() => {
      setRedirectOnRegister(true);
      }, 700)
    } catch ({ response }) {
      setErrorMessage(response.data.message);
      setLoading(false);
    }
  }

  const renderPasswordStrengthBars = () => {
    const bars = [];
    for (let i = 0; i < 4; i++) {
      bars.push((
        <div key={i} className="w-1/4 px-1">
          <div className={`h-2 rounded-xl transition-colors ${i < passwordStrength ? (passwordStrength <= 2 ? 'bg-red-400' : (passwordStrength <= 3 ? 'bg-yellow-400' : 'bg-green-500')): 'bg-gray-200'}`}></div>
        </div>
      ))
    }
    return bars
  }

  return (
    <>
      {redirectOnRegister && <Redirect to='/dashboard' />}
      <div className="py-8 text-center">
        <form onSubmit={handleSubmit(registerUser)} className="bg-white w-6/12 m-auto rounded-lg shadow- text-left">
          <div className="px-7 pt-5 divide-y-2 divide-solid divide-gray-100">
            <h2 className="text-4xl text-blue-600 font-bold my-4">Get Started</h2>
            <p className="py-3 text-gray-600">Sign up for an account and link your bank account to get started</p>
          </div>
          {errorMessage 
          ? <ErrorMessage message={errorMessage} />
          : null
          }
          <div className="grid grid-cols-2 gap-4 px-7 pt-4 pb-5">
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.firstName ? 'text-red-500' : 'text-gray-500'}`}>first name</label>
              <input name="firstName" id="firstName" ref={register({ required: true })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.firstName ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="Buddy" type="text"/>
              {errors.firstName && <span className="text-red-500 font-medium my-2 block text-sm">First name is required</span>}
            </div>
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.lastName ? 'text-red-500' : 'text-gray-500'}`}>last name</label>
              <input name="lastName" id="lastName" ref={register({ required: true })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.lastName ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="Bear" type="text"/>
              {errors.lastName && <span className="text-red-500 font-medium my-2 block text-sm">Last name is required</span>}
            </div>
          </div>
          <div className="px-7 pt-2 pb-5">
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.emailAddress ? 'text-red-500' : 'text-gray-500'}`}>email address</label>
              <input name="emailAddress" id="emailAddress" ref={register({ required: true, pattern: EMAIL_REGEX })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.emailAddress ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="buddy@budgetbear.com" type="email"/>
              {errors.emailAddress && errors.emailAddress.type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">Email address is required</span>}
              {errors.emailAddress && errors.emailAddress.type === "pattern" && <span className="text-red-500 font-medium my-2 block text-sm">Please provide a valid email address</span>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-7 pt-4 pb-5">
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.password ? 'text-red-500' : 'text-gray-500'}`}>password</label>
              <input name="password" id="password" ref={register({ 
                required: true,
                minLength: 8
              })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.password ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="fish_is_amazing123!" type="password"/>
              <div className="flex my-2 -mx-1">
                {renderPasswordStrengthBars()}
              </div>
              {errors.password && errors.password.type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">Password is required</span>}
              {errors.password && errors.password.type === "minLength" && <span className="text-red-500 font-medium my-2 block text-sm">Password must be minimum 8 characters</span>}
            </div>
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.passwordConfirmation ? 'text-red-500' : 'text-gray-500'}`}>password confirmation</label>
              <input name="passwordConfirmation" id="passwordConfirmation" ref={register({ 
                required: true,
                validate: value => value === password.current || "Password must match"
              })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.passwordConfirmation ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="fish_is_amazing123!" type="password"/>
              {errors.passwordConfirmation && errors.passwordConfirmation.type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">Password confirmation is required</span>}
              {errors.passwordConfirmation && errors.passwordConfirmation.type === "validate" && <span className="text-red-500 font-medium my-2 block text-sm">{errors.passwordConfirmation.message}</span>}
            </div>
          </div>
          <div className="px-7 pt-2 pb-5">
            <div className="form-group">
              {
                loading 
                ? <LoadingButton />
                : <button className="w-full bg-blue-500 py-3 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors">Create Account</button>
              }
            </div>
          </div>
          <div className="px-7 pt-2 pb-5">
            <p className="text-gray-400">By clicking "Create Account" you are agreeing to the <a className="underline" href="/tos">Terms of Service</a> and <a className="underline" href="/privacy
            ">Privacy Policy</a>.</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register

