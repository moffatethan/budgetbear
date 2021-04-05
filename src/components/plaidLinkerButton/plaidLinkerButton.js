import React, { useCallback, useContext } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useHistory } from 'react-router';
import { AuthAxiosContext } from '../../contexts/authAxios';
import { AuthContext } from '../../contexts/authContext';

const PlaidLinkerButton = ({ linkToken }) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AuthAxiosContext);

  const onSuccess = useCallback((token, metadata) => {
    const sendPublicTokenToBackend = async (token, metadata) => {
      try {
        const { data } = await authAxios.post('plaid/exchangePublicToken', { publicToken: token, metadata });
        if (data === true) {
          authContext.setPlaidLinked(true);
          history.push('/dashboard');
        }
      } catch (err) {
        console.error(err);
      }
    }
    sendPublicTokenToBackend(token, metadata);
  }, []);

  const config = {
    token: linkToken,
    onSuccess
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready} className=" transition-colors bg-gray-800 px-10 py-5 rounded-xl text-white hover:bg-gray-900">
      Link bank account
    </button>
  );
};
export default PlaidLinkerButton;