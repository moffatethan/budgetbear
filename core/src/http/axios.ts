import axios from 'axios';

export const PLAID_ENDPOINTS = {
  LINK_CREATE: 'link/token/create',
  PUBLIC_TOKEN_EXCHANGE: 'item/public_token/exchange'
}

export const sandboxApi = axios.create({
  baseURL: 'https://sandbox.plaid.com/'
});

export const developmentApi = axios.create({
  baseURL: 'https://development.plaid.com/'
});

export const getAxiosApi = (environment) => {
  console.log(environment);
  if (environment === 'development') {
    return developmentApi;
  }
  return sandboxApi;
};
