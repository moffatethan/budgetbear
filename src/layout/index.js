import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/footer'

const UILayout = props => {
  return (
    <>
      <div className="p-12 flex justify-center">
        <div className="logo self-center flex-1">
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-wide">Budget <span className="text-blue-600">Bear</span></h1>
        </div>
        <div>
          <div className="inline-block mx-8">
            <Link to="/" className="text-gray-600 text-med font-medium hover:text-gray-800 transition">Home</Link>
          </div>
          <div className="inline-block mx-8">
            <Link to="/transactions" className="text-gray-600 text-med font-medium hover:text-gray-800 transition">About</Link>
          </div>
          <div className="inline-block mx-8">
            <Link to="/transactions" className="text-gray-600 text-med font-medium hover:text-gray-800 transition">Pricing</Link>
          </div>
          <div className="inline-block mx-8">
            <Link to="/transactions" className="text-gray-600 text-med font-medium hover:text-gray-800 transition">Get Advice</Link>
          </div>
          <div className="inline-block mx-8">
            <Link to="/transactions" className="text-white py-3 px-8 rounded-lg text-med bg-blue-500 font-medium hover:bg-blue-600 transition">Start your Free Trial</Link>
          </div>
        </div>
      </div>
      {props.children}
      <Footer />
    </>
  )
}

export default UILayout
