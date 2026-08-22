# 📋 AWS Deployment Checklist

## Pre-Deployment (Do These FIRST)

### Account & Access
- [ ] AWS Account created and verified
- [ ] Free tier eligibility confirmed
- [ ] AWS Console accessible
- [ ] AWS CLI installed (optional but helpful)
- [ ] AWS credentials configured

### Local Environment
- [ ] Java 21 installed
- [ ] Maven installed (or using mvnw.cmd)
- [ ] Git installed
- [ ] Windows PowerShell available (or terminal for Linux/Mac)
- [ ] Project cloned to: `D:\JAVA-GITPRACTICE\BankManagementRESTAPIPROJECT`

### Project Ready
- [ ] Code compiles without errors
- [ ] Tests pass (or skipped for deployment)
- [ ] No hardcoded credentials in code
- [ ] `.gitignore` updated with AWS files

---

## Phase 1: Build Application ⚙️

### Command
```powershell
cd D:\JAVA-GITPRACTICE\BankManagementRESTAPIPROJECT
.\build-for-aws.bat
```

### Verification
- [ ] Build completes successfully (BUILD SUCCESS)
- [ ] JAR file created: `target\BankMangementApp-0.0.1-SNAPSHOT.jar`
- [ ] JAR size: ~45 MB (OK for AWS)
- [ ] No warnings or errors

---

## Phase 2: Create AWS Resources 🗄️

### RDS MySQL Database Creation

**Step 1: Navigate**
- [ ] AWS Console → RDS
- [ ] Click "Create Database"

**Step 2: Configuration**
- [ ] Engine: MySQL
- [ ] Template: **Free Tier**
- [ ] DB Instance Identifier: `bankdb`
- [ ] Master Username: `admin`
- [ ] Master Password: `[Strong Password]` ✍️ **SAVE THIS!**
- [ ] Instance Class: `db.t3.micro` (Free tier)
- [ ] Storage: 20 GB (Free tier)
- [ ] Public Accessibility: **Yes**

**Step 3: Create**
- [ ] Click "Create Database"
- [ ] **Wait 5-10 minutes** for creation

**Step 4: Get Endpoint**
- [ ] RDS Console → Click `bankdb`
- [ ] Copy Endpoint (looks like: `bankdb.xxxxx.us-east-1.rds.amazonaws.com`)
- [ ] **Save endpoint**: `_______________________________`
- [ ] **Save password**: `_______________________________`
- [ ] **Save region**: `us-east-1` (or your region)

---

## Phase 3: Elastic Beanstalk Deployment 🚀

### Step 1: Create Application
- [ ] AWS Console → Elastic Beanstalk
- [ ] Application Name: `BankManagementApp`
- [ ] Platform: Java
- [ ] Platform Branch: **Java 21 running on 64bit Amazon Linux 2023**

### Step 2: Create Environment
- [ ] Environment Type: **Web Server**
- [ ] Environment Name: `BankManagementApp-env`
- [ ] Upload your JAR file
- [ ] Click "Create Environment"

### Step 3: Wait for Deployment
- [ ] Deployment in progress (shows as Yellow/Blue)
- [ ] **Wait 10-15 minutes**
- [ ] Status changes to "Green" (Ready)

### Step 4: Get Environment URL
- [ ] Elastic Beanstalk Console → Environment
- [ ] Copy **Environment URL** (looks like: `BankManagementApp-env.xxxxx.us-east-1.elasticbeanstalk.com`)
- [ ] **Save URL**: `_______________________________`

---

## Phase 4: Configure Environment Variables ⚙️

### In Elastic Beanstalk Console

1. Click **Configuration** (left menu)
2. Find **Environment Properties** section
3. Add these variables:

```
Name:                       Value:
─────────────────────────────────────────────────────────────────
SPRING_PROFILES_ACTIVE      prod
DB_URL                      jdbc:mysql://YOUR-RDS-ENDPOINT:3306/bankdb
DB_USERNAME                 admin
DB_PASSWORD                 YOUR-RDS-PASSWORD
```

4. Click **Apply** and wait for environment update (~5 minutes)

### Verification
- [ ] "Environment Update in Progress" shows
- [ ] Wait for update to complete
- [ ] Status returns to "Green"

---

## Phase 5: Configure Security Groups 🔐

### Update RDS Security Group

