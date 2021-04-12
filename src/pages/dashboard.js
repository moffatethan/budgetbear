import React, { useContext, useEffect, useState, useRef } from 'react'
import ProgressCircle from '../components/progressCircle'
import { ArrowUp, ArrowDown, AlertCircle } from 'react-feather'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import FormDrawer, { FormDrawerPage, FormDrawerPageHeader } from '../components/formDrawer/formDrawer';
import { useHistory } from 'react-router';
import Form, { FormGroup, FormInput } from '../components/form';
import { useSpring, animated } from 'react-spring';
import { AuthAxiosContext } from '../contexts/authAxios';

const Dashboard = (props) => {
  const history = useHistory();
  const formatter = new Intl.NumberFormat('en-US');
  const [formDrawerIsOpen, setFormDrawerIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(3000);
  const [goalData, setGoalData] = useState({
    goalAmounts: [],
    goalTotal: 0
  });
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AuthAxiosContext);

  const onSubmit = async (formValues) => {
    try {
      const body = {
        ...formValues,
        dueDate: (new Date(formValues.dueDate)).toLocaleDateString(),
        amount: parseFloat(formValues.amount)
      };
      setGoalData({
        ...goalData,
        goalTotal: goalData.goalTotal + parseFloat(formValues.amount)
      });
      setErrorMessage('');
      const { data } = await authAxios.post('goals/new', body);
      authContext.addGoal(data);
      setFormDrawerIsOpen(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  const loadAnimation = useSpring({
    from: {opacity: 0, transform: 'scale(0.95)'},
    to: {opacity: 1, transform: 'scale(1)'}
  });

  useEffect(() => {
    const goals = authContext.authState.user.goals;
    const goalAmounts = goals.map(goal => goal.monthlyContribution);
    const goalTotal = goalAmounts.reduce((acc, currentVal) => acc + currentVal, 0);
    setGoalData({
      ...goalData,
      goalAmounts: [...goalData.goalAmounts, goalAmounts],
      goalTotal: formatter.format(goalTotal)
    });
    setLoading(false);
  }, []);

  if (!authContext.authState.user.plaidLinked) {
    history.push('/dashboard/plaid/link')
  }

  const renderFormDrawer = () => (
    <FormDrawer status={formDrawerIsOpen} setStatus={setFormDrawerIsOpen}>
      <FormDrawerPage>
        <FormDrawerPageHeader
          heading="Create a new Goal"
          paragraph="Start saving toward that new vacation, or that new car."
        />
        <Form
          error={errorMessage}
          onSubmit={onSubmit}
          bottomNotice={<>Need some advice on setting goals? <a href="#" className='text-blue-500 underline'>Ask an advisor!</a></>}
          buttonText="Create Goal"
        >
          <FormGroup>
            <FormInput
              label="Goal name"
              type="text"
              name="name"
              placeholder="My rent"
              rules={{
                required: true
              }}
            />
            <FormInput
              label="Due date"
              type="date"
              name="dueDate"
              rules={{
                required: true
              }}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              label="Amount"
              type="number"
              name="amount"
              rules={{
                required: true
              }}
              placeholder="$3500"
              currencyMask
            />
          </FormGroup>
        </Form>
      </FormDrawerPage>
    </FormDrawer>
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  } else {
    return (
      <>
      {
        formDrawerIsOpen
        ? renderFormDrawer()
        : null
      }
      {
        parseFloat(goalData.goalTotal.replaceAll(',', '')) > income
        ? <animated.div style={loadAnimation} className="bg-red-400 rounded-md text-white my-3 p-3">
            <div className="flex justify-center">
              <AlertCircle />
              <p className="ml-2 font-medium">Your savings goals have exceeded your income. <a className="underline" href="#">Want some advice?</a></p>
            </div>
          </animated.div>
          : null
        }
        <animated.div style={loadAnimation} className="flex mb-8 md:flex-col lg:flex-row">
          <div className="p-8 flex-1 mr-2 bg-white rounded-xl shadow-lg lg:mb-0 md:mb-2">
            <h2 className="text-gray-600 mb-2 text-xl font-bold">Income</h2>
            <div className="text-5xl flex text-green-400 font-bold">
              <h1 className="mr-2">${formatter.format(income)}</h1>
              <span><ArrowUp size={48} /></span>
            </div>
          </div>
          <div className={`p-8 flex-1 mr-2 bg-white rounded-xl lg:mb-0 shadow-lg ${parseFloat(goalData.goalTotal.replaceAll(',', '')) > 3000 ? 'border-red-400 border-2' : ''} md:mb-2`}>
            <h2 className="text-gray-600 mb-2 text-xl font-bold">Saving Goals</h2>
            <div className="text-5xl flex text-red-400 font-bold">
              <h1 className="mr-2">${goalData.goalTotal}</h1>
              <span><ArrowDown size={48} /></span>
            </div>
          </div>
          <div className="p-8 flex-1 bg-white rounded-xl lg:mb-0 shadow-lg md:mb-2">
            <h2 className="text-gray-600 mb-2 text-xl font-bold">Free Spending</h2>
            <div className="text-5xl flex text-green-400 font-bold">
              <h1 className="mr-2">${formatter.format(income - parseFloat(goalData.goalTotal.replaceAll(',', '')))}</h1>
              <span><ArrowUp size={48} /></span>
            </div>
          </div>
        </animated.div>
        <div className="mb-8 flex items-end">
          <h1 className="font-bold flex-1 text-gray-800 text-4xl">Saving Goals</h1>
          {
            authContext.authState.user.goals.length === 0
            ? null
            : <button onClick={setFormDrawerIsOpen} className="py-4 px-12 bg-blue-600 hover:bg-blue-800 transition-colors text-white font-medium rounded-full">Make a Goal</button>
          }
        </div>
        {
          authContext.authState.user.goals.length === 0
          ? (
            <div className="text-center">
              <h1 className="text-4xl w-5/12 m-auto mb-8 text-blue-500 font-bold">Let's get you started with some goals.</h1>
              <button onClick={setFormDrawerIsOpen} className="py-4 px-12 bg-blue-600 hover:bg-blue-800 transition-colors text-white font-medium rounded-full">Make a Goal</button>
            </div>
          )
          : (
            <div className="grid grid-cols-2 gap-4">
              {
                authContext.authState.user.goals.map(goal => {
                  return (
                    <animated.div style={loadAnimation} className="bg-white flex p-8 h-auto rounded-xl shadow-lg">
                      <ProgressCircle fill="#34D399" radius="60" cxy="80" width="180" height="150" percent={30} />
                      <div>
                        <h2 className="text-xl text-green-900 font-bold leading-loose">{goal.name}</h2>
                        <div>
                          <h1 className="text-4xl text-gray-900 font-bold leading-snug">${formatter.format(goal.monthlyContribution)}/mo</h1>
                          <h3 className="text-gray-400">${formatter.format(goal.biWeeklyContribution)} bi-weekly</h3>
                        </div>
                      </div>
                    </animated.div>
                  )
                })
              }
            </div>
          )
        }
      </>
    )
  }

};

export default Dashboard;
