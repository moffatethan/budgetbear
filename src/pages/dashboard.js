import React, { useContext } from 'react'
import ProgressCircle from '../components/progressCircle'
import { ArrowUp, ArrowDown } from 'react-feather'
import { AuthContext } from '../contexts/authContext';
const Dashboard = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <div className="w-9/12 m-auto">
      <div className="mb-8">
        <h1 className="font-bold text-gray-800 text-4xl">Hey {authContext.authState.user.firstName}!</h1>
      </div>
      <div className="p-8 rounded-xl mb-3 bg-white shadow-lg">
        <b>Auth Debugger</b><br /><br />
        Token: {authContext.authState.token}<br/>
        Expires: {authContext.authState.expires}<br/>
        User Info: {JSON.stringify(authContext.authState.user)}<br/>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
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
      </div>
      <div className="mb-8 flex items-baseline">
        <h1 className="font-bold flex-1 text-gray-800 text-4xl">Saving Goals</h1>
        <a href="/" className="py-4 px-12 bg-blue-600 hover:bg-blue-800 transition-colors text-white font-medium rounded-full">Make a Goal</a>
      </div>
      <div className="grid grid-cols-2 gap-4">
      <div className="bg-white flex p-8 h-auto rounded-xl shadow-lg">
        <ProgressCircle fill="#34D399" radius="60" cxy="80" width="180" height="150" percent={100} />
          <div>
            <h2 className="text-xl text-green-900 font-bold leading-loose">Rent</h2>
            <div>
              <h1 className="text-4xl text-gray-900 font-bold leading-snug">$833/mo</h1>
              <h3 className="text-gray-400">$416 bi-weekly</h3>
              <h3 className="text-gray-400">One week until completed</h3>
            </div>
          </div>
        </div>
        <div className="bg-white flex p-8 h-auto rounded-xl shadow-lg">
          <ProgressCircle fill="#34D399" radius="60" cxy="80" width="180" height="150" percent={45} />
          <div>
            <h2 className="text-xl text-green-900 font-bold leading-loose">Rent</h2>
            <div>
              <h1 className="text-4xl text-gray-900 font-bold leading-snug">$833/mo</h1>
              <h3 className="text-gray-400">$416 bi-weekly</h3>
              <h3 className="text-gray-400">One week until completed</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
