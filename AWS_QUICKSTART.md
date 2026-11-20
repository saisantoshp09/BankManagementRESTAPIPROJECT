# AWS Free Tier Deployment - Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Build Your Application
**Windows:**
```bash
.\build-for-aws.bat
```

**Linux/Mac:**
```bash
chmod +x build-for-aws.sh
./build-for-aws.sh
```

### 2. Create AWS RDS Database
```
Go to AWS Management Console → RDS → Create Database
- Choose MySQL
- Free Tier Template
- Instance: db.t3.micro
- Username: admin
- Password: (create strong password)
- Publicly accessible: Yes
```

Save your RDS Endpoint (looks like: `bankdb.xxxxx.us-east-1.rds.amazonaws.com`)

### 3. Deploy to Elastic Beanstalk

**Using AWS Console (Easiest):**
```
AWS Management Console → Elastic Beanstalk → Create Application
→ Create Environment (Web Server)
→ Upload JAR from target/BankMangementApp-0.0.1-SNAPSHOT.jar
→ Set Environment Variables:
   - DB_URL: jdbc:mysql://YOUR-RDS-ENDPOINT:3306/bankdb
   - DB_USERNAME: admin
   - DB_PASSWORD: (your password from step 2)
   - SPRING_PROFILES_ACTIVE: prod
```

### 4. Test Your API
```bash
curl http://your-environment-name.elasticbeanstalk.com/api/accounts
```

---

## 📋 What's Included

| File | Purpose |
|------|---------|
| `application-prod.properties` | Production configuration (uses env variables) |
| `AWS_DEPLOYMENT_GUIDE.md` | Detailed deployment instructions |
| `.ebextensions/` | Elastic Beanstalk configuration files |
| `build-for-aws.sh` | Build script for Linux/Mac |
| `build-for-aws.bat` | Build script for Windows |

---

## 🎯 Free Tier Details

✅ **Free for 12 months:**
- RDS MySQL: db.t3.micro, 20GB storage
- Elastic Beanstalk + EC2: t2.micro instance
- Data transfer: 15GB/month outbound

**Estimated Cost If Eligible:** $0/month for the first year

---

## ⚠️ Important

1. **Security**: Don't commit passwords to Git
2. **Database**: Create the `bankdb` database before deploying
3. **Credentials**: Use environment variables, not hardcoded values
4. **Monitoring**: Set up CloudWatch alerts for cost tracking

---

## 🔗 Next Steps After Deployment

1. Set up CloudWatch for monitoring
2. Configure Route53 for custom domain
3. Enable HTTPS with ACM certificate (free!)
4. Set up AWS CodePipeline for CI/CD

---

## 📞 Need Help?

- Check logs: AWS Console → Elastic Beanstalk → Logs
- Read detailed guide: `AWS_DEPLOYMENT_GUIDE.md`
- AWS Documentation: https://docs.aws.amazon.com/elasticbeanstalk/

Good luck! 🚀

