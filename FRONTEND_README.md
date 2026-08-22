# Frontend React Build and Backend Spring Boot Deployment Guide

## Frontend Setup (Local Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Run Frontend Locally

```bash
cd frontend
npm install
npm start
```

The React app will run on `http://localhost:3000` and automatically proxy API calls to `http://localhost:8080`.

### Build Frontend for Production

```bash
cd frontend
npm run build
```

This creates optimized production build in `frontend/build` directory.

## Backend Setup

### Prerequisites
- Java 21+
- Maven 3.9+

### Run Backend Locally

```bash
# Terminal 1: Start backend
mvn clean spring-boot:run
```

Backend API runs on `http://localhost:8080/api`

## Docker Development

### Build Multi-Stage Image

```bash
# Using multi-stage Dockerfile
docker build -f Dockerfile.multistage -t bank-management-app:latest .

# Run container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/bankdb \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=root \
  bank-management-app:latest
```

Access the app at `http://localhost:8080`

## Docker Compose

```bash
docker-compose up --build
```

## Environment Variables

### Frontend
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:8080/api)

### Backend
- `SPRING_DATASOURCE_URL` - MySQL database URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `SPRING_JPA_HIBERNATE_DDL_AUTO` - Hibernate DDL strategy (create, update, validate, none)
