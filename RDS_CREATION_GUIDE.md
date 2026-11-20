# 📊 AWS RDS MySQL Database - Complete Setup Guide

## What is RDS?
**RDS** (Relational Database Service) = Managed MySQL database hosted on AWS

---

## 🎯 Step-by-Step Guide to Create RDS

### STEP 1: Login to AWS Console
```
1. Go to: https://console.aws.amazon.com
2. Login with your AWS email and password
3. You'll see AWS Dashboard
```

### STEP 2: Open RDS Service
```
1. In top search bar, type: "RDS"
2. Click on "RDS" service (appears in dropdown)
3. You'll be taken to RDS Dashboard
```

### STEP 3: Create Database
```
1. In left menu, click: "Databases"
2. Click blue button: "Create database"
3. Configuration page opens
```

---

## 📝 STEP 4: Configure Database Settings

### Important: Select "STANDARD CREATE"
```
At top, you'll see two options:
  ☑️  Standard create (SELECT THIS)
  ○   Quick create
```

### Select Engine
```
Engine options:
  ☑️  MySQL (SELECT THIS)
  
Engine Version:
  Select: MySQL 8.0.xx (latest version)
```

### Select Template
```
⚠️ VERY IMPORTANT - Choose: "Free tier"
This keeps cost at $0 for 12 months!

Templates available:
  ○   Production
  ○   Dev/Test
  ☑️  Free tier (THIS ONE)
```

---

## 🔧 STEP 5: DB Instance Details

Fill in these fields:

| Field | Value | Example |
|-------|-------|---------|
| **DB instance identifier** | bankdb | bankdb |
| **Engine** | MySQL | (Auto-selected) |
| **Version** | 8.0.xx | (Latest) |
| **DB instance class** | db.t3.micro | (Free tier) |
| **Storage** | General Purpose (gp2) | (Default) |
| **Allocated storage** | 20 GB | (Free tier limit) |

### Step-by-Step Fields:

**1. DB Instance Identifier:**
```
Field: "DB instance identifier"
Value: bankdb
Purpose: Name of your database
```

**2. Credentials - Master username:**
```
Field: "Master username"
Value: admin
Purpose: Database admin user
```

**3. Credentials - Master password:**
```
Field: "Master password"
Value: YourStrongPassword123!

⚠️ IMPORTANT: 
- Must be 8+ characters
- Must include letters, numbers, symbols
- SAVE THIS PASSWORD SOMEWHERE SAFE!
- You'll need it to connect

Example strong passwords:
  ✅ MyDB@Pass123!
  ✅ SecureDBPassword2024!
  ✅ BankDB#Strong123
```

**4. Confirm password:**
```
Field: "Confirm password"
Value: YourStrongPassword123! (same as above)
```

---

## 🌐 STEP 6: Connectivity Settings

### Database Connectivity:
```
Compute resource: "Don't connect to an EC2 compute resource"
(Leave as default - we'll use Docker)
```

### Virtual Private Cloud (VPC):
```
VPC: "default" (Select default VPC)
```

### DB Subnet Group:
```
Create new DB subnet group: (Try these options)
  Option 1: Select existing subnet group (if available)
  Option 2: Let AWS create one automatically
```

### Public accessibility:
```
⚠️ IMPORTANT FOR DOCKER:
Public accessibility: "YES" (SELECT THIS)
  ○   No
  ☑️  Yes (THIS ONE)

Why? So Docker can connect to database from outside AWS
```

### VPC security group:
```
Create new: "Create new VPC security group"
Name: "bankdb-security-group" (or any name)
```

### Database authentication:
```
Leave default: "Password authentication"
```

---

## ⚙️ STEP 7: Additional Configuration (Optional but Recommended)

Scroll down to "Additional configuration" section:

### Initial database name:
```
Field: "Initial database name"
Value: bankdb
Purpose: Creates database automatically
```

### Database options:
```
DB parameter group: (Leave default)
DB option group: (Leave default)
Encryption: (Leave default - not needed for free tier)
```

### Backup:
```
Enable automated backups: YES (Recommended)
Backup retention period: 7 days
```

### Monitoring:
```
Enable Enhanced monitoring: NO (Not needed for free tier)
```

---

## ✅ STEP 8: Review and Create

### Final Review:
```
1. Scroll down to bottom
2. Review all settings
3. Check "Free tier" label appears
4. Look for "Estimated monthly cost: $0.00"
```

