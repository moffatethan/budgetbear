import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../components/dropdown/dropdown'
import Footer from '../components/footer'
import { AuthContext } from '../contexts/authContext'

const UILayout = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  const authContext = useContext(AuthContext);

  const openDropdown = bool => {
    setDropdownOpen(bool);
  }

  return (
    <>
      <div className="p-12 flex justify-center">
        <div className="logo self-center flex-1">
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-wide">Budget <span className="text-blue-600">Bear</span></h1>
        </div>
        <div>
          <div className="inline-block mx-8">
            <Link to="/" className="text-gray-600 text-med font-medium hover:text-blue-500 transition">Home</Link>
          </div>
          <div className="inline-block mx-8">
            <Link to="/about" className="text-gray-600 text-med font-medium hover:text-blue-500 transition">About</Link>
          </div>
          {
            authContext.isAuthenticated() 
            ? <div className="inline-block mx-8"><Dropdown opener={openDropdown} status={dropdownOpen} /></div>
            : (
              <>
                <div className="inline-block mx-8">
                  <Link to="/login" className="text-gray-600 text-med font-medium hover:text-blue-500 transition">Login</Link>
                </div>
                <div className="inline-block mx-8">
                  <Link to="/register" className="text-white py-3 px-8 rounded-lg text-med bg-blue-500 font-medium hover:bg-blue-600 transition">Start budgeting today</Link>
                </div>
              </>
            )
          }
        </div>
      </div>
      <div className="w-9/12 m-auto">
        {props.children}
      </div>
      <Footer />
    </>
  )
}

export default UILayout
