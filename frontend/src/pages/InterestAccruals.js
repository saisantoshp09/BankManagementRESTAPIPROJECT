import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { getInterestAccruals, createInterestAccrual, updateInterestAccrual, deleteInterestAccrual, getAccounts } from '../services/api';
import './InterestAccruals.css';

function InterestAccruals() {
  const [accruals, setAccruals] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    account_number: '',
    interest_rate: '',
    principal_amount: '',
    accrual_period: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [accRes, acctsRes] = await Promise.all([
        getInterestAccruals(),
        getAccounts()
      ]);
      setAccruals(accRes.data);
      setAccounts(acctsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data. ' + (err.response?.data?.message || err.message));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (accrual = null) => {
    if (accrual) {
      setEditingId(accrual.accrual_id);
      setFormData({
        account_number: accrual.account.account_number,
        interest_rate: accrual.interest_rate,
        principal_amount: accrual.principal_amount,
        accrual_period: accrual.accrual_period,
      });
    } else {
      setEditingId(null);
      setFormData({
        account_number: '',
        interest_rate: '',
        principal_amount: '',
        accrual_period: 'MONTHLY',
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
        await updateInterestAccrual(editingId, formData);
      } else {
        await createInterestAccrual(formData);
      }
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError('Failed to save interest accrual. ' + (err.response?.data?.message || err.message));
      console.error('Error saving accrual:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this interest accrual?')) {
      try {
        await deleteInterestAccrual(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete accrual. ' + (err.response?.data?.message || err.message));
        console.error('Error deleting accrual:', err);
      }
    }
  };

  if (loading) return <Container className="mt-5"><p>Loading interest accruals...</p></Container>;

  return (
    <Container className="mt-5 accruals-container">
      <h1 className="page-title">Interest Accruals Management</h1>
      
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => handleShowModal()}
      >
        + Add New Interest Accrual
      </Button>

      {accruals.length === 0 ? (
        <Alert variant="info">No interest accruals found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Accrual ID</th>
              <th>Account Number</th>
              <th>Interest Rate (%)</th>
              <th>Principal Amount</th>
              <th>Interest Earned</th>
              <th>Period</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accruals.map(accrual => (
              <tr key={accrual.accrual_id}>
                <td>{accrual.accrual_id}</td>
                <td>{accrual.account.account_number}</td>
                <td>{accrual.interest_rate?.toFixed(2)}%</td>
                <td>${accrual.principal_amount?.toFixed(2)}</td>
                <td>${accrual.interest_earned?.toFixed(2)}</td>
                <td>{accrual.accrual_period}</td>
                <td>{new Date(accrual.accrual_date).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(accrual)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(accrual.accrual_id)}
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
          <Modal.Title>{editingId ? 'Edit Interest Accrual' : 'Add New Interest Accrual'}</Modal.Title>
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
              <Form.Label>Interest Rate (%)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="interest_rate"
                value={formData.interest_rate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Principal Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="principal_amount"
                value={formData.principal_amount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Accrual Period</Form.Label>
              <Form.Select
                name="accrual_period"
                value={formData.accrual_period}
                onChange={handleInputChange}
                required
              >
                <option value="MONTHLY">Monthly</option>
                <option value="QUARTERLY">Quarterly</option>
                <option value="ANNUALLY">Annually</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {editingId ? 'Update Accrual' : 'Create Accrual'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default InterestAccruals;
