import React from 'react'

const FormGroup = ({ children, errors, register, watch }) => {
  if (Array.isArray(children)) {
    return (
      <div className="grid grid-cols-2 gap-4 pt-2 pb-5">
        {
          children.map((child, index) => (
            <div key={index} className="form-group">
              {React.cloneElement(child, { errors, register, watch })}
            </div>
          ))
        }
      </div>
    )
  }
  return (
    <div className="pt-2 pb-5">
      <div className="form-group">
        {React.cloneElement(children, { errors, register, watch })}
      </div>
    </div>
  )
}

export default FormGroup
