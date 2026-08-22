# 🎯 AWS Deployment Quick Reference Card

## 📱 Keep This Handy While Deploying!

---

## STEP 1: BUILD APPLICATION
**Command (Windows):**
```
.\build-for-aws.bat
```
**Expected Result:** `BUILD SUCCESS`  
**Output File:** `target\BankMangementApp-0.0.1-SNAPSHOT.jar` (45 MB)  
**Time:** ~12 seconds

---

## STEP 2: CREATE RDS DATABASE

**AWS Console Path:**
```
RDS → Databases → Create Database
```

**Configuration:**
| Field | Value |
|-------|-------|
| Engine | MySQL |
| Template | Free Tier |
| DB Identifier | bankdb |
| Username | admin |
| Password | (strong) |
| Instance | db.t3.micro |
| Storage | 20 GB |
| Public | Yes |

**Time:** 5-10 minutes  
**SAVE:** Endpoint & Password!

---

## STEP 3: DEPLOY TO ELASTIC BEANSTALK

**AWS Console Path:**
```
Elastic Beanstalk → Create Application
```

**Configuration:**
| Field | Value |
|-------|-------|
| App Name | BankManagementApp |
| Platform | Java |
| Version | Java 21 (Amazon Corretto) |
| JAR File | BankMangementApp-0.0.1-SNAPSHOT.jar |

**Time:** 10-15 minutes  
**SAVE:** Environment URL!

---

## STEP 4: SET ENVIRONMENT VARIABLES

**AWS Console Path:**
```
Elastic Beanstalk → Configuration → Environment Properties
```

**Variables to Add:**
```
Name                    | Value
────────────────────────|─────────────────────────────────
SPRING_PROFILES_ACTIVE  | prod
DB_URL                  | jdbc:mysql://RDS-ENDPOINT:3306/bankdb
DB_USERNAME             | admin
DB_PASSWORD             | YOUR-PASSWORD
```

**Time:** 2 minutes (plus 5 min for EB to update)

---

## STEP 5: TEST APPLICATION

**PowerShell Command:**
```powershell
Invoke-WebRequest -Uri "http://YOUR-EB-URL/api/accounts"
```

**Expected Result:** HTTP 200 with JSON response

---

## ⚠️ IF ISSUES OCCUR

| Problem | Quick Fix |
|---------|-----------|
| Can't reach API | Check RDS Security Group |
| 502 Error | Check recent logs in EB console |
| DB Connection Error | Verify RDS is "Available" |
| Environment Variable Error | Re-apply in EB Configuration |

**Full Help:** See `AWS_TROUBLESHOOTING.md`

---

## 🔑 IMPORTANT CREDENTIALS

**Save These Somewhere Safe:**

```
RDS Endpoint:    _________________________________
RDS Username:    admin
RDS Password:    _________________________________
EB URL:          _________________________________
AWS Region:      us-east-1
AWS Account ID:  _________________________________
```

---

## 📊 FREE TIER LIMITS

| Service | Limit | Duration |
|---------|-------|----------|
| EC2 | 750 hrs/month | 12 months |
| RDS | 750 hrs/month | 12 months |
| Data Transfer | 100 GB/month | Always |

**Monitor monthly to avoid charges!**

---

## ⏱️ TIME ESTIMATES

| Task | Time |
|------|------|
| Build JAR | 15 seconds |
| Create RDS | 10 minutes |
| Deploy to EB | 15 minutes |
| Configure Vars | 2 minutes |
| Wait for EB | 5 minutes |
| Test API | 2 minutes |
| **TOTAL** | **~45 minutes** |

---

## 🔐 SECURITY CHECKLIST

- [ ] RDS password is strong
- [ ] Security group allows MySQL to EB
- [ ] Security group allows HTTP to EB
- [ ] No credentials in code
- [ ] Environment variables configured
- [ ] Backups enabled

---

## 📞 QUICK LINKS

| What | Link |
|------|------|
| AWS Console | console.aws.amazon.com |
| RDS Status | console → RDS → Databases |
| EB Status | console → Elastic Beanstalk |
| CloudWatch | console → CloudWatch |
| Troubleshooting | AWS_TROUBLESHOOTING.md |
| Full Guide | AWS_STEP_BY_STEP.md |

---

## ✅ SUCCESS CHECKLIST

When done, verify:

- [ ] `./build-for-aws.bat` = BUILD SUCCESS
- [ ] RDS status = Available (green)
- [ ] EB status = Green
- [ ] API returns HTTP 200
- [ ] Database connected (no errors)
- [ ] CloudWatch logs clean
- [ ] Billing alerts set

---

## 🚨 EMERGENCY CONTACTS

**If deployment fails:**
1. Check `AWS_TROUBLESHOOTING.md`
2. Review application logs in EB console
3. Verify RDS is running
4. Check security groups
5. Contact AWS Support

---

## 💡 PRO TIPS

✅ **Tip 1:** Use AWS Console to view real-time logs  
✅ **Tip 2:** Security groups are 90% of issues  
✅ **Tip 3:** RDS endpoint must be exact in DB_URL  
✅ **Tip 4:** Test locally before deploying  
✅ **Tip 5:** Monitor CloudWatch daily first month  

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

1. Setup CloudWatch monitoring
2. Configure billing alerts
3. Add custom domain (Route53)
4. Enable HTTPS (ACM)
5. Setup CI/CD (CodePipeline)
6. Document your deployment
7. Share app URL with team

---

**Print this page when deploying!** 📋

---

**Last Updated:** July 2026  
**Status:** ✅ Ready to deploy

