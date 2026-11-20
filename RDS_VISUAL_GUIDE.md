# 📸 AWS RDS Creation - Visual Step-by-Step Guide

## Print This and Follow Along! 🖨️

---

## STEP 1: Go to AWS Console

### URL:
```
https://console.aws.amazon.com
```

### What You See:
```
┌─────────────────────────────────────────────────────────────┐
│  AWS Management Console                                     │
│                                                              │
│  Services | Search: _____                                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Recently visited services:                              ││
│  │  EC2    S3    Lambda    CloudWatch                       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**What to do:** Click search box, type **"RDS"**

---

## STEP 2: Search and Click RDS

### What You Type:
```
Search box: [RDS________________]
```

### What Appears:
```
Results:
  ○ RDS (Relational Database Service)  ← CLICK THIS
  ○ RDS in AWS Management Console
  ○ RDS Custom
```

**Click:** RDS service

---

## STEP 3: RDS Dashboard

### You'll See This:
```
┌─────────────────────────────────────────────────────────────┐
│  RDS (Relational Database Service)                          │
│                                                              │
│  Left Menu:                                                 │
│  ☑ Databases  (CLICK THIS)                                 │
│  ○ Instances                                                │
│  ○ Parameter groups                                         │
│  ○ Option groups                                            │
│                                                              │
│  Main Area:                                                 │
│  [Create database] Button (blue)  ← CLICK THIS              │
└─────────────────────────────────────────────────────────────┘
```

**What to do:** Click **"Create database"** button

---

## STEP 4: Create Database Page (Part 1)

### You'll See This Form:

```
┌─────────────────────────────────────────────────────────────┐
│  Create database                                             │
│                                                              │
│  Choose a database creation method:                          │
│  ☑ Standard create      ← SELECT THIS                       │
│  ○ Quick create                                              │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│                                                              │
│  Engine options:                                             │
│  ○ Amazon Aurora                                             │
│  ☑ MySQL              ← SELECT THIS                         │
│  ○ MariaDB                                                   │
│  ○ PostgreSQL                                                │
│  ○ Oracle                                                    │
│  ○ SQL Server                                                │
│  ○ Other engines                                             │
│                                                              │
│  Engine Version: [MySQL 8.0.39 ▼] (Keep default)           │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│                                                              │
│  Templates:                                                  │
│  ○ Production                                                │
│  ○ Dev/Test                                                  │
│  ☑ Free tier          ← SELECT THIS (IMPORTANT!)             │
│                                                              │
│  ⚠️ This template is eligible for AWS Free Tier             │
└─────────────────────────────────────────────────────────────┘
```

**Actions:**
1. ☑️ Select "Standard create"
2. ☑️ Select "MySQL"
3. ☑️ Select "Free tier"

---

## STEP 5: DB Instance Details (Part 2)

### Form Section: Settings

```
┌─────────────────────────────────────────────────────────────┐
│  DB instance identifier:                                     │
│  [bankdb________________]  ← TYPE: bankdb                   │
│                                                              │
│  Master username:                                            │
│  [admin________________]   ← TYPE: admin                    │
│                                                              │
│  Master password:                                            │
│  [••••••••••••••••]        ← TYPE: YourStrongPass123!        │
│                                                              │
│  Confirm password:                                           │
│  [••••••••••••••••]        ← TYPE: YourStrongPass123!        │
│                                                              │
│  ──────────────────────────────────────────────────────────  │
│                                                              │
│  DB instance class:                                          │
│  ☑ Burstable classes (includes t classes)                   │
│    [db.t3.micro  ▼]      ← SHOULD BE THIS (Free tier)       │
│                                                              │
│  Storage type:                                               │
│  [General Purpose (SSD) ▼]  ← Keep default                  │
│                                                              │
│  Allocated storage:                                          │
│  [20 GB  ▼]               ← Keep 20 (Free tier max)          │
│  ☑ Enable storage autoscaling                               │
│                                                              │
│  Estimate: $0.00/month    ← SHOULD SHOW THIS!               │
└─────────────────────────────────────────────────────────────┘
```

**What to enter:**
- DB identifier: `bankdb`
- Username: `admin`
- Password: `YourStrongPassword123!` (save this!)
- Confirm: `YourStrongPassword123!` (same)

**Expected:** Should show "$0.00/month" estimate

---

## STEP 6: Connectivity Settings (Part 3)

### Form Section: Connectivity

Scroll down to **Connectivity** section:

```
┌─────────────────────────────────────────────────────────────┐
│  Connectivity                                                │
│                                                              │
│  Compute resource to connect to:                             │
│  ☑ Don't connect to an EC2 compute resource                 │
│  ○ Connect to an EC2 compute resource                        │
│  (Leave FIRST option selected)                              │
│                                                              │
│  Virtual Private Cloud (VPC):                                │
│  [default (vpc-xxxxx)  ▼]  ← Keep default                   │
│                                                              │
│  DB Subnet Group:                                            │
│  [Create new DB Subnet Group ▼]  (AWS creates automatically) │
│                                                              │
│  Public accessibility:                                       │
│  ○ No                                                        │
│  ☑ Yes    ← SELECT THIS (IMPORTANT for Docker!)             │
│                                                              │
│  VPC security group (firewall):                              │
│  ☑ Create new                                                │
│  [bankdb-sg]  ← or any name                                 │
│                                                              │
│  Database authentication:                                    │
│  ☑ Password authentication  (keep selected)                  │
│  ○ Password and IAM database authentication                  │
│                                                              │
│  Database port:                                              │
│  [3306]  ← Keep default (MySQL port)                        │
└─────────────────────────────────────────────────────────────┘
```

**Key selections:**
- Compute: Don't connect to EC2
- VPC: default
- Public accessibility: **YES** ← IMPORTANT!
- Port: 3306 (default)

---

## STEP 7: Additional Configuration (Part 4)

### Scroll to "Additional configuration"

```
┌─────────────────────────────────────────────────────────────┐
│  Additional configuration                                    │
│                                                              │
│  Initial database name:                                      │
│  [bankdb________________]  ← TYPE: bankdb                   │
│                                                              │
│  DB Parameter group:                                         │
│  [default.mysql8.0  ▼]    ← Keep default                    │
│                                                              │
│  DB Option group:                                            │
│  [default:mysql-8-0  ▼]   ← Keep default                    │
│                                                              │
│  Encryption:                                                 │
│  ☑ Enable encryption      ← Uncheck (optional for free tier)│
│                                                              │
│  Automatic backups:                                          │
│  ☑ Enable automated backups  ← Keep checked (recommended)    │
│  Backup retention period: [7] days  ← Keep 7 days           │
│                                                              │
│  Enhanced monitoring:                                        │
│  ○ Enable enhanced monitoring (uncheck - not needed)        │
│                                                              │
│  Deletion protection:                                        │
│  ☑ Enable deletion protection  ← Optional                   │
└─────────────────────────────────────────────────────────────┘
```

**What to do:**
- Initial database name: `bankdb`
- Keep other defaults

---

## STEP 8: Review Summary

### Bottom of Form:

```
┌─────────────────────────────────────────────────────────────┐
│  Estimated monthly costs:  $0.00  ← Should show $0!          │
│                                                              │
│  Free tier eligible:  ✓ Yes                                  │
│                                                              │
│  [Cancel]              [Create database] ← CLICK THIS!       │
└─────────────────────────────────────────────────────────────┘
```

**Verify:**
- Cost shows: **$0.00/month** ✓
- Free tier: **Eligible** ✓
- **Then click: "Create database"**

---

## STEP 9: Creation In Progress

### What You'll See:

```
┌─────────────────────────────────────────────────────────────┐
│  Databases                                                   │
│                                                              │
│  Name        Engineer   Status        Endpoint               │
│  ────────────────────────────────────────────────────────────│
│  bankdb      MySQL      🟡 Creating   -                      │
│                                                              │
│  Creation progress: ▓▓▓▓░░░░░░░ (40%)                       │
│                                                              │
│  Message: "Creating database instance..."                   │
│  ⏳ This may take 5-10 minutes                               │
└─────────────────────────────────────────────────────────────┘
```

**What to do:** WAIT! Check back every 2 minutes

---

## STEP 10: Creation Complete ✅

### Status Changes to "Available":

```
┌─────────────────────────────────────────────────────────────┐
│  Databases                                                   │
│                                                              │
│  Name        Engineer   Status         Endpoint              │
│  ────────────────────────────────────────────────────────────│
│  bankdb      MySQL      🟢 Available    bank...amazonaws.com │
│                                                              │
│  Time: 2026-07-22 22:35:42                                  │
└─────────────────────────────────────────────────────────────┘
```

**Status:** 🟢 **Available** = Ready to use!

---

## STEP 11: Get Your Endpoint

### Click on "bankdb" database name

```
You'll see database details page:

