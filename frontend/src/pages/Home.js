import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Home.css';

function Home() {
  return (
    <Container className="mt-5 home-container">
      <Row className="mb-5">
        <Col>
          <h1 className="page-title">Welcome to Bank Management System</h1>
          <p className="lead">
            Manage your bank accounts, transactions, and interest accruals with ease.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <h5 className="card-title">💳 Account Management</h5>
              <p className="card-text">
                Create and manage multiple accounts with different holders and balances.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <h5 className="card-title">💰 Transactions</h5>
              <p className="card-text">
                Track all deposits and withdrawals with detailed transaction history.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <h5 className="card-title">📈 Interest Accruals</h5>
              <p className="card-text">
                Monitor interest rates and earnings on your accounts.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body>
              <h5>Quick Start</h5>
              <ul>
                <li>Navigate to <strong>Accounts</strong> to create new accounts</li>
                <li>Go to <strong>Transactions</strong> to manage deposits and withdrawals</li>
                <li>Check <strong>Interest Accruals</strong> to monitor interest on your accounts</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
