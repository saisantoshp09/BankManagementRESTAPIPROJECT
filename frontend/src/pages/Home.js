import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 home-container">

      {/* Welcome Section */}
      <Row className="mb-5">
        <Col>
          <h1 className="page-title">
            Welcome to Bank Management System
          </h1>

          <p className="lead">
            Manage your bank accounts, transactions, and interest accruals with ease.
          </p>
        </Col>
      </Row>

      {/* Feature Cards */}
      <Row className="g-4">

        {/* Account Management */}
        <Col md={4}>
          <Card
            className="feature-card clickable-card"
            onClick={() => navigate('/accounts')}
          >
            <Card.Body>

              <h5 className="card-title">
                💳 Account Management
              </h5>

              <p className="card-text">
                Create and manage multiple accounts with different holders and balances.
              </p>

              <Button
                variant="primary"
                className="card-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/accounts');
                }}
              >
                View Accounts →
              </Button>

            </Card.Body>
          </Card>
        </Col>

        {/* Transactions */}
        <Col md={4}>
          <Card
            className="feature-card clickable-card"
            onClick={() => navigate('/transactions')}
          >
            <Card.Body>

              <h5 className="card-title">
                💰 Transactions
              </h5>

              <p className="card-text">
                Track deposits and withdrawals and manage your account transactions.
              </p>

              <Button
                variant="primary"
                className="card-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/transactions');
                }}
              >
                View Transactions →
              </Button>

            </Card.Body>
          </Card>
        </Col>

        {/* Interest Accruals */}
        <Col md={4}>
          <Card
            className="feature-card clickable-card"
            onClick={() => navigate('/interest-accruals')}
          >
            <Card.Body>

              <h5 className="card-title">
                📈 Interest Accruals
              </h5>

              <p className="card-text">
                Monitor interest rates and earnings on your bank accounts.
              </p>

              <Button
                variant="primary"
                className="card-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/interest-accruals');
                }}
              >
                View Interest →
              </Button>

            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* Quick Start */}
      <Row className="mt-5">
        <Col>

          <Card>
            <Card.Body>

              <h5>Quick Start</h5>

              <ul>
                <li>
                  Navigate to <strong>Accounts</strong> to create new accounts
                </li>

                <li>
                  Go to <strong>Transactions</strong> to manage deposits and withdrawals
                </li>

                <li>
                  Check <strong>Interest Accruals</strong> to monitor interest on your accounts
                </li>
              </ul>

            </Card.Body>
          </Card>

        </Col>
      </Row>

    </Container>
  );
}

export default Home;