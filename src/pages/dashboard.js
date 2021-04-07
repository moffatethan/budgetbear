import React, { useContext, useEffect, useState } from 'react'
import ProgressCircle from '../components/progressCircle'
import { ArrowUp, ArrowDown } from 'react-feather'
import { AuthContext } from '../contexts/authContext';
import { useHistory } from 'react-router';
import { useSpring, animated } from 'react-spring';

const Dashboard = (props) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const loadAnimation = useSpring({
    from: {opacity: 0, transform: 'scale(0.95)'},
    to: {opacity: 1, transform: 'scale(1)'}
  });

  if (!authContext.authState.user.plaidLinked) {
    history.push('/dashboard/plaid/link')
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-bold text-gray-800 text-4xl">Hey {authContext.authState.user.firstName}!</h1>
      </div>
      <animated.div style={loadAnimation} className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-gray-600 mb-2 text-xl font-bold">Income</h2>
          <div className="text-5xl flex text-green-400 font-bold">
            <h1 className="mr-2">$2,500</h1>
            <span><ArrowUp size={48} /></span>
          </div>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-gray-600 mb-2 text-xl font-bold">Saving Goals</h2>
          <div className="text-5xl flex text-red-400 font-bold">
            <h1 className="mr-2">$1,523</h1>
            <span><ArrowDown size={48} /></span>
          </div>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-gray-600 mb-2 text-xl font-bold">Free Spending</h2>
          <div className="text-5xl flex text-green-400 font-bold">
            <h1 className="mr-2">$977</h1>
            <span><ArrowUp size={48} /></span>
          </div>
        </div>
      </animated.div>
      <div className="mb-8 flex items-baseline">
        <h1 className="font-bold flex-1 text-gray-800 text-4xl">Saving Goals</h1>
        {
          authContext.authState.user.goals.length === 0
          ? null
          : <a href="/" className="py-4 px-12 bg-blue-600 hover:bg-blue-800 transition-colors text-white font-medium rounded-full">Make a Goal</a>
        }
      </div>
      <div className="grid grid-cols-2 gap-4">
        <animated.div style={loadAnimation} className="bg-white flex p-8 h-auto rounded-xl shadow-lg">
          <ProgressCircle fill="#34D399" radius="60" cxy="80" width="180" height="150" percent={100} />
            <div>
              <h2 className="text-xl text-green-900 font-bold leading-loose">Rent</h2>
              <div>
                <h1 className="text-4xl text-gray-900 font-bold leading-snug">$833/mo</h1>
                <h3 className="text-gray-400">$416 bi-weekly</h3>
                <h3 className="text-gray-400">One week until completed</h3>
              </div>
            </div>
          </animated.div>
          <animated.div style={loadAnimation} className="bg-white flex p-8 h-auto rounded-xl shadow-lg">
            <ProgressCircle fill="#34D399" radius="60" cxy="80" width="180" height="150" percent={45} />
            <div>
              <h2 className="text-xl text-green-900 font-bold leading-loose">Rent</h2>
              <div>
                <h1 className="text-4xl text-gray-900 font-bold leading-snug">$833/mo</h1>
                <h3 className="text-gray-400">$416 bi-weekly</h3>
                <h3 className="text-gray-400">One week until completed</h3>
              </div>
            </div>
          </animated.div>
      </div>
      {/* {
        authContext.authState.user.goals.length === 0
        ? (
          <div className="text-center">
            <h1 className="text-4xl mb-4 text-blue-500 font-bold">No goals yet</h1>
            <p className="w-5/12 mb-12 text-lg leading-loose m-auto">
              Saving goals allow you to make things happen in your financial life. Setup a goal now and let Buddy Bear calculate how much you need to put away to meet that goal by your due date.
            </p>
            <a href="/" className="py-4 px-12 bg-blue-600 hover:bg-blue-800 transition-colors text-white font-medium rounded-full">Make a Goal</a>
          </div>
        )
        : null
      } */}
    </>
  )
};

export default Dashboard;