1. AWS Console → RDS → `bankdb`
2. Note the VPC Security Group
3. AWS Console → EC2 → Security Groups
4. Find RDS security group
5. **Inbound Rules** → **Edit inbound rules**
6. Add Rule:
   ```
   Type: MySQL/Aurora (3306)
   Source: (Select EB security group)
   ```
7. Save rules

- [ ] RDS Security Group updated
- [ ] EB to RDS traffic allowed on port 3306

---

## Phase 6: Test Deployment ✅

### Test 1: API Health Check
```powershell
$url = "http://YOUR-EB-URL/api/accounts"
Invoke-WebRequest -Uri $url -Method Get
```

- [ ] Response code: 200 (OK)
- [ ] Response body: JSON array (empty `[]` is OK)

### Test 2: Application Status
- [ ] Elastic Beanstalk Console → Status shows "Green"
- [ ] No errors in logs

### Test 3: Database Connection
- [ ] No timeout errors
- [ ] No "connection refused" errors
- [ ] No authentication errors

### Test 4: Browser Test (Optional)
- [ ] Open browser
- [ ] Visit: `http://your-eb-url/api/accounts`
- [ ] Should show content (empty array is fine)

---

## Phase 7: Setup Monitoring & Alerts 📊

### CloudWatch Alerts
- [ ] AWS Console → CloudWatch
- [ ] Create alarm for EC2 CPU > 80%
- [ ] Create alarm for RDS CPU > 80%
- [ ] Create alarm for RDS Database Connections

### Billing Alerts
- [ ] AWS Console → Billing → Budgets
- [ ] Create budget for monthly spend
- [ ] Alert if charges exceed $5/month (safety net)
- [ ] Enable email notifications

- [ ] Monitoring setup complete

---

## Maintenance Checklist 🔧

### Daily (First week)
- [ ] Check CloudWatch metrics
- [ ] Monitor application logs
- [ ] Verify API response times
- [ ] Check error rates

### Weekly
- [ ] Review CloudWatch dashboards
- [ ] Check RDS backups are running
- [ ] Monitor data transfer costs
- [ ] Verify application health

### Monthly
- [ ] Review AWS billing
- [ ] Update dependencies
- [ ] Test disaster recovery (backups)
- [ ] Review security settings

### Quarterly
- [ ] Rotate database password
- [ ] Update security patches
- [ ] Review access logs
- [ ] Optimize database performance

---

## Important Links & Credentials

```
AWS Console:           https://console.aws.amazon.com/

RDS Endpoint:         _______________________________
RDS Username:         admin
RDS Password:         _______________________________

EB Environment URL:   _______________________________
EB Environment Name:  BankManagementApp-env

Discord/Slack Token:  (if automating notifications)
AWS Region:           us-east-1 (or your region)
```

---

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Can't reach API | Check Security Group > Inbound HTTP(80) rule |
| 502 Bad Gateway | Check logs: EB Console > Recent Logs |
| DB Connection Error | Update RDS Security Group to allow MySQL |
| Slow Response | Check EC2 CPU in CloudWatch |
| Data Transfer Expensive | Monitor RDS outbound traffic |

👉 **For more help:** See `AWS_TROUBLESHOOTING.md`

---

## Success Criteria ✨

Your deployment is successful when:

✅ Application builds: `BUILD SUCCESS`  
✅ JAR file created: `45.4 MB`  
✅ RDS Status: `Available`  
✅ EB Environment: `Green`  
✅ API responds: HTTP 200  
✅ Database connected: No errors  
✅ CloudWatch monitoring: Active  
✅ Billing alerts: Configured  

---

## After Deployment (Next Steps)

- [ ] Set up custom domain (Route53)
- [ ] Enable HTTPS (ACM certificate)
- [ ] Configure CI/CD (CodePipeline)
- [ ] Add monitoring dashboard
- [ ] Set up automated backups
- [ ] Document your deployment
- [ ] Share URL with team

---

## Emergency Contacts

- **AWS Support:** https://console.aws.amazon.com/support/
- **AWS Documentation:** https://docs.aws.amazon.com/
- **Stack Overflow:** Tag: aws, elastic-beanstalk, spring-boot
- **Your System Admin:** [Your contact info]

---

**Deployment Date:** ____________  
**Deployed By:** ____________  
**Status:** ____________  

---

**Remember:** Most issues are database connection related. Check security groups first! 🔍

