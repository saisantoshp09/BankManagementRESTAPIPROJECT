import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { getAccounts, depositAmount, withdrawAmount } from '../services/api';
import './Transactions.css';

function Transactions() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    account_number: '',
    transaction_type: 'DEPOSIT',
    amount: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);

      const res = await getAccounts();

      setAccounts(res.data);
      setError(null);
    } catch (err) {
      setError(
        'Failed to load accounts. ' +
        (err.response?.data?.message || err.message)
      );

      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = () => {
    setFormData({
      account_number: '',
      transaction_type: 'DEPOSIT',
      amount: '',
    });

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        account_number,
        transaction_type,
        amount,
      } = formData;

      if (!account_number || !amount) {
        setError('Please fill in all fields');
        return;
      }

      if (transaction_type === 'DEPOSIT') {
        await depositAmount(account_number, amount);
      } else {
        await withdrawAmount(account_number, amount);
      }

      handleCloseModal();

      await fetchAccounts();

      setError(null);
    } catch (err) {
      setError(
        'Failed to process transaction. ' +
        (err.response?.data?.message || err.message)
      );

      console.error('Error processing transaction:', err);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <Alert variant="info">
          Loading accounts...
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>💳 Transactions</h2>

      {error && (
        <Alert
          variant="danger"
          onClose={() => setError(null)}
          dismissible
        >
          {error}
        </Alert>
      )}

      <Button
        variant="primary"
        className="mb-3"
        onClick={handleShowModal}
      >
        ➕ New Transaction
      </Button>

      {accounts.length === 0 ? (
        <Alert variant="info">
          No accounts found. Please create an account first.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Account #</th>
              <th>Holder Name</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.account_number}>
                <td>{acc.account_number}</td>

                <td>
                  {acc.account_holder_name}
                </td>

                <td>
                  ${acc.account_balance?.toFixed(2)}
                </td>

                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setFormData({
                        account_number: acc.account_number,
                        transaction_type: 'DEPOSIT',
                        amount: '',
                      });

                      setShowModal(true);
                    }}
                  >
                    Deposit
                  </Button>

                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        account_number: acc.account_number,
                        transaction_type: 'WITHDRAWAL',
                        amount: '',
                      });

                      setShowModal(true);
                    }}
                  >
                    Withdraw
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formData.transaction_type === 'DEPOSIT'
              ? '💰 Deposit Money'
              : '💸 Withdraw Money'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>
                Account
              </Form.Label>

              <Form.Select
                name="account_number"
                value={formData.account_number}
                onChange={handleInputChange}
                required
                disabled
              >
                <option value="">
                  Select Account
                </option>

                {accounts.map((acc) => (
                  <option
                    key={acc.account_number}
                    value={acc.account_number}
                  >
                    {acc.account_number} -{' '}
                    {acc.account_holder_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Amount
              </Form.Label>

              <Form.Control
                type="number"
                step="0.01"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
            >
              {formData.transaction_type === 'DEPOSIT'
                ? 'Deposit'
                : 'Withdraw'}
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Transactions;

