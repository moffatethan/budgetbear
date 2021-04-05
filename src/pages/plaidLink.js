import React, { useContext, useEffect, useState } from 'react';
import PlaidLinkerButton from '../components/plaidLinkerButton/plaidLinkerButton';
import { AuthAxiosContext } from '../contexts/authAxios';

const PlaidLink = () => {
  const { authAxios } = useContext(AuthAxiosContext);
  const [loading, setLoading] = useState(true);
  const [linkData, setLinkData] = useState({});

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const { data } = await authAxios.post('plaid/getLinkToken');
        setLinkData({
          linkToken: data.link_token,
          expiration: data.expiration,
          requestId: data.request_id
        });
      } catch (err) {
        throw err;
      }
    };
    fetchLinkToken();
  }, []);

  useEffect(() => {
    // ensure state is updated for linkData to pass to PlaidLinkerButton
    if (linkData.linkToken) {
      setLoading(false);
    }
  }, [linkData])
    
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl text-blue-600 font-bold">Link your bank account</h1>
        <p className="m-auto w-7/12 mt-8 text-lg leading-loose">
          To get started, link your bank account. This will allow Buddy Bear to get your balances and transactions. We utilize <a className="text-blue-500" target="_blank" href="https://www.plaid.com/">Plaid</a> to securely fetch your bank account data.
        </p>
      </div>
      <div className="text-center mt-10">
        {loading 
        ? <h1>Loading...</h1>
        : <PlaidLinkerButton linkToken={linkData.linkToken} />
        }
      </div>
    </>
  )

};

export default PlaidLink;
