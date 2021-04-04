import React, { useRef, useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import api from '../api/axios.api';
import ErrorMessage from '../components/errorMessage/errorMessage';
import LoadingButton from '../components/loadingButton/loadingButton';
import { AuthContext } from '../contexts/authContext';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Login = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (formValues) => {
    try {
      setErrorMessage('');
      setLoading(true);
      const { data } = await api.post('auth/login', formValues);
      authContext.setAuth(data);
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700)
    } catch ({ response }) {
      setErrorMessage(response.data.message);
      setLoading(false);
    }
  }

  return (
    <>
    {redirectOnLogin && <Redirect to="/dashboard" />}
      <div className="py-8 text-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-6/12 m-auto rounded-lg shadow- text-left">
          <div className="px-7 pt-5 divide-y-2 divide-solid divide-gray-100">
            <h2 className="text-4xl text-blue-600 font-bold my-4">Sign in to your account</h2>
          </div>
          {errorMessage 
          ? <ErrorMessage message={errorMessage} />
          : null
          }
          <div className="px-7 pt-2 pb-5">
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.emailAddress ? 'text-red-500' : 'text-gray-500'}`}>email address</label>
              <input name="emailAddress" id="emailAddress" ref={register({ required: true, pattern: EMAIL_REGEX })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.emailAddress ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="buddy@budgetbear.com" type="email"/>
              {errors.emailAddress && errors.emailAddress.type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">Email address is required</span>}
              {errors.emailAddress && errors.emailAddress.type === "pattern" && <span className="text-red-500 font-medium my-2 block text-sm">Please provide a valid email address</span>}
            </div>
          </div>
          <div className="px-7 pt-2 pb-5">
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.password ? 'text-red-500' : 'text-gray-500'}`}>password</label>
              <input name="password" id="password" ref={register({ required: true })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.password ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="fish_is_amazing123!" type="password"/>
              {errors.password && errors.password.type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">Password is required</span>}
            </div>
          </div>
          <div className="px-7 pt-2 pb-5">
            <div className="form-group">
              {
                loading 
                ? <LoadingButton />
                : <button className="w-full bg-blue-500 py-3 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors">Sign in</button>
              }
            </div>
          </div>
          <div className="px-7 pt-2 pb-5">
            <p className="text-gray-400">By clicking "Sign in" you are agreeing to the <a className="underline" href="/tos">Terms of Service</a> and <a className="underline" href="/privacy
            ">Privacy Policy</a>.</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login

