# AWS Deployment Guide - Bank Management REST API

## Overview
This guide will help you deploy your Spring Boot application to AWS using the **Free Tier** resources.

## Prerequisites
- AWS Account (Free Tier)
- AWS CLI installed and configured with your credentials
- Java 21 and Maven installed locally
- Git (for version control)

---

## Step 1: Create RDS MySQL Instance (Free Tier)

### Using AWS Console:
1. Go to **AWS Management Console** → **RDS**
2. Click **Create Database**
3. Choose **MySQL**
4. Select **Free Tier** template
5. Configure:
   - **DB Instance Identifier**: `bankdb`
   - **Master Username**: `admin`
   - **Master Password**: (create a strong password, save it)
   - **DB Instance Class**: `db.t3.micro` (free eligible)
   - **Storage**: `20 GB` (free eligible)
   - **Public accessibility**: `Yes` (for now, restrict in production)
6. Click **Create Database** and wait for it to be available (~5 minutes)

### Get your Database Endpoint:
- Once created, note the **Endpoint** (e.g., `bankdb.xxxxx.us-east-1.rds.amazonaws.com`)

---

## Step 2: Build the Application

Run the following commands in your project directory:

```bash
mvn clean package
```

This will create: `target/BankMangementApp-0.0.1-SNAPSHOT.jar`

---

## Step 3: Deploy to Elastic Beanstalk

### Option A: Using AWS Console (Easiest)

1. Go to **AWS Management Console** → **Elastic Beanstalk**
2. Click **Create Application**
3. Configure:
   - **Application Name**: `BankManagementApp`
   - **Platform**: Java 21 / Corretto 21
   - **Platform Branch**: Java 21 running on 64bit Amazon Linux 2023
4. Click **Create Environment** → **Web Server Environment**
5. Upload your JAR file from `target/BankMangementApp-0.0.1-SNAPSHOT.jar`
6. Click **Create Environment** and wait for deployment (~5 minutes)

### Option B: Using AWS CLI (Advanced)

```bash
# Initialize Elastic Beanstalk
eb init -p "Java 21 with Corretto 21" BankManagementApp --region us-east-1

# Create environment
eb create BankManagementApp-env

# Deploy your JAR
eb deploy
```

---

## Step 4: Configure Environment Variables in Elastic Beanstalk

Once your environment is created:

1. Go to **Elastic Beanstalk** → Your Environment → **Configuration**
2. Click **Edit** under **Updates, other**
3. Scroll to **Environment Properties** section
4. Add these environment variables:

```
DB_URL = jdbc:mysql://bankdb.xxxxx.us-east-1.rds.amazonaws.com:3306/bankdb
DB_USERNAME = admin
DB_PASSWORD = (your RDS password)
SPRING_PROFILES_ACTIVE = prod
```

5. Click **Apply Changes** and wait for the environment to update

---

## Step 5: Create Database Schema

Connect to your RDS instance and create the database:

```bash
# Using MySQL CLI (if installed)
mysql -h bankdb.xxxxx.us-east-1.rds.amazonaws.com -u admin -p -e "CREATE DATABASE IF NOT EXISTS bankdb;"
```

Or use **AWS RDS Query Editor** in the AWS Console

---

## Step 6: Test Your Deployment

Once deployed, test your API:

```bash
# Get your Elastic Beanstalk URL from the console
curl http://your-eb-environment.elasticbeanstalk.com/api/accounts
```

---

## Free Tier Limits (Important)

- **RDS MySQL**: 1 year free (db.t3.micro, 20 GB storage, 20 GB backup)
- **Elastic Beanstalk**: Free (you only pay for EC2 instance → free for first year)
- **EC2**: t2.micro free for 12 months

---

## Cost Optimization Tips

1. **Set up billing alerts** to monitor usage
2. **Auto-terminate idle resources**
3. **Use proper security groups** to restrict access
4. **Monitor your RDS connections**

---

## Troubleshooting

### Application won't start?
- Check Elastic Beanstalk logs: `eb logs`
- Verify environment variables are set correctly
- Check RDS security group allows inbound traffic on port 3306

### Cannot connect to database?
- Verify RDS endpoint is correct
- Check RDS security group allows inbound from Elastic Beanstalk
- Verify database credentials

### Need to rollback?
- In Elastic Beanstalk console, click **Application Versions** and select previous version
- Click **Deploy** to rollback

---

## Next Steps

1. Set up a CI/CD pipeline using **AWS CodePipeline**
2. Configure **CloudWatch** for monitoring
3. Set up **Route53** for a custom domain (optional)
4. Enable **HTTPS** with **ACM** (free certificate)

---

## Support

For more details:
- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)
- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [Spring Boot on AWS](https://aws.amazon.com/blogs/opensource/getting-started-with-spring-boot-on-aws/)

