import React, { useRef } from 'react'
const checkPasswordStrength = require('zxcvbn');

const className = `text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none shadow-sm focus:border-gray-500 w-full`;

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
const FormInput = ({ label, type, name, placeholder, key, rules, errors, register }) => {
  return (
    <div key={key}>
      <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors[name] ? 'text-red-500' : 'text-gray-500'}`}>{label}</label>
      <input name={name} id={name} ref={register(rules)} className={className + ` ${errors[name] ? 'border-red-500 text-red-500' : 'text-gray-400'}`} placeholder={placeholder} type={type} />
      {errors[name] && errors[name].type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">{label} is required</span>}
      {errors[name] && errors[name].type === "pattern" && <span className="text-red-500 font-medium my-2 block text-sm">Input does not match pattern</span>}  
    </div>
  )
}

/**
 * Packaged inputs for password, provided Password and PasswordConfirmation.
 * @returns 
 */
export const PasswordInputs = ({ label, type, name, placeholder, key, rules, errors, register, watch }) => {
  const password = useRef({});
  password.current = watch("password", "");
  const passwordStrength = checkPasswordStrength(password.current).score;

  const renderPasswordStrengthBars = () => {
    const bars = [];
    for (let i = 0; i < 4; i++) {
      bars.push((
        <div key={i} className="w-1/4 px-1">
          <div className={`h-2 rounded-xl transition-colors ${i < passwordStrength ? (passwordStrength <= 2 ? 'bg-red-400' : (passwordStrength <= 3 ? 'bg-yellow-400' : 'bg-green-500')): 'bg-gray-200'}`}></div>
        </div>
      ))
    }
    return bars
  }

  return (
    <div className="grid grid-cols-2 gap-4 pt-2 pb-5">
      <div key={key}>
        <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors[name] ? 'text-red-500' : 'text-gray-500'}`}>{label}</label>
        <input name={name} id='password' ref={register(rules)}  className={className + ` ${errors[name] ? 'border-red-500 text-red-500' : 'text-gray-400'}`} placeholder='fish_is_amazing123!' type='password' />
        <div className="flex my-2 -mx-1">
          {renderPasswordStrengthBars()}
        </div>
        {errors[name] && errors[name].type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">{label} is required</span>}
        {errors[name] && errors[name].type === "pattern" && <span className="text-red-500 font-medium my-2 block text-sm">{label} is not valid</span>}  
      </div>
      <div className="form-group">
        <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.passwordConfirmation ? 'text-red-500' : 'text-gray-500'}`}>password confirmation</label>
        <input name="passwordConfirmation"  id="passwordConfirmation" ref={register({ 
          required: true,
          validate: value => value === password.current || "Password must match"
        })} className={className + ` ${errors[name] ? 'border-red-500 text-red-500' : 'text-gray-400'}`} placeholder="fish_is_amazing123!" type="password"/>
        {errors.passwordConfirmation && errors.passwordConfirmation.type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">Password confirmation is required</span>}
        {errors.passwordConfirmation && errors.passwordConfirmation.type === "validate" && <span className="text-red-500 font-medium my-2 block text-sm">{errors.passwordConfirmation.message}</span>}
      </div>
    </div>
  )
}

export default FormInput;
