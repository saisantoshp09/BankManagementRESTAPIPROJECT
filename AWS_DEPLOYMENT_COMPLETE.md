# AWS Deployment Guide - Bank Management System

## Prerequisites

1. **AWS Free Tier Account** - Sign up at https://aws.amazon.com/free
2. **AWS CLI** - Install from https://aws.amazon.com/cli/
3. **Docker** - Install Docker Desktop
4. **Elastic Beanstalk CLI** - Install with `pip install awsebcli`
5. **Git** - Version control system

## Step 1: Set Up AWS Credentials

```bash
# Configure AWS CLI
aws configure

# You'll be prompted for:
# AWS Access Key ID: [Your AWS Access Key]
# AWS Secret Access Key: [Your AWS Secret Key]
# Default region: us-east-1
# Default output format: json
```

**Get AWS Credentials:**
1. Go to AWS Management Console
2. Navigate to IAM → Users → Your User
3. Click "Create access key" → "Command Line Interface (CLI)"
4. Copy Access Key ID and Secret Access Key

## Step 2: Create RDS MySQL Database

```bash
# Create RDS MySQL instance (Free Tier eligible)
aws rds create-db-instance \
  --db-instance-identifier bank-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username root \
  --master-user-password MySecurePassword123! \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxxxxx \
  --publicly-accessible \
  --backup-retention-period 7 \
  --region us-east-1
```

**Alternative: Create via AWS Console**
1. Go to RDS Dashboard
2. Click "Create database"
3. Choose MySQL
4. Select "Free tier" template
5. Set Master username: `root`
6. Set Master password: (secure password)
7. Configure VPC Security Group to allow port 3306
8. Click "Create database"

**Get RDS Endpoint:**
```bash
aws rds describe-db-instances \
  --db-instance-identifier bank-db \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text
```

## Step 3: Create Database and Tables

```bash
# Connect to RDS
mysql -h <your-rds-endpoint> -u root -p

# Create database
CREATE DATABASE bankdb;

# Use database
USE bankdb;

# Tables will be created automatically by Hibernat when app starts
```

## Step 4: Create Docker Repository

### Docker Hub
```bash
# Login to Docker Hub
docker login

# Create repository at https://hub.docker.com/repositories

# Tag image
docker tag bank-management-app:latest YOUR_DOCKER_USERNAME/bank-management-app:latest

# Push image
docker push YOUR_DOCKER_USERNAME/bank-management-app:latest
```

## Step 5: Initialize Elastic Beanstalk

```bash
# Initialize EB in your project
eb init -p docker bank-management-app --region us-east-1

# During setup, select:
# - Application name: bank-management-app
# - Platform: Docker
# - Region: us-east-1
# - CodeCommit: No (we're using GitHub)
```

## Step 6: Create EB Environment

```bash
# Create new environment
eb create bank-management-env \
  --instance-type t3.micro \
  --envvars SPRING_DATASOURCE_URL=jdbc:mysql://<RDS_ENDPOINT>:3306/bankdb,SPRING_DATASOURCE_USERNAME=root,SPRING_DATASOURCE_PASSWORD=<PASSWORD>

# Monitor creation
eb status

# Get environment URL
eb open
```

**Alternative: Create via AWS Console**
1. Go to Elastic Beanstalk
2. Create Application → "bank-management-app"
3. Create Environment → "bank-management-env"
4. Platform: Docker
5. Application code: Upload `Dockerrun.aws.json`
6. Configure instance: t3.micro
7. Environment properties: Add RDS connection details
8. Create environment

## Step 7: Configure Environment Variables

```bash
# Set environment variables
eb setenv \
  SPRING_DATASOURCE_URL=jdbc:mysql://<RDS_ENDPOINT>:3306/bankdb \
  SPRING_DATASOURCE_USERNAME=root \
  SPRING_DATASOURCE_PASSWORD=<PASSWORD> \
  SPRING_JPA_HIBERNATE_DDL_AUTO=update

# Verify
eb printenv
```

## Step 8: Deploy Application

### Option A: Using EB CLI

```bash
# Deploy
eb deploy

# Monitor deployment
eb status

# View logs
eb logs

# SSH into instance
eb ssh
```

### Option B: Using Jenkins Pipeline

```bash
# Create Jenkins credentials for:
# - AWS credentials
# - Docker Hub credentials
# - GitHub credentials

# Push to main branch to trigger pipeline
git push origin main

# Monitor Jenkins build
# Pipeline will automatically build, test, and deploy
```

## Step 9: Verify Deployment

```bash
# Get environment URL
EB_URL=$(eb open --print-url)

# Test API endpoints
curl $EB_URL/api/accounts
curl $EB_URL/api/transactions
curl $EB_URL/api/interest-accruals

# Access web UI
open $EB_URL
```

## Monitoring and Logs

### CloudWatch Logs
```bash
# View application logs
eb logs --stream

# View specific log
aws logs tail /aws/elasticbeanstalk/bank-management-env/var/log/eb-engine.log --follow
```

### EB Health Dashboard
```bash
# Monitor environment health
eb health

# Open health dashboard
eb appversion
```

## Scaling Configuration

```bash
# Configure auto-scaling
eb scale 2  # Set to 2 instances

# Configure scaling policies
eb config
# Edit under aws:autoscaling:asg section
```

## Cost Optimization (Free Tier)

⚠️ **Important Free Tier Limits:**
- EC2: t3.micro, 750 hours/month
- RDS: t3.micro, 750 hours/month
- Total: Can run 1 application + 1 database continuously

**Cost Monitoring:**
```bash
# Set up billing alerts
aws budgets create-budget \
  --account-id $(aws sts get-caller-identity --query Account --output text) \
  --budget file://budget.json
```

**Estimated Monthly Cost:**
- EC2 t3.micro: $0 (covered by free tier)
- RDS t3.micro: $0 (covered by free tier)
- Data transfer: ~$0.09 per GB (first 100GB free)
- **Total: ~$0 if usage stays within free tier**

## Troubleshooting

### 1. Deployment Fails

```bash
# Check logs
eb logs

# Check environment health
eb health

# SSH and check Docker
eb ssh
docker ps
docker logs bank-management-app
```

### 2. Database Connection Error

```bash
# Verify RDS is running
aws rds describe-db-instances --db-instance-identifier bank-db

# Check security group allows inbound 3306
aws ec2 describe-security-groups --group-ids <security-group-id>

# Test connection
mysql -h <rds-endpoint> -u root -p
```

### 3. Application Won't Start

```bash
# Check Docker image
docker pull YOUR_DOCKER_USERNAME/bank-management-app:latest

# Check environment variables
eb printenv

# Rebuild and deploy
eb deploy --timeout 20
```

### 4. Out of Free Tier

```bash
# Check billing
aws ce get-cost-and-usage \
  --time-period Start=2024-01-01,End=2024-01-31 \
  --granularity MONTHLY \
  --metrics UnblendedCost

# Stop environment if not needed
eb terminate bank-management-env
```

## Cleanup

```bash
# Stop EB environment
eb terminate bank-management-env

# Delete RDS instance
aws rds delete-db-instance \
  --db-instance-identifier bank-db \
  --skip-final-snapshot

# Delete application
eb appversion clean
```

## References

- [AWS Free Tier](https://aws.amazon.com/free)
- [Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [RDS Documentation](https://docs.aws.amazon.com/rds/)
- [EB CLI Reference](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)
