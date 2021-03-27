import React from 'react'
import ProgressCircle from '../components/progressCircle'
import { ArrowUp, ArrowDown } from 'react-feather'
import { AuthConsumer } from '../contexts/authContext'
export default class Dashboard extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {state => {
          console.log(state);
          return (
            <div className="p-5">
              <button onClick={() => state.logout()}>LOGOUT</button>
              <div className="mb-8">
                <h1 className="font-bold text-gray-800 text-4xl">Hey Ethan!</h1>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div class="p-8 bg-white rounded-xl shadow-lg">
                  <h2 className="text-gray-600 mb-2 text-xl font-bold">Income</h2>
                  <div className="text-5xl flex text-green-400 font-bold">
                    <h1 className="mr-2">$2,500</h1>
                    <span><ArrowUp size={48} /></span>
                  </div>
                </div>
                <div class="p-8 bg-white rounded-xl shadow-lg">
                  <h2 className="text-gray-600 mb-2 text-xl font-bold">Saving Goals</h2>
                  <div className="text-5xl flex text-red-400 font-bold">
                    <h1 className="mr-2">$1,523</h1>
                    <span><ArrowDown size={48} /></span>
                  </div>
                </div>
                <div class="p-8 bg-white rounded-xl shadow-lg">
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
        }}
      </AuthConsumer>
    )
  }
}
