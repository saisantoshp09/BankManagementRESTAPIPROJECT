# 🚀 AWS Deployment - Step by Step Instructions

## Environment: Windows PowerShell

Follow these exact steps to deploy your Bank Management REST API to AWS.

---

## Phase 1: Prepare Your Application (Local)

### Step 1: Build the Application
```powershell
cd D:\JAVA-GITPRACTICE\BankManagementRESTAPIPROJECT
.\build-for-aws.bat
```

**Expected Result:**
- JAR file created at: `target\BankMangementApp-0.0.1-SNAPSHOT.jar` (about 50MB)
- Should see: "✓ Build successful!"

---

## Phase 2: AWS Account Setup

### Step 2A: Login to AWS Console
1. Go to https://console.aws.amazon.com/
2. Login with your AWS credentials
3. Ensure you're in a **Free Tier eligible region** (e.g., **us-east-1**)

### Step 2B: Create RDS MySQL Database

**In AWS Console:**

1. Navigate to **RDS** (Relational Database Service)
2. Click **Databases** on the left menu
3. Click **Create Database** button
4. Choose **Standard Create**
5. Select **MySQL** as engine
6. Choose **Free Tier** from templates
7. Fill in the configuration:
   ```
   DB Instance Identifier:  bankdb
   Master Username:         admin
   Master Password:         YourStrongPassword123!
   Confirm Password:        YourStrongPassword123!
   DB Instance Class:       db.t3.micro
   Storage Type:            General Purpose (gp2)
   Allocated Storage:       20 GB (checkbox yes for auto-scaling)
   ```

8. **Connectivity Settings:**
   - VPC: default
   - Public Accessibility: **YES** (for AWS EB to connect)
   - Create Database Subnet Group: (name it bankdb-subnet-group)

9. **Additional Configuration:**
   - Initial Database Name: `bankdb`
   - Enable Automated Backups: YES
   - Backup retention period: 7 days

10. **Cost Estimate** should show: **FREE TIER ELIGIBLE** (first 12 months)

11. Click **Create Database** and **wait 5-10 minutes** for it to be available

### Step 2C: Get Your RDS Endpoint

Once RDS is created and status is "available":

1. In RDS Console, click on **bankdb**
2. Look for **Endpoint** (e.g., `bankdb.c123456789.us-east-1.rds.amazonaws.com`)
3. **Copy this endpoint** - you'll need it soon!

---

## Phase 3: Deploy to Elastic Beanstalk

### Step 3A: Create Elastic Beanstalk Application

**In AWS Console:**

1. Go to **Elastic Beanstalk**
2. Click **Create Application**
3. Configuration:
   ```
   Application Name:  BankManagementApp
   Platform:          Java
   Platform Branch:   Java 21 running on 64bit Amazon Linux 2023
   ```
4. Upload file: Select `target\BankMangementApp-0.0.1-SNAPSHOT.jar`
5. Click **Create Environment** (selects Web server environment automatically)
6. **Wait 10-15 minutes** for deployment to complete

### Step 3B: Configure Environment Variables

Once Elastic Beanstalk environment is created:

1. In **Elastic Beanstalk** console, click your environment name
2. Click **Configuration** in the left menu
3. Under **Environment Properties**, click **Edit**
4. Add these properties:

   ```
   Name                    Value
   ──────────────────────────────────────────────────────────────
   SPRING_PROFILES_ACTIVE  prod
   DB_URL                  jdbc:mysql://bankdb.c123456789.us-east-1.rds.amazonaws.com:3306/bankdb
   DB_USERNAME             admin
   DB_PASSWORD             YourStrongPassword123!
   ```

   (Use YOUR RDS endpoint from Step 2C!)

5. Click **Apply** and wait for environment to update (~5 minutes)

### Step 3C: Verify Security Groups (Important!)

1. Go to **EC2** → **Security Groups**
2. Find the security group used by:
   - Your Elastic Beanstalk instance (usually has "elasticbeanstalk" in name)
   - Your RDS database

3. **For RDS Security Group:**
   - Inbound Rules → Add Rule:
     ```
     Type: MySQL/Aurora (3306)
     Source: Choose "Security Group" → select EB security group
     ```

---

## Phase 4: Test Your Deployment

### Step 4A: Get Your Elastic Beanstalk URL

1. In Elastic Beanstalk console, find **Environment URL** (looks like: `BankManagementApp-env.xxxxxxxxx.us-east-1.elasticbeanstalk.com`)
2. Copy this URL

### Step 4B: Test the API

**In PowerShell:**

```powershell
# Test if application is running
$url = "http://BankManagementApp-env.xxxxxxxxx.us-east-1.elasticbeanstalk.com/api/accounts"
Invoke-WebRequest -Uri $url -Method Get

# If you see HTML response, your app is running! ✓
```

---

## 📊 Verify Everything is Working

✅ **Check these:**

1. **Elastic Beanstalk Status:**
   - Environment Health: **Green**
   - Latest Deployment Status: **Successful**

2. **RDS Status:**
   - DB Instance Status: **Available**

3. **Test API Endpoint:**
   - Open in browser: `http://your-eb-url/api/accounts`
   - Should return empty list `[]` (or your data)

---

## 💰 Cost Tracking

### Set up AWS Cost Alerts

1. Go to **AWS Billing**
2. Click **Billing Preferences**
3. Enable **Receive Billing Alerts**
4. Click **Manage Billing Alerts**
5. Create alert when estimated charges > $1.00

---

## 🔐 Important Security Notes

### Never commit these to Git:
```plaintext
- application.properties (with passwords)
- .aws credentials
- environment variables with secrets
```

### What you should do:
1. Store passwords in AWS Secrets Manager or Parameter Store
2. Use IAM roles for EC2/EB instances (not hardcoded credentials)
3. Restrict RDS security group to only allow Elastic Beanstalk

---

## 🆘 Troubleshooting

### Application won't start
**Check logs:**
```powershell
# The logs are in AWS Console:
# Elastic Beanstalk → Environment → Recent Logs
```

**Common issues:**
- ❌ Database connection error → Check DB_URL and DB_PASSWORD
- ❌ Port already in use → This is EB managed, shouldn't happen
- ❌ JAR file too large → Should be fine, compress if needed

### Can't connect to database
**Check:**
1. RDS is "Available" status
2. Security group allows port 3306 from EB security group
3. Database credentials are correct
4. Database name is `bankdb`

### Want to rollback?
1. Elastic Beanstalk → Application Versions
2. Select a previous version
3. Click "Deploy"

---

## 🚀 Next Steps (Optional)

1. **Add Custom Domain:**
   - Buy domain (Route53 or GoDaddy)
   - Point to Elastic Beanstalk URL

2. **Enable HTTPS:**
   - AWS Elastic Beanstalk → Configuration → Load Balancer
   - Add HTTPS listener with ACM certificate (free!)

3. **Setup CI/CD Pipeline:**
   - AWS CodePipeline + CodeBuild
   - Auto-deploy on Git push

4. **Monitor Application:**
   - CloudWatch Dashboards
   - Set up alarms

---

## 📞 Getting Help

**AWS Documentation:**
- https://docs.aws.amazon.com/elasticbeanstalk/
- https://docs.aws.amazon.com/rds/

**Check Application Logs:**
- Elastic Beanstalk Console → Your Environment → Logs → Request Logs

---

**Congratulations! Your app is now running on AWS! 🎉**

