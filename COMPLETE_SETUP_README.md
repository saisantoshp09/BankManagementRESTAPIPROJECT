# Complete Bank Management System - React UI + Jenkins + AWS Deployment

## Project Overview

This is a full-stack bank management system with:
- **Backend**: Spring Boot REST API
- **Frontend**: React single-page application
- **Database**: MySQL (AWS RDS)
- **CI/CD**: Jenkins pipeline
- **Hosting**: AWS Elastic Beanstalk (Free Tier)

## Quick Start

### 1. Local Development (All Services)

```bash
# Start all services with Docker Compose
docker-compose up --build

# Services available at:
# - Frontend: http://localhost:3000 (through port 8080)
# - Backend API: http://localhost:8080/api
# - MySQL: localhost:3306
```

### 2. Local Development (Separate Terminals)

**Terminal 1: Backend**
```bash
mvn clean spring-boot:run
# API runs on http://localhost:8080/api
```

**Terminal 2: Frontend**
```bash
cd frontend
npm install
npm start
# UI runs on http://localhost:3000
```

### 3. Docker Build & Test

```bash
# Build multi-stage Docker image
docker build -f Dockerfile.multistage -t bank-management-app:latest .

# Run container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/bankdb \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=root \
  bank-management-app:latest
```

## Project Structure

```
BankManagementRESTAPIPROJECT/
├── frontend/                      # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/           # Reusable components (Navigation)
│   │   ├── pages/                # Page components (Accounts, Transactions, Interest)
│   │   ├── services/             # API service (axios integration)
│   │   ├── App.js                # Main app component
│   │   └── index.js              # React entry point
│   ├── package.json              # Node dependencies
│   └── Dockerfile                # (Part of multi-stage build)
│
├── src/main/java/                # Spring Boot Backend
│   └── com/Bankrestapi/bankapp/
│       ├── config/               # CORS & Other configs
│       ├── entity/               # JPA entities
│       ├── repo/                 # Spring Data repositories
│       ├── Service/              # Business logic
│       └── Controller/           # REST endpoints
│
├── .ebextensions/                # AWS Elastic Beanstalk config
├── .elasticbeanstalk/            # EB CLI config
├── Dockerfile.multistage         # Multi-stage Docker build
├── docker-compose.yml            # Local development compose
├── Jenkinsfile                   # CI/CD pipeline
├── Dockerrun.aws.json            # EB Docker config
├── pom.xml                       # Maven build file
└── README.md                     # This file
```

## Features Implemented

### Backend (Spring Boot)
✅ REST APIs for Accounts, Transactions, Interest Accruals
✅ MySQL database integration
✅ CORS configuration for React frontend
✅ JPA/Hibernate ORM
✅ Input validation & error handling

### Frontend (React)
✅ Responsive design with Bootstrap
✅ Account management (CRUD)
✅ Transaction management (CRUD)
✅ Interest accrual management (CRUD)
✅ Real-time API integration with Axios
✅ Modal forms for create/edit operations
✅ Error handling & loading states

### DevOps
✅ Multi-stage Docker build
✅ Docker Compose for local testing
✅ Jenkins CI/CD pipeline
✅ Elastic Beanstalk deployment
✅ AWS RDS MySQL integration

## Environment Setup

### Prerequisites
- Java 21+
- Node.js 18+
- Maven 3.9+
- Docker & Docker Compose
- Git

### Installation

1. **Clone repository**
```bash
git clone https://github.com/yourusername/BankManagementRESTAPIPROJECT.git
cd BankManagementRESTAPIPROJECT
```

2. **Backend dependencies**
```bash
mvn clean install
```

3. **Frontend dependencies**
```bash
cd frontend
npm install
```

4. **Create .env file** (if needed for environment-specific config)
```bash
echo "REACT_APP_API_URL=http://localhost:8080/api" > frontend/.env.local
```

## Configuration

### Development Environment Variables

**Backend** (`application.properties`):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bankdb
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
```

**Frontend** (`frontend/.env.local`):
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Production Environment Variables (AWS)

Set these in Elastic Beanstalk:
```
SPRING_DATASOURCE_URL=jdbc:mysql://your-rds-endpoint:3306/bankdb
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your-secure-password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

## Building & Deployment

### Build Backend
```bash
mvn clean package
```

### Build Frontend
```bash
cd frontend
npm run build
```

### Docker Build (Multi-stage)
```bash
docker build -f Dockerfile.multistage -t bank-management-app:latest .
```

