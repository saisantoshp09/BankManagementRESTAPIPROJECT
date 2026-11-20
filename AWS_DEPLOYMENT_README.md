# 🏦 Bank Management REST API - AWS Deployment Guide

Welcome! This guide will help you deploy your Spring Boot application to AWS using the **Free Tier**.

---

## 📚 Documentation Files

### Quick Start (Start Here!)
- **[AWS_QUICKSTART.md](AWS_QUICKSTART.md)** - 5-minute overview
- **[AWS_STEP_BY_STEP.md](AWS_STEP_BY_STEP.md)** - Detailed Windows PowerShell steps

### Detailed Guides
- **[AWS_DEPLOYMENT_GUIDE.md](AWS_DEPLOYMENT_GUIDE.md)** - Comprehensive deployment guide
- **[AWS_ALTERNATIVES.md](AWS_ALTERNATIVES.md)** - Alternative deployment methods
- **[AWS_TROUBLESHOOTING.md](AWS_TROUBLESHOOTING.md)** - Common issues & solutions

### Configuration
- **[application-prod.properties](src/main/resources/application-prod.properties)** - Production config
- **[Dockerfile](Dockerfile)** - Docker configuration (optional)
- **[.ebextensions/](/.ebextensions/)** - Elastic Beanstalk settings

### Build Scripts
- **[build-for-aws.bat](build-for-aws.bat)** - Build script for Windows
- **[build-for-aws.sh](build-for-aws.sh)** - Build script for Linux/Mac

---

## 🚀 Quick Deploy (5 Steps)

### 1️⃣ Build Application (Windows)
```powershell
cd D:\JAVA-GITPRACTICE\BankManagementRESTAPIPROJECT
.\build-for-aws.bat
```
✅ Creates: `target\BankMangementApp-0.0.1-SNAPSHOT.jar`

### 2️⃣ Create RDS Database
- AWS Console → RDS → Create Database
- Engine: MySQL
- Template: Free Tier
- DB Name: `bankdb`
- Master User: `admin`
- Password: (create strong password)
- Wait 5-10 minutes for creation

💾 **Save your RDS Endpoint:** `bankdb.xxxxx.us-east-1.rds.amazonaws.com`

### 3️⃣ Deploy to Elastic Beanstalk
- AWS Console → Elastic Beanstalk → Create Application
- Platform: Java 21 with Corretto
- Upload: Your JAR file
- Wait 10-15 minutes for deployment

### 4️⃣ Configure Environment Variables
In Elastic Beanstalk → Configuration → Environment Properties:
```
SPRING_PROFILES_ACTIVE = prod
DB_URL = jdbc:mysql://YOUR-RDS-ENDPOINT:3306/bankdb
DB_USERNAME = admin
DB_PASSWORD = your-password
```

### 5️⃣ Test Your API
```
Browser: http://your-eb-url/api/accounts
PowerShell: Invoke-WebRequest -Uri http://your-eb-url/api/accounts
```

---

## 💰 AWS Free Tier

| Service | Free Tier | Duration |
|---------|-----------|----------|
| **EC2 (t2.micro)** | 750 hours/month | 12 months |
| **RDS MySQL (db.t3.micro)** | 750 hours/month | 12 months |
| **Data Transfer** | 100GB outbound | Per month |
| **Elastic Beanstalk** | Uses EC2 (free above) | Always free |

**Estimated Cost:** **$0/month** for first 12 months (if within free tier)

---

## 📋 Project Structure

```
BankManagementRESTAPIPROJECT/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/Bankrestapi/bankapp/
│   │   │       ├── BankMangementAppApplication.java
│   │   │       ├── Controller/
│   │   │       ├── Service/
│   │   │       ├── entity/
│   │   │       └── repo/
│   │   └── resources/
│   │       ├── application.properties (local development)
│   │       └── application-prod.properties ⭐ (AWS production)
│   └── test/
├── Dockerfile ⭐ (optional, for Docker deployment)
├── pom.xml (Maven configuration)
├── .ebextensions/ ⭐ (Elastic Beanstalk config)
│   └── iam-policy.config
├── build-for-aws.bat ⭐ (Windows build script)
├── build-for-aws.sh ⭐ (Linux/Mac build script)
└── AWS documentation/
    ├── AWS_QUICKSTART.md (read first!)
    ├── AWS_STEP_BY_STEP.md (detailed steps)
    ├── AWS_DEPLOYMENT_GUIDE.md (comprehensive)
    ├── AWS_ALTERNATIVES.md (other methods)
    └── AWS_TROUBLESHOOTING.md (problem solving)
```

⭐ = Files created/modified for AWS deployment

---

## 🛠️ Technology Stack

- **Framework:** Spring Boot 3.3.1
- **Language:** Java 21 (Amazon Corretto)
- **Build Tool:** Maven
- **Database:** MySQL
- **Deployment:** AWS Elastic Beanstalk
- **Database Hosting:** AWS RDS

---

## 📖 Where to Start?

### 👤 If you're new to AWS:
1. Read: [AWS_QUICKSTART.md](AWS_QUICKSTART.md) (5 min)
2. Follow: [AWS_STEP_BY_STEP.md](AWS_STEP_BY_STEP.md) (30 min)