┌─────────────────────────────────────────────────────────────┐
│  bankdb - MySQL Database Details                            │
│                                                              │
│  [Modify]  [Reboot]  [Actions ▼]                            │
│                                                              │
│  Scroll down to: "Connectivity & security"                  │
│                ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓                       │
│                                                              │
│  Connectivity & security                                    │
│  ────────────────────────────────────────────────────────────│
│                                                              │
│  Endpoint:                                                   │
│  bankdb.c123456789.us-east-1.rds.amazonaws.com              │
│  [Copy ▼]  ← CLICK THIS TO COPY                             │
│                                                              │
│  Port: 3306                                                  │
│  ────────────────────────────────────────────────────────────│
│                                                              │
│  VPC security groups:                                        │
│  bankdb-sg (sg-0123456789abcd)                              │
│  Status: available                                           │
└─────────────────────────────────────────────────────────────┘
```

**What to do:**
1. Scroll to "Connectivity & security"
2. Find "Endpoint" field
3. **Copy the endpoint** by clicking [Copy] button

---

## 💾 SAVE YOUR CREDENTIALS

### Create a file or note with:

```
═════════════════════════════════════════════
            RDS CREDENTIALS
═════════════════════════════════════════════

Endpoint:  bankdb.c123456789.us-east-1.rds.amazonaws.com
Username:  admin
Password:  YourStrongPassword123!
Database:  bankdb
Port:      3306

