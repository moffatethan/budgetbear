import { AuthConsumer } from '../contexts/authContext'
import React from 'react'

const AuthGuard = ({ children }) => {
  return (
    <AuthConsumer>
      {state => {
        if (!state.user) {
          return (
            <>
              <div className="py-8 text-center">
                <div className="bg-white w-6/12 m-auto rounded-lg shadow- text-left">
                  <div className="px-7 pt-5 divide-y-2 divide-solid divide-gray-100">
                    <h2 className="text-3xl font-bold my-4">Get Started</h2>
                    <p className="py-3 text-gray-600">Sign up for an account and link your bank account to get started</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-7 pt-2 pb-5">
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">first name</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="Albert" type="text"/>
                    </div>
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">last name</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="Einstein" type="text"/>
                    </div>
                  </div>
                  <div className="px-7 pt-2 pb-5">
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">email address</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="emc2@djangobudget.com" type="email"/>
                    </div>
                  </div>
                  <div className="px-7 pt-2 pb-5">
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">password</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="time_is_relative" type="password"/>
                    </div>
                  </div>
                  <div className="px-7 pt-2 pb-5">
                    <div className="form-group">
                      <button className="w-full bg-blue-500 py-3 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors">Create Account</button>
                    </div>
                  </div>
                </div>
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