### Deploy to AWS Elastic Beanstalk

1. **Configure AWS credentials**
```bash
aws configure
```

2. **Initialize EB**
```bash
eb init -p docker bank-management-app
```

3. **Create environment**
```bash
eb create bank-management-env \
  --instance-type t3.micro \
  --envvars SPRING_DATASOURCE_URL=jdbc:mysql://your-rds:3306/bankdb,SPRING_DATASOURCE_USERNAME=root,SPRING_DATASOURCE_PASSWORD=password
```

4. **Deploy**
```bash
eb deploy
```

See `AWS_DEPLOYMENT_COMPLETE.md` for detailed instructions.

## Jenkins CI/CD Pipeline

The pipeline includes these stages:

1. **Checkout** - Clone repository
2. **Build Backend** - Maven clean package
3. **Test Backend** - Run unit tests
4. **Build Frontend** - npm build
5. **Build Docker** - Multi-stage Docker build
6. **Push to Docker Hub** - Push image to registry
7. **Deploy to AWS** - Deploy to Elastic Beanstalk
8. **Health Check** - Verify deployment

### Jenkins Setup

1. Install Jenkins plugins:
   - Docker
   - AWS
   - GitHub

2. Create credentials:
   - `docker-username` & `docker-password`
   - `aws-credentials`
   - `github-credentials`

3. Create pipeline job:
   - Point to GitHub repository
   - Select `Jenkinsfile` from repo
   - Set to trigger on push to `main` branch

## API Endpoints

### Accounts
- `GET /api/accounts` - List all accounts
- `GET /api/accounts/{id}` - Get account details
- `POST /api/accounts` - Create account
- `PUT /api/accounts/{id}` - Update account
- `DELETE /api/accounts/{id}` - Delete account

### Transactions
- `GET /api/transactions` - List all transactions
- `GET /api/transactions/{id}` - Get transaction details
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Interest Accruals
- `GET /api/interest-accruals` - List all accruals
- `GET /api/interest-accruals/{id}` - Get accrual details
- `POST /api/interest-accruals` - Create accrual
- `PUT /api/interest-accruals/{id}` - Update accrual
- `DELETE /api/interest-accruals/{id}` - Delete accrual

## Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Integration Testing
```bash
# Using docker-compose
docker-compose up --build
# Run API tests against http://localhost:8080
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Error
- Verify CORS config in `src/main/java/com/Bankrestapi/bankapp/config/CorsConfig.java`
- Check frontend URL is in allowedOrigins

### Database Connection Error
- Verify MySQL is running and accessible
- Check database URL and credentials
- Ensure database `bankdb` exists

### Docker Build Fails
- Ensure Node.js 18+ and Java 21+ are available
- Check all dependencies in `package.json` and `pom.xml`
- Verify Docker daemon is running

## Performance & Scaling

### Current Setup
- Single t3.micro EC2 instance (free tier)
- Single RDS t3.micro MySQL database (free tier)
- Handles ~100 concurrent users

### Scaling Options
1. **Auto-scaling**: Configure ASG in EB
2. **Load balancing**: Add Application Load Balancer
3. **Caching**: Add ElastiCache (Redis)
4. **CDN**: Add CloudFront for static assets

## Security Considerations

✅ Implemented:
- CORS whitelist for trusted origins
- SQL parameterized queries via JPA
- HTTPS ready (configure in EB)

⚠️ To-Do:
- Add Spring Security for authentication
- Add API key validation
- Enable HTTPS/TLS
- Add rate limiting
- Implement JWT tokens

## Cost Optimization

**Free Tier Eligibility** (per month):
- EC2: t3.micro, 750 hours
- RDS: t3.micro, 750 hours
- Data transfer: First 100 GB free

**Monthly Cost**: ~$0 if within free tier limits

Monitor costs:
```bash
aws ce get-cost-and-usage \
  --time-period Start=2024-01-01,End=2024-01-31 \
  --granularity MONTHLY \
  --metrics UnblendedCost
```

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add feature"`
3. Push branch: `git push origin feature/your-feature`
4. Create Pull Request

## License

This project is open source and available under the MIT License.

## Support & Documentation

- [Detailed AWS Deployment Guide](./AWS_DEPLOYMENT_COMPLETE.md)
- [Frontend Development Guide](./FRONTEND_README.md)
- [API Documentation](./API_DOCS.md) (if available)

## Authors

- **Backend**: Sai Santosh P
- **Frontend & DevOps**: GitHub Copilot

---

**Last Updated**: August 2024
