import { AuthConsumer } from '../contexts/authContext'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const AuthGuard = ({ children }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(errors);
    console.log(data);
  }

  return (
    <AuthConsumer>
      {registerFunction => {
        if (!registerFunction.user) {
          return (
            <>
              <div className="py-8 text-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-6/12 m-auto rounded-lg shadow- text-left">
                  <div className="px-7 pt-5 divide-y-2 divide-solid divide-gray-100">
                    <h2 className="text-4xl text-blue-800 font-bold my-4">Get Started</h2>
                    <p className="py-3 text-gray-600">Sign up for an account and link your bank account to get started</p>
                  </div>
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
                      <input name="emailAddress" id="emailAddress" ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.emailAddress ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="buddy@budgetbear.com" type="email"/>
                      {errors.emailAddress && errors.emailAddress.type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">Email address is required</span>}
                      {errors.emailAddress && errors.emailAddress.type === "pattern" && <span className="text-red-500 font-medium my-2 block text-sm">Please provide a valid email address</span>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-7 pt-4 pb-5">
                    <div className="form-group">
                      <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.password ? 'text-red-500' : 'text-gray-500'}`}>password</label>
                      <input name="password" id="password" ref={register({ required: true })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.password ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="fish_is_amazing123!" type="password"/>
                      {errors.password && <span className="text-red-500 font-medium my-2 block text-sm">Password is required</span>}
                    </div>
                    <div className="form-group">
                      <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.passwordConfirmation ? 'text-red-500' : 'text-gray-500'}`}>password confirmation</label>
                      <input name="passwordConfirmation" id="passwordConfirmation" ref={register({ required: true })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.passwordConfirmation ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="fish_is_amazing123!" type="password"/>
                      {errors.passwordConfirmation && <span className="text-red-500 font-medium my-2 block text-sm">Password confirmation is required</span>}
                    </div>
                  </div>
                  <div className="px-7 pt-2 pb-5">
                    <div className="form-group">
                      <button className="w-full bg-blue-500 py-3 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors">Create Account</button>
                    </div>
                  </div>
                  <div className="px-7 pt-2 pb-5">
                    <p className="text-gray-400">By clicking "Create Account" you are agreeing to the <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>.</p>
                  </div>
                </form>
              </div>
            </>
          )
        } else {
          return (
            <React.Fragment>
              {children}
            </React.Fragment>
          )
        }
      }}
    </AuthConsumer>
  )
}

export default AuthGuard