Created:   2026-07-22
Region:    us-east-1
Status:    ✅ Available

═════════════════════════════════════════════
```

⚠️ **KEEP THIS SAFE!** You'll need it for Docker!

---

## 🎯 Next Steps

Once you have the endpoint, you can run:

```powershell
docker run -p 8080:8080 `
  -e SPRING_PROFILES_ACTIVE=prod `
  -e DB_URL="jdbc:mysql://bankdb.c123456789.us-east-1.rds.amazonaws.com:3306/bankdb" `
  -e DB_USERNAME=admin `
  -e DB_PASSWORD=YourStrongPassword123! `
  bankmanagement:1.0
```

---

## ⏰ Time Estimate

| Step | Time |
|------|------|
| 1-3: Navigate to RDS | 1 minute |
| 4-7: Fill out form | 3 minutes |
| 8: Click create | 1 minute |
| 9-10: Wait for creation | 5-10 minutes |
| 11: Get endpoint | 1 minute |
| **TOTAL** | **~15 minutes** |

---

## ✅ Checklist

- [ ] Logged into AWS Console
- [ ] RDS Dashboard opened
- [ ] "Create database" clicked
- [ ] "Standard create" selected
- [ ] "MySQL" engine selected
- [ ] "Free tier" template selected
- [ ] "bankdb" as DB identifier
- [ ] "admin" as username
- [ ] Strong password entered twice
- [ ] "db.t3.micro" selected
- [ ] Public accessibility: YES
- [ ] Initial database name: bankdb
- [ ] "Create database" clicked
- [ ] Waited for status = Available
- [ ] Endpoint copied
- [ ] Credentials saved

---

## 🚀 Ready?

Follow these steps NOW on AWS Console! 

**It should take about 15 minutes total.**

Once done, come back and tell me your **RDS endpoint**, and I'll help you run the Docker container! 🐳

---

Print this page if it helps! 🖨️

