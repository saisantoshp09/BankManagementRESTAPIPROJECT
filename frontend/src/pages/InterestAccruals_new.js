import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { getAccounts, createInterestAccrual, getTotalInterest, getInterestAccrualById } from '../services/api';
import './InterestAccruals.css';

function InterestAccruals() {
  const [accounts, setAccounts] = useState([]);
  const [interestData, setInterestData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    account_number: '',
    interest_rate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAccounts();
      setAccounts(res.data);
      
      const interestMap = {};
      for (const account of res.data) {
        try {
          const totalRes = await getTotalInterest(account.account_number);
          interestMap[account.account_number] = totalRes.data || 0;
        } catch (e) {
          interestMap[account.account_number] = 0;
        }
      }
      setInterestData(interestMap);
      setError(null);
    } catch (err) {
      setError('Failed to load data. ' + (err.response?.data?.message || err.message));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = () => {
    setFormData({
      account_number: '',
      interest_rate: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      const { account_number, interest_rate } = formData;
      
      if (!account_number || !interest_rate) {
        setError('Please fill in all fields');
        return;
      }

      await createInterestAccrual(account_number, interest_rate);
      handleCloseModal();
      fetchData();
      setError(null);
    } catch (err) {
      setError('Failed to accrue interest. ' + (err.response?.data?.message || err.message));
      console.error('Error accruing interest:', err);
    }
  };

  if (loading) {
    return <Container className="mt-5"><Alert variant="info">Loading accounts...</Alert></Container>;
  }

  return (
    <Container className="mt-5">
      <h2>📈 Interest Accruals</h2>
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      <Button 
        variant="primary" 
        className="mb-3"
        onClick={handleShowModal}
      >
        ➕ Calculate Interest
      </Button>

      {accounts.length === 0 ? (
        <Alert variant="info">No accounts found. Please create an account first.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Account #</th>
              <th>Holder Name</th>
              <th>Balance</th>
              <th>Total Interest Earned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(acc => (
              <tr key={acc.account_number}>
                <td>{acc.account_number}</td>
                <td>{acc.account_holder_name}</td>
                <td>${acc.account_balance?.toFixed(2)}</td>
                <td className="text-success fw-bold">
                  ${(interestData[acc.account_number] || 0).toFixed(2)}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        account_number: acc.account_number,
                        interest_rate: '',
                      });
                      setShowModal(true);
                    }}
                  >
                    Accrue Interest
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>📊 Calculate Interest</Modal.Title>
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
                disabled={formData.account_number !== ''}
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
                placeholder="e.g., 5.5"
                value={formData.interest_rate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Calculate & Accrue Interest
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default InterestAccruals;
