import React from 'react'

/**
 * 
 * @param {String} label The label for the input
 * @param {String} type The type of input
 * @param {String} name The name to be sent in the payload
 * @param {Object} rules Validation rules for the input
 * @param {} errors This field is automatically added by the Form
 * @param {} register This field is automatically added by the Form
 * @returns 
 */
const FormInput = ({ label, type, name, placeholder, currencyMask, key, rules, errors, register }) => {
  return (
    <div key={key}>
      <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors[name] ? 'text-red-500' : 'text-gray-500'}`}>{label}</label>
      <input name={name} id={name} ref={register(rules)} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors[name] ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder={placeholder} type={type} />
      {errors[name] && errors[name].type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">{label} is required</span>}
      {errors[name] && errors[name].type === "pattern" && <span className="text-red-500 font-medium my-2 block text-sm">Input does not match pattern</span>}  
    </div>
  )
}

export default FormInput;
