import React from 'react'

const Footer = (props) => {
  return (
    <div className="text-center mt-24">
      <div className="logo self-center flex-1">
        <h1 className="text-2xl font-black text-gray-300 uppercase tracking-wide">Budget Bear</h1>
      </div>
      <p className="text-gray-300">&copy; Budget Bear {new Date().getFullYear()} - All rights reserved</p>
    </div>
  )
}

export default Footer
