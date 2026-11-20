import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { getAccounts, createAccount, updateAccount, deleteAccount } from '../services/api';
import './Accounts.css';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    account_holder_name: '',
    account_balance: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await getAccounts();
      setAccounts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load accounts. ' + (err.response?.data?.message || err.message));
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (account = null) => {
    if (account) {
      setEditingId(account.account_number);
      setFormData({
        account_holder_name: account.account_holder_name,
        account_balance: account.account_balance,
      });
    } else {
      setEditingId(null);
      setFormData({ account_holder_name: '', account_balance: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ account_holder_name: '', account_balance: '' });
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
        await updateAccount(editingId, formData);
      } else {
        await createAccount(formData);
      }
      handleCloseModal();
      fetchAccounts();
    } catch (err) {
      setError('Failed to save account. ' + (err.response?.data?.message || err.message));
      console.error('Error saving account:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await deleteAccount(id);
        fetchAccounts();
      } catch (err) {
        setError('Failed to delete account. ' + (err.response?.data?.message || err.message));
        console.error('Error deleting account:', err);
      }
    }
  };

  if (loading) return <Container className="mt-5"><p>Loading accounts...</p></Container>;

  return (
    <Container className="mt-5 accounts-container">
      <h1 className="page-title">Accounts Management</h1>
      
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => handleShowModal()}
      >
        + Add New Account
      </Button>

      {accounts.length === 0 ? (
        <Alert variant="info">No accounts found. Create one to get started!</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Holder Name</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.account_number}>
                <td>{account.account_number}</td>
                <td>{account.account_holder_name}</td>
                <td>${account.account_balance?.toFixed(2)}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(account)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(account.account_number)}
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
          <Modal.Title>{editingId ? 'Edit Account' : 'Add New Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Account Holder Name</Form.Label>
              <Form.Control
                type="text"
                name="account_holder_name"
                value={formData.account_holder_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Balance</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="account_balance"
                value={formData.account_balance}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editingId ? 'Update Account' : 'Create Account'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Accounts;
