import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingButton from '../loadingButton/loadingButton';
import ErrorMessage from '../errorMessage/errorMessage';

const Form = ({ onSubmit, className, error, heading, bottomNotice, buttonText, children }) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = (formValues) => {
    try {
      setLoading(true);
      onSubmit(formValues);
      setTimeout(() => {
        setLoading(false);
      }, 700)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className={`bg-white lg:w-11/12 md:w-11/12 m-auto rounded-lg shadow- text-left ${className}`}>
      {
        heading
        ? <div className="pt-5 divide-y-2 divide-solid divide-gray-100">
            {heading}
          </div>
        : null
      }
      {error 
      ? <ErrorMessage message={error} />
      : null
      }
      {
        Array.isArray(children) ? children.map((child, index) => React.cloneElement(child, { errors, register, watch, key: index } )) : React.cloneElement(children, { errors, register, watch })
      }
      <div className="pt-2 pb-5">
        <div className="form-group">
          {
            loading 
            ? <LoadingButton />
            : <button className="w-full bg-blue-500 py-3 rounded-xl text-white shadow-sm hover:shadow-md font-bold hover:bg-blue-600 transition">{buttonText}</button>
          }
        </div>
      </div>
      {
        bottomNotice
        ? <div className="pt-2 pb-5">
            <p className="text-gray-400">{bottomNotice}</p>
          </div>
        : null
      }
    </form>
  )
}

export default Form;
