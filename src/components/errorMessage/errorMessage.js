import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="text-center py-2 bg-red-100 text-red-500 m-7 rounded-lg text-md">
      {message}
    </div>
  )
}

export default ErrorMessage;