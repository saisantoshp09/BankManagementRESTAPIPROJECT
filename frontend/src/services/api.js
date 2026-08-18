import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Account APIs
export const getAccounts = () => api.get('/account/getallaccounts');
export const getAccountById = (id) => api.get(`/account/${id}`);
export const createAccount = (data) => api.post('/account/create', data);
export const updateAccount = (id, data) => api.put(`/account/${id}`, data);
export const deleteAccount = (id) => api.delete(`/account/close/${id}`);

// Transaction APIs (deposit/withdraw)
export const getTransactions = () => api.get('/account/getallaccounts');
export const getTransactionById = (id) => api.get(`/account/${id}`);
export const depositAmount = (accountNumber, amount) => api.put(`/account/deposit/${accountNumber}/${amount}`);
export const withdrawAmount = (accountNumber, amount) => api.put(`/account/withdraw/${accountNumber}/${amount}`);

// Interest Accrual APIs
export const getInterestAccruals = () => api.get('/interest/history');
export const getInterestAccrualById = (accountNumber) => api.get(`/interest/history/${accountNumber}`);
export const createInterestAccrual = (accountNumber, interestRate) => api.post(`/interest/accrue/${accountNumber}/${interestRate}`);
export const getTotalInterest = (accountNumber) => api.get(`/interest/total/${accountNumber}`);

export default api;