### Create:
```
1. Click blue button: "Create database"
2. Status shows: "Creating"
3. ⏳ WAIT 5-10 MINUTES for creation
```

---

## 📊 STEP 9: Monitor Creation Progress

### In AWS Console:
```
1. Go to RDS → Databases
2. Look for "bankdb" database
3. Check status:
   🟡 Creating... (wait)
   🟢 Available (ready to use)
```

### What you'll see:
```
Database: bankdb
Status: Creating (🟡 yellow)
↓ (wait 5-10 minutes)
Status: Available (🟢 green) ✅
```

---

## 🔑 STEP 10: Get Your Endpoint (When Status = Available)

Once status is **🟢 Available**:

1. Click on database name: **"bankdb"**
2. Scroll to **"Connectivity & security"** section
3. Look for **"Endpoint"** field
4. **Copy the endpoint** (looks like this):
   ```
   bankdb.c123456789.us-east-1.rds.amazonaws.com
   ```

### Save These Credentials:
```
RDS Endpoint:  bankdb.c123456789.us-east-1.rds.amazonaws.com
RDS Username:  admin
RDS Password:  YourStrongPassword123!
RDS Port:      3306 (default)
Database Name: bankdb
Region:        us-east-1 (or your region)
```

---

## 📋 Quick Checklist

- [ ] AWS Console logged in
- [ ] RDS service opened
- [ ] "Create database" clicked
- [ ] "Standard create" selected
- [ ] "MySQL" engine selected
- [ ] "Free tier" template selected
- [ ] DB identifier: `bankdb` entered
- [ ] Master username: `admin` entered
- [ ] Master password: Strong password entered
- [ ] Confirm password matched
- [ ] Public accessibility: **YES** selected
- [ ] Initial database name: `bankdb` entered
- [ ] "Create database" button clicked
- [ ] Status watching: Creating → Available
- [ ] Endpoint copied and saved

---

## ⏰ Timeline

```
Action                          Time
─────────────────────────────────────────
1. Fill out form                 2 minutes
2. Click "Create database"       1 minute
3. Wait for creation             5-10 minutes
────────────────────────────────────────
TOTAL TIME:                      ~15 minutes
```

---

## 🎯 Using Your RDS Database

After database is **Available**, you can use it with Docker:

```powershell
docker run -p 8080:8080 `
  -e SPRING_PROFILES_ACTIVE=prod `
  -e DB_URL="jdbc:mysql://bankdb.c123456789.us-east-1.rds.amazonaws.com:3306/bankdb" `
  -e DB_USERNAME=admin `
  -e DB_PASSWORD=YourStrongPassword123! `
  bankmanagement:1.0
```

---

## ❌ Common Mistakes to Avoid

| Mistake | Problem | Solution |
|---------|---------|----------|
| Selecting "Production" template | Charges money | Select **"Free tier"** |
| Public accessibility = NO | Docker can't connect | Set to **YES** |
| Weak password | Security issue | Use 8+ chars with symbols |
| Forgetting password | Can't connect | Save it in safe place NOW |
| Wrong EC2 security group | Can't connect | Select "No EC2" option |
| Wrong region | Costs more | Use **us-east-1** |

---

## 🚀 After Creation - What's Next?

Once RDS database is **Available**:

1. **Copy endpoint** ← Copy this!
2. **Run Docker command** with credentials
3. **Test API** at http://localhost:8080/api/accounts

---

## 💡 Pro Tips

✅ **Set billing alert** (limit to $5/month to be safe)  
✅ **Save password** in password manager  
✅ **Use free tier** to avoid charges  
✅ **Delete when done** if testing (costs money after free tier)  
✅ **Monitor** your AWS billing regularly  

---

## 🆘 Troubleshooting

### RDS not becoming Available?
- Wait longer (takes 5-15 minutes sometimes)
- Refresh page (F5)
- Check AWS status page

### Need to modify after creation?
- Click on database
- Click "Modify"
- Make changes
- Click "Apply immediately" or schedule

### Want to delete database?
- Click on database
- Actions → Delete
- Type "delete me"
- Confirm

---

## 📞 What's Next?

Once your RDS **status is Available**:

1. Copy the **endpoint**
2. Come back and tell me the endpoint
3. I'll help you run the Docker container with correct credentials

---

**Status:** Ready for RDS creation  
**Time to complete:** ~15 minutes  
**Cost:** $0 (free tier, first 12 months)

Go create your RDS database now! 🚀

