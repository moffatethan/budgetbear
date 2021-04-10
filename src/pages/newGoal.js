import React, { useRef, useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import ErrorMessage from '../components/errorMessage/errorMessage';
import LoadingButton from '../components/loadingButton/loadingButton';
import { AuthContext } from '../contexts/authContext';
import { AuthAxiosContext } from '../contexts/authAxios';

const NewGoal = ({ children }) => {
  const { authAxios } = useContext(AuthAxiosContext);
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectOnGoalCreated, setRedirectOnGoalCreated] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm();


  const onSubmit = async (formValues) => {
    try {
      const body = {
        ...formValues,
        dueDate: (new Date(formValues.dueDate)).toLocaleDateString(),
        amount: parseFloat(formValues.amount)
      };
      setErrorMessage('');
      setLoading(true);
      const { data } = await authAxios.post('goals/new', body);
      authContext.addGoal(data);
      setRedirectOnGoalCreated(true);
      setLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  }

  return (
    <>
    {redirectOnGoalCreated && <Redirect to="/dashboard" />}
      <div className="py-2 text-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-6/12 m-auto rounded-lg shadow- text-left">
          <div className="px-7 pt-5 divide-y-2 divide-solid divide-gray-100">
            <h2 className="text-4xl text-blue-600 font-bold my-4">Create a savings goal</h2>
          </div>
          {errorMessage 
          ? <ErrorMessage message={errorMessage} />
          : null
          }
          <div className="grid grid-cols-2 gap-4 px-7 pt-4 pb-5">
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.name ? 'text-red-500' : 'text-gray-500'}`}>goal name</label>
              <input name="name" id="name" ref={register({ required: true })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.name ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="My Rent" type="text"/>
              {errors.name && <span className="text-red-500 font-medium my-2 block text-sm">Goal name is required</span>}
            </div>
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.dueDate ? 'text-red-500' : 'text-gray-500'}`}>due date</label>
              <input name="dueDate" id="dueDate" ref={register({ required: true })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.dueDate ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="" type="date"/>
              {errors.dueDate && errors.dueDate.type === "required" && <span className="text-red-500 font-medium my-2 block 
              text-sm">Due date is required</span>}
              {errors.dueDate && errors.dueDate.type === "pattern" && <span className="text-red-500 font-medium my-2 block text-sm">A valid date is required</span>}
            </div>
          </div>
          <div className="px-7 pt-2 pb-5">
            <div className="form-group">
              <label className={`block mb-2 uppercase text-sm tracking-wide font-medium ${errors.amount ? 'text-red-500' : 'text-gray-500'}`}>amount</label>
              <input name="amount" id="amount" ref={register({ required: true })} className={`text-gray-800 transition-colors border-solid border-2 rounded-xl py-3 px-3 outline-none focus:border-blue-500 w-full ${errors.amount ? 'border-red-500 text-red-500' : 'text-gray-300'}`} placeholder="$3000.00" type="text"/>
              {errors.amount && errors.amount.type === "required" && <span className="text-red-500 font-medium my-2 block text-sm">Amount is required</span>}
            </div>
          </div>
          <div className="px-7 pt-2 pb-5">
            <div className="form-group">
              {
                loading 
                ? <LoadingButton />
                : <button className="w-full bg-blue-500 py-3 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors">Create Goal</button>
              }
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewGoal

