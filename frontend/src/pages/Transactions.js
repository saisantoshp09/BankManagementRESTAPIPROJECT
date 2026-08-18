import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction, getAccounts } from '../services/api';
import './Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    account_number: '',
    transaction_type: 'DEPOSIT',
    amount: '',
    transaction_description: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [txnRes, accRes] = await Promise.all([
        getTransactions(),
        getAccounts()
      ]);
      setTransactions(txnRes.data);
      setAccounts(accRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data. ' + (err.response?.data?.message || err.message));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (transaction = null) => {
    if (transaction) {
      setEditingId(transaction.transaction_id);
      setFormData({
        account_number: transaction.account.account_number,
        transaction_type: transaction.transaction_type,
        amount: transaction.amount,
        transaction_description: transaction.transaction_description,
      });
    } else {
      setEditingId(null);
      setFormData({
        account_number: '',
        transaction_type: 'DEPOSIT',
        amount: '',
        transaction_description: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTransaction(editingId, formData);
      } else {
        await createTransaction(formData);
      }
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError('Failed to save transaction. ' + (err.response?.data?.message || err.message));
      console.error('Error saving transaction:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete transaction. ' + (err.response?.data?.message || err.message));
        console.error('Error deleting transaction:', err);
      }
    }
  };

  if (loading) return <Container className="mt-5"><p>Loading transactions...</p></Container>;

  return (
    <Container className="mt-5 transactions-container">
      <h1 className="page-title">Transactions Management</h1>
      
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => handleShowModal()}
      >
        + Add New Transaction
      </Button>

      {transactions.length === 0 ? (
        <Alert variant="info">No transactions found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Account Number</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.transaction_id}>
                <td>{txn.transaction_id}</td>
                <td>{txn.account.account_number}</td>
                <td>
                  <span className={`badge bg-${txn.transaction_type === 'DEPOSIT' ? 'success' : 'danger'}`}>
                    {txn.transaction_type}
                  </span>
                </td>
                <td>${txn.amount?.toFixed(2)}</td>
                <td>{txn.transaction_description}</td>
                <td>{new Date(txn.transaction_date).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(txn)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(txn.transaction_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Transaction' : 'Add New Transaction'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Account</Form.Label>
              <Form.Select
                name="account_number"
                value={formData.account_number}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Account</option>
                {accounts.map(acc => (
                  <option key={acc.account_number} value={acc.account_number}>
                    {acc.account_number} - {acc.account_holder_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleInputChange}
                required
              >
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAWAL">Withdrawal</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="transaction_description"
                value={formData.transaction_description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editingId ? 'Update Transaction' : 'Create Transaction'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Transactions;
