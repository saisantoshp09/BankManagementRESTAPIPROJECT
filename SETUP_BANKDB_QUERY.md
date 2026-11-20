# AWS RDS Query Editor - Complete Database Setup

## Copy All of This and Paste Into Query Editor

---

## STEP 1: Open Query Editor in AWS

```
1. Go: https://console.aws.amazon.com
2. Search: RDS
3. Click: RDS
4. Click: Databases
5. Click: bankdb
6. Look for tabs: Connectivity, Monitoring, Query Editor
7. Click: Query Editor
8. You'll see:
   - Database: (dropdown)
   - Database username: (field)
   - Database user password: (field)
9. Fill in:
   - Database username: admin
   - Database user password: Prudhvi1234
10. Click: Connect (or Execute)
```

---

## STEP 2: Paste This SQL Command

**Copy everything below and paste into Query Editor:**

```sql
CREATE DATABASE IF NOT EXISTS bankdb;
USE bankdb;

-- Create accounts table (for your Bank Management app)
CREATE TABLE IF NOT EXISTS account (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_holder_name VARCHAR(100) NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    account_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO account (account_number, account_holder_name, balance, account_type) 
VALUES 
('ACC001', 'John Doe', 5000.00, 'SAVINGS'),
('ACC002', 'Jane Smith', 10000.00, 'CHECKING'),
('ACC003', 'Bob Johnson', 7500.50, 'SAVINGS');

-- Verify
SELECT * FROM account;
```

---

## STEP 3: Execute the Query

1. **Paste the SQL above** into the Query Editor text area
2. Click: **"Execute"** or **"Run Query"** button
3. You should see: **"Query executed successfully"**

---

## STEP 4: Verify Database Created

You should see results showing:
```
id | account_number | account_holder_name | balance | account_type
1  | ACC001        | John Doe            | 5000.00 | SAVINGS
2  | ACC002        | Jane Smith          | 10000.00| CHECKING
3  | ACC003        | Bob Johnson         | 7500.50 | SAVINGS
```

✅ **Database ready!**

---

## STEP 5: Run Docker

Once you see the data above, **stop current Docker** (if running):

```powershell
Press: Ctrl + C
```

**Then run Docker command:**

```powershell
docker run -p 8080:8080 `
  -e SPRING_PROFILES_ACTIVE=prod `
  -e DB_URL="jdbc:mysql://bankdb.cqte2cw82oir.us-east-1.rds.amazonaws.com:3306/bankdb" `
  -e DB_USERNAME=admin `
  -e DB_PASSWORD=Prudhvi1234 `
  bankmanagement:1.0
```

**This time it should work!** ✅

---

## Expected Docker Success Message:

```
2026-07-22T17:41:00.000Z  INFO ... : Started BankMangementAppApplication
```

✅ **SUCCESS!**

---

## TEST THE APP

Once Docker shows "Started..." message, open NEW PowerShell and run:

```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/accounts"
```

**Expected Response:**
```
StatusCode        : 200
StatusDescription : OK
Content           : [{"id":1,"accountNumber":"ACC001",...}]
```

✅ **App connected to AWS database!**

---

**Go do it now!** 🚀

1. Open Query Editor
2. Paste SQL above
3. Execute
4. Run Docker
5. Test API