### 👨‍💼 If you're experienced with AWS:
1. Quick scan: [AWS_DEPLOYMENT_GUIDE.md](AWS_DEPLOYMENT_GUIDE.md)
2. Build and deploy directly
3. Reference: [AWS_TROUBLESHOOTING.md](AWS_TROUBLESHOOTING.md) if issues

### 🔄 If you want Docker/alternatives:
1. Read: [AWS_ALTERNATIVES.md](AWS_ALTERNATIVES.md)
2. Choose your preferred method
3. Follow that section's instructions

---

## ✅ Pre-Deployment Checklist

Before you start, make sure you have:

- [ ] AWS Account (with free tier eligibility)
- [ ] AWS credentials configured or ready
- [ ] Java 21 installed
- [ ] Maven installed
- [ ] Windows PowerShell (or terminal for Linux/Mac)
- [ ] Project code ready to deploy

---

## 🔒 Security Checklist

### Before Deploying:
- [ ] Changed default RDS password
- [ ] Updated security groups appropriately
- [ ] Removed hardcoded credentials from code
- [ ] Added environment variables for sensitive data
- [ ] Set up billing alerts

### Best Practices:
- [ ] Use IAM roles for AWS access (not access keys)
- [ ] Enable RDS backups
- [ ] Set strong password policy
- [ ] Monitor CloudWatch logs
- [ ] Enable VPC for network isolation

---

## 📊 Deployment Options

### **Option 1: Elastic Beanstalk** (Recommended for beginners)
✅ Easiest  
✅ Automatic scaling  
✅ Built-in load balancing  
✅ Free tier eligible  
⏱️ 15 minutes to deploy

**👉 Use this method for quick deployment**

### **Option 2: Docker + ECR** (Recommended for production)
✅ More portable  
✅ Easier to manage versions  
✅ Better for CI/CD  
✅ Free tier eligible  
⏱️ 30 minutes to deploy

**👉 Use after you're comfortable with deployment**

### **Option 3: EC2 + Manual Setup**
✅ Maximum control  
✅ Lowest cost  
⚠️ Requires manual management  
✅ Free tier eligible  
⏱️ 45 minutes to deploy

**👉 Use only if you need full control**

---

## 🚨 Common Issues (Quick Fixes)

### ❌ "Cannot connect to database"
→ Check RDS security group allows port 3306 from EC2 security group

### ❌ "502 Bad Gateway"
→ Check application logs in Elastic Beanstalk console

### ❌ "Environment variables not working"
→ Deploy using Elastic Beanstalk console (not just uploading JAR)

### ❌ "Out of memory error"
→ Increase EC2 instance size (note: not free tier after upgrade)

👉 See [AWS_TROUBLESHOOTING.md](AWS_TROUBLESHOOTING.md) for detailed solutions

---

## 🔄 Deployment Workflow

```
┌─────────────────────────────────────────────┐
│ 1. Build JAR                                │
│    Command: .\build-for-aws.bat             │
└────────────────┬────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│ 2. Create AWS Resources                     │
│    - RDS MySQL database                     │
│    - Note RDS Endpoint & Password           │
└────────────────┬────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│ 3. Create Elastic Beanstalk Environment     │
│    - Upload JAR file                        │
│    - Set environment variables              │
│    - Wait for deployment                    │
└────────────────┬────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│ 4. Test Application                         │
│    - Call API endpoints                     │
│    - Check CloudWatch logs                  │
│    - Monitor performance                    │
└─────────────────────────────────────────────┘
```

---

## 📞 Getting Help

### Documentation
- [AWS Elastic Beanstalk Docs](https://docs.aws.amazon.com/elasticbeanstalk/)
- [AWS RDS Docs](https://docs.aws.amazon.com/rds/)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)

### Debugging
- Check application logs in Elastic Beanstalk console
- Use CloudWatch for monitoring
- Review [AWS_TROUBLESHOOTING.md](AWS_TROUBLESHOOTING.md)

### Community Help
- Stack Overflow (tag: aws, elastic-beanstalk, spring-boot)
- AWS Support Forum
- GitHub Issues

---

## 🎓 Next Steps After Deployment

1. **Monitor Your Application**
   - Set up CloudWatch dashboards
   - Configure billing alerts

2. **Add Features**
   - Enable HTTPS with ACM
   - Setup custom domain with Route53
   - Configure auto-scaling rules

3. **Setup CI/CD**
   - Connect to GitHub/GitLab
   - Use AWS CodePipeline
   - Auto-deploy on code push

4. **Scale Up**
   - Upgrade instance size if needed
   - Add RDS read replicas
   - Consider AWS Lambda for APIs

---

## 🎉 You're All Set!

**Next Action:** Read [AWS_QUICKSTART.md](AWS_QUICKSTART.md) and get started!

Questions? Check [AWS_TROUBLESHOOTING.md](AWS_TROUBLESHOOTING.md)

Good luck deploying your application on AWS! 🚀

---

**Last Updated:** July 2026  
**Tested With:** Java 21, Spring Boot 3.3.1, MySQL, AWS Free Tier

