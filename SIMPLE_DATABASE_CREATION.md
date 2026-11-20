# 🚀 CREATE YOUR FIRST AWS DATABASE - SUPER EASY GUIDE

## 5-MINUTE DATABASE CREATION

Just follow these exact steps. No confusion!

---

## STEP 1: Go to AWS Console
```
Open: https://console.aws.amazon.com
Login with your credentials
```

---

## STEP 2: Find RDS Service
```
At top, you see search box: "Search"
Type: RDS
Click on: "RDS" in results
```

---

## STEP 3: Create Database

### You'll see this screen:
```
Left menu shows: Databases, Instances, etc.
Top right button: ORANGE "Create database" button
CLICK IT!
```

---

## STEP 4: SELECT TEMPLATE (VERY IMPORTANT!)

**Pick these options in this order:**

### ☑️ 1st Selection - Creation Method
```
You'll see two options:
  ☑ Standard create    ← CLICK THIS
  ○ Quick create
```

### ☑️ 2nd Selection - Engine
```
Popular engines section:
  ☑ MySQL    ← CLICK THIS
  ○ Others (ignore)
```

### ☑️ 3rd Selection - Template (MOST IMPORTANT!)
```
⚠️ CRITICAL: Select "Free tier"

  ○ Production
  ○ Dev/Test  
  ☑ Free tier    ← THIS ONE! (Keep cost $0)
```

---

## STEP 5: FILL THE FORM

**Scroll down and fill these fields:**

### 1️⃣ DB Instance Identifier
```
Field: "DB instance identifier"
Type: bankdb
(Name of your database)
```

### 2️⃣ Master Username
```
Field: "Master username"
Type: admin
(Leave as admin - that's your user)
```

### 3️⃣ Master Password
```
Field: "Master password"
Type: Prudhvi@123
(Use your existing password from application.properties)

Field: "Confirm password"
Type: Prudhvi@123
(Same as above)

⚠️ IMPORTANT: SAVE THIS PASSWORD!
```

### 4️⃣ Scroll Down - Look for "Public accessibility"
```
You'll see:
  ○ No
  ☑ Yes    ← SELECT YES

Why? So Docker can connect to it
```

### 5️⃣ Look for "Initial database name"
```
Field: "Initial database name"
Type: bankdb
(This creates your database automatically)
```

---

## STEP 6: CHECK COST

**Before creating, scroll to bottom and verify:**

```
Estimated monthly costs: $0.00
                         ████
                    SHOULD BE ZERO!

Free tier eligible: ✓ Yes
```

**If cost is NOT $0.00, STOP! Go back and select "Free tier" template again.**

---

## STEP 7: CREATE!

```
Scroll to very bottom
Blue button: "Create database"
CLICK IT!
```

---

## STEP 8: WAIT FOR CREATION

```
You'll see status: 🟡 Creating...
⏳ WAIT 5-10 MINUTES

Status will change to: 🟢 Available
```

**Just wait! Refresh the page if needed (press F5)**

---

## STEP 9: GET YOUR ENDPOINT

**Once status = 🟢 Available:**

1. Click on "bankdb" (your database name)
2. Scroll down
3. Find section: **"Connectivity & security"**
4. Look for: **"Endpoint"**
5. It will look like:
   ```
   bankdb.c123456789.us-east-1.rds.amazonaws.com
   ```
6. **COPY THIS** (click the copy icon next to it)

---

## 💾 SAVE THESE VALUES

Open Notepad and paste this, then fill in:

```
═══════════════════════════════════════════
            MY AWS DATABASE INFO
═══════════════════════════════════════════

Endpoint:     [paste the endpoint here]

Username:     admin

Password:     Prudhvi@123

Database:     bankdb

Region:       us-east-1

═══════════════════════════════════════════
```

---

## ✅ CHECKLIST

- [ ] Logged into AWS Console
- [ ] RDS service opened
- [ ] "Create database" clicked
- [ ] "Standard create" selected
- [ ] "MySQL" selected
- [ ] "Free tier" selected ⭐ IMPORTANT
- [ ] DB identifier: bankdb
- [ ] Username: admin
- [ ] Password: Prudhvi@123 (confirmed)
- [ ] Public accessibility: YES
- [ ] Initial database name: bankdb
- [ ] Cost shows: $0.00
- [ ] Clicked "Create database"
- [ ] Waited for status = Available
- [ ] Copied endpoint

---

## ⏰ TIME: ~15 MINUTES TOTAL

```
Steps 1-5: 3 minutes (filling form)
Step 6-7: 1 minute (reviewing & creating)
Step 8: 5-10 minutes (just wait!)
Step 9: 1 minute (copy endpoint)
────────────────────────────
TOTAL: ~15 minutes
```

---

## 🎯 START NOW!

1. Open: https://console.aws.amazon.com
2. Follow steps 1-9 above
3. When endpoint is copied, come back here
4. **Tell me the endpoint**
5. I'll give you the Docker command

---

## ⚠️ IF YOU GET STUCK

**Issue:** Can't find "Create database" button  
**Fix:** Make sure you're in RDS → Databases section

**Issue:** Can't select "Free tier"  
**Fix:** Make sure selected engine is "MySQL"

**Issue:** Cost showing > $0  
**Fix:** You selected wrong template. Go back and select "Free tier" again

**Issue:** Status stuck on "Creating"  
**Fix:** Be patient! Takes 5-10 minutes. Refresh page.

---

## 🚀 READY?

GO CREATE YOUR DATABASE NOW!

When done, come back and tell me:
- Your RDS Endpoint (the long URL)

Then I'll give you the exact Docker command! 🐳

---

**This is your only step before running Docker!**

Let's go! 💪

