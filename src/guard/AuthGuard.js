import { AuthConsumer } from '../contexts/authContext'
import React, { useState } from 'react'

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  return (
    <AuthConsumer>
      {state => {
        if (!state.user) {
          return (
            <>
              <div className="py-8 text-center">
                <form className="bg-white w-6/12 m-auto rounded-lg shadow- text-left">
                  <div className="px-7 pt-5 divide-y-2 divide-solid divide-gray-100">
                    <h2 className="text-4xl text-blue-800 font-bold my-4">Get Started</h2>
                    <p className="py-3 text-gray-600">Sign up for an account and link your bank account to get started</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-7 pt-4 pb-5">
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">first name</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="Buddy" type="text"/>
                    </div>
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">last name</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="Bear" type="text"/>
                    </div>
                  </div>
                  <div className="px-7 pt-2 pb-5">
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">email address</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="buddy@budgetbear.com" type="email"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-7 pt-4 pb-5">
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">password</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="fish_is_amazing123!" type="password"/>
                    </div>
                    <div className="form-group">
                      <label className="block mb-2 uppercase text-gray-500 text-sm tracking-wide font-medium">password confirmation</label>
                      <input className="transition-colors border-solid border-2 border-gray-200 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full" placeholder="fish_is_amazing123!" type="password"/>
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

