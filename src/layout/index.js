import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/djangobudget_logo.svg'

const UILayout = props => {
  return (
    <>
      <div className="bg-gray-800 p-5 flex justify-center shadow-xl">
        <div className="logo self-center flex-1">
          <img src={Logo} />
        </div>
        <div>
          <div className="inline-block mx-2">
            <Link to="/" className="text-gray-100 text-med font-medium hover:opacity-60 transition-opacity">Dashboard</Link>
          </div>
          <div className="inline-block mx-2">
            <Link to="/transactions" className="text-gray-100 text-med font-medium hover:opacity-60 transition-opacity">Transactions</Link>
          </div>
        </div>
      </div>
      {props.children}
    </>
  )
}

export default UILayout
