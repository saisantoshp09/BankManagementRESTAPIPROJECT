import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Account APIs
export const getAccounts = () => api.get('/accounts');
export const getAccountById = (id) => api.get(`/accounts/${id}`);
export const createAccount = (data) => api.post('/accounts', data);
export const updateAccount = (id, data) => api.put(`/accounts/${id}`, data);
export const deleteAccount = (id) => api.delete(`/accounts/${id}`);

// Transaction APIs
export const getTransactions = () => api.get('/transactions');
export const getTransactionById = (id) => api.get(`/transactions/${id}`);
export const createTransaction = (data) => api.post('/transactions', data);
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

// Interest Accrual APIs
export const getInterestAccruals = () => api.get('/interest-accruals');
export const getInterestAccrualById = (id) => api.get(`/interest-accruals/${id}`);
export const createInterestAccrual = (data) => api.post('/interest-accruals', data);
export const updateInterestAccrual = (id, data) => api.put(`/interest-accruals/${id}`, data);
export const deleteInterestAccrual = (id) => api.delete(`/interest-accruals/${id}`);

export default api;
