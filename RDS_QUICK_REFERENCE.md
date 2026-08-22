# 📋 RDS Creation - Quick Reference Card

## PRINT THIS! Keep it open while creating RDS on AWS

---

## 🎯 What You'll Need

```
✓ AWS Account (with Free Tier eligible)
✓ AWS Console login
✓ 15 minutes of time
✓ This checklist
```

---

## ⚡ Quick Steps (Super Fast Version)

```
1. Go: https://console.aws.amazon.com
   ↓
2. Search: "RDS" → Click RDS service
   ↓
3. Click: "Create database"
   ↓
4. Select:
   ☑ Standard create
   ☑ MySQL
   ☑ Free tier
   ↓
5. Fill Form:
   - DB identifier: bankdb
   - Username: admin
   - Password: YourStrongPassword123!
   - Confirm: YourStrongPassword123!
   - Public accessibility: YES
   - Initial DB name: bankdb
   ↓
6. Click: "Create database"
   ↓
7. ⏳ Wait 5-10 minutes
   ↓
8. Status = 🟢 Available
   ↓
9. Click on "bankdb"
   ↓
10. Copy "Endpoint"
    ↓
✅ DONE! Save endpoint
```

---

## 📝 Form Fields - What To Enter

Copy this & fill it out:

```
┌─────────────────────────────────────────────────────┐
│ REQUIRED FIELDS:                                    │
├─────────────────────────────────────────────────────┤
│ DB Instance Identifier:  bankdb                     │
│ Master Username:         admin                      │
│ Master Password:         ___________________        │
│                         (make it STRONG!)           │
│ Confirm Password:        ___________________        │
│                         (same as above)             │
├─────────────────────────────────────────────────────┤
│ SELECT THESE OPTIONS:                               │
├─────────────────────────────────────────────────────┤
│ Engine:                  MySQL                      │
│ Template:                Free tier                  │
│ Instance Class:          db.t3.micro                │
│ Public Accessibility:    YES                        │
│ Initial DB Name:         bankdb                     │
│ Storage:                 20 GB                      │
└─────────────────────────────────────────────────────┘
```

---

## ⚠️ IMPORTANT - Don't Miss These!

| Setting | Must Be | Why |
|---------|---------|-----|
| **Template** | Free tier | Avoids charges |
| **Public Accessibility** | YES | Docker can connect |
| **Instance Class** | db.t3.micro | Free tier eligible |
| **Password** | STRONG! | Security |
| **Storage** | 20 GB | Free tier limit |

---

## 🔑 Password Requirements

✅ **Good Passwords:**
```
MyDB@Pass123!
SecureDBPass2024!
BankApp#Password123
```

❌ **Bad Passwords:**
```
password       (too simple)
12345678       (no letters)
BankDB         (no numbers/symbols)
```

**Rules:**
- 8+ characters minimum
- Mix of: Letters + Numbers + Symbols
- At least one UPPERCASE letter

---

## 💰 Cost Check

```
Before creating, verify:

Estimated monthly cost: $0.00
                        ↑↑↑↑↑↑↑
                    SHOULD BE ZERO!

Free tier eligible: ✓ Yes
                    ↑↑↑↑↑↑↑↑
              MUST BE CHECKED!
```

If you see a cost > $0, STOP! Reconfigure.

---

## ⏰ Timeline

```
AWS Console setup:     1 min
Fill form:             3 min
Click create:          1 min
Wait for creation:     5-10 min (JUST WAIT!)
Get endpoint:          1 min
─────────────────────────────
TOTAL:                ~15 min
```

---

## 📊 What to Expect

### During Creation:

```
Status: 🟡 Creating...    (Yellow)
↓ (Wait patiently)
Status: 🟢 Available      (Green) ✅
```

### What to See When Done:

```
Database name:     bankdb
Engine:            MySQL
Status:            🟢 Available
Endpoint:          bankdb.cxxxxx.us-east-1.rds.amazonaws.com
Username:          admin
Password:          ••••••••••••••
```

---

## 📍 Finding Your Endpoint

```
After status = Available:

1. Click database name: "bankdb"
2. Scroll down
3. Find section: "Connectivity & security"
4. Look for: "Endpoint"
5. Copy it!

Should look like:
bankdb.c123456789.us-east-1.rds.amazonaws.com
           ↑↑↑↑↑↑↑↑
          (varies, copy yours)
```

---

## 💾 Save This Template

Create a file and save:

```
═══════════════════════════════════════════════
                  MY RDS DETAILS
═══════════════════════════════════════════════

Endpoint:     _____________________________________
Username:     admin
Password:     _____________________________________
Database:     bankdb
Port:         3306

Region:       _____________________________________
Created:      _____________________________________

═══════════════════════════════════════════════
```

---

## ❌ Common Problems & Fixes

| Problem | Solution |
|---------|----------|
| Can't find RDS service | Search: "RDS" in search bar |
| Page refreshing slowly | Be patient, AWS is loading |
| Cost showing > $0 | Check "Free tier" template |
| Can't select t3.micro | Check if Free tier selected |
| Public accessibility missing | Scroll down in form |
| Button is grayed out | Fill ALL required fields |
| Endpoint not showing | Wait for status = Available |

---

## 🚀 After You're Done

1. **✅ Copy your endpoint**
2. **✅ Save all credentials**
3. **✅ Come back here**
4. **✅ Tell me the endpoint**
5. **✅ Run Docker with credentials**

---

## 📋 Pre-Creation Checklist

Before clicking "Create database":

- [ ] Standard create selected
- [ ] MySQL engine selected
- [ ] Free tier template selected
- [ ] DB identifier = bankdb
- [ ] Username = admin
- [ ] Password entered & confirmed
- [ ] db.t3.micro selected
- [ ] Public accessibility = YES
- [ ] Initial DB name = bankdb
- [ ] Cost shows $0.00
- [ ] Free tier eligible = Yes

All checked? → Click "Create database" ✅

---

## 🎯 Right After Creation

Do these immediately:

- [ ] Write down endpoint somewhere safe
- [ ] Write down password somewhere safe
- [ ] Take screenshot of credentials
- [ ] Note: username = admin
- [ ] Note: database name = bankdb
- [ ] Note: region = us-east-1 (or yours)

---

## 🏁 Final Checklist

- [ ] RDS Database Created
- [ ] Status = 🟢 Available
- [ ] Endpoint Copied
- [ ] Credentials Saved
- [ ] Ready for Docker
- [ ] Ready to tell me endpoint

---

## 📞 Next Action

Go to AWS Console NOW and follow these steps!

When done, come back and provide:
- **RDS Endpoint**
- **Confirm password you used**

Then I'll give you exact Docker command!

---

**Good luck! You got this! 🚀**

Estimated time: 15 minutes ⏱️

