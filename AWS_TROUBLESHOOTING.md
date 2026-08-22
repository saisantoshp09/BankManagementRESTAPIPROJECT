# AWS Troubleshooting Guide

## Common Issues & Solutions

---

## Issue 1: "Application is not starting - 502 Bad Gateway"

### Error Message in Logs:
```
java.sql.SQLException: Cannot get a connection, pool error...
java.sql.SQLException: JDBC Driver not found...
```

### Cause:
- Database connection credentials are wrong
- RDS instance is not running
- Security group blocking traffic

### Solution:

**Step 1: Verify RDS is Running**
```
AWS Console → RDS → Databases → Check "bankdb" status
Status should be: "Available" (green circle)
```

**Step 2: Verify Environment Variables**
```
AWS Console → Elastic Beanstalk → Environment → Configuration
Check these values:
- DB_URL: jdbc:mysql://ENDPOINT:3306/bankdb
- DB_USERNAME: admin
- DB_PASSWORD: (should match RDS password)
- SPRING_PROFILES_ACTIVE: prod
```

**Step 3: Check Database Exists**
```
Use MySQL client or AWS RDS Query Editor:
SHOW DATABASES;
# Should show "bankdb" in the list
```

**Step 4: Check Security Groups**
```
1. Go to RDS → bankdb → Security Groups
2. Go to EC2 → Security Groups → Find EB security group
3. In RDS security group, Inbound Rules should have:
   - Type: MySQL/Aurora (3306)
   - Source: <EB-security-group-id>
```

---

## Issue 2: "502 Bad Gateway - Application not responding"

### Cause:
- Application is crashing on startup
- Out of memory
- Wrong Java version

### Solution:

**Check Application Logs:**
```
1. Elastic Beanstalk → Environment
2. Click "Recent Logs" button
3. Look for error messages
4. Common errors:
   - ClassNotFoundException: Missing dependency
   - SQLException: Database issue (see Issue #1)
   - OutOfMemoryError: Increase EC2 instance size
```

---

## Issue 3: "TimeoutError when connecting to database"

### Cause:
- RDS taking too long to respond
- Network connectivity issue
- Security group not configured

### Solution:

**Test connectivity from EC2:**
```
1. Go to EC2 → Instances
2. Find EB instance
3. Click Connect (use EC2 Instance Connect)
4. Run these commands:

# Install telnet
sudo yum install telnet -y

# Test connection to RDS
telnet bankdb.xxxxx.us-east-1.rds.amazonaws.com 3306

# Should connect (you'll see garbage characters, that's OK)
```

If **NOT connecting**, security group is the issue:
```
1. Go to RDS → bankdb → Security Groups
2. Click the security group
3. Inbound Rules → Edit
4. Add:
   - Type: MySQL/Aurora
   - Port: 3306
   - Source: <your-EB-security-group>
5. Apply
```

---

## Issue 4: "Connection pool exhausted - Too many connections"

### Cause:
- Application creating too many database connections
- Database not closing connections properly
- High traffic/load

### Solution:

**Temporary Fix:**
```
Add to application-prod.properties:
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=2
spring.datasource.hikari.connection-timeout=30000
```

**Monitor:**
```
CloudWatch → RDS → DatabaseConnections metric
Should not exceed 80-90 connections
```

---

## Issue 5: "OutOfMemoryError: Java heap space"

### Cause:
- Application needs more memory
- Memory leak in code
- Too many concurrent requests

### Solution:

**Increase EC2 Instance Memory:**
```
1. Elastic Beanstalk → Configuration
2. Instances section
3. Instance type: Change to "t2.small" (still free tier, but limited)
4. Apply

# Note: After free tier, costs money (~$15-20/month)
```

**Check for Memory Leaks:**
```
# Add JVM memory flags
# In Elastic Beanstalk → Configuration → Environment properties

JAVA_TOOL_OPTIONS: -Xmx512m -Xms256m
```

---

## Issue 6: "503 Service Unavailable - Load Balancer unhealthy"

### Cause:
- Application crashing repeatedly
- Health check failing
- Configuration issue

### Solution:

**Check Health Status:**
```
1. Elastic Beanstalk → Environment
2. Look at "Health" indicator
3. Click "Instance Health"
4. See which instances failed
```

**Check Logs:**
```
Click "Request Logs" or "Recent Logs" to debug
Look for pattern in errors
```

**Restart Environment:**
```
Elastic Beanstalk → Environment → Environment Actions → Rebuild
This will restart everything cleanly
```

---

## Issue 7: "AccessDenied: User is not authorized to perform"

### Cause:
- IAM role not properly configured
- Insufficient permissions
- AWS credentials issue

### Solution:

**Verify IAM Role:**
```
1. Elastic Beanstalk → Configuration
2. Security section
3. Verify IAM instance profile exists
4. Check it has these permissions:
   - rds:*
   - ec2:*
   - logs:*
```

---

## Issue 8: "Endpoint not responding - No connection made"

### Cause:
- Load balancer not configured properly
- Security group blocking port 80/443
- Application not listening on port 8080

### Solution:

**Check Security Group:**
```
1. EC2 → Security Groups → Find EB security group
2. Inbound Rules should have:
   - HTTP (80) from 0.0.0.0/0
   - HTTPS (443) from 0.0.0.0/0
   - SSH (22) from your IP (if needed)
3. Outbound Rules: Allow all to 0.0.0.0/0
```

**Check Load Balancer:**
```
EC2 → Load Balancers
Find your EB load balancer
Check "Health Checks" tab
Verify instances are registered
```

---

## Issue 9: "Database size exceeded free tier limit"

### Warning:
```
AWS Billing Alert: RDS storage approaching limit
```

### Solution:

**Check Current Size:**
```
RDS → bankdb → Storage info
Shows current and allocated storage
```

**Backup and Optimize:**
```
1. Create snapshot (RDS console)
2. Delete old data from application
3. Monitor growth going forward
```

---

## Issue 10: "High Billing - Exceeding Free Tier"

### Cause:
Usually data transfer:
- Too much outbound traffic
- Leaving resources running
- Misconfiguration

### Solution:

**Setup Billing Alerts:**
```
1. AWS Billing Console
2. Budgets → Create Budget
3. Alert when exceeds $10-20
4. Get email notifications
```

**Identify Expensive Resources:**
```
Cost Explorer → See breakdown by service
Usually:
- Elastic Beanstalk (EC2): $0 (free tier)
- RDS: $0 (free tier)
- Data Transfer: Can be expensive!
```

---

## Common Error Messages

| Error | Meaning | Fix |
|-------|---------|-----|
| `Cannot get a connection, pool error` | DB connection failed | Check DB credentials |
| `ClassNotFoundException` | Missing JAR dependency | Rebuild with `mvn clean package` |
| `Timeout expired` | DB slow or unreachable | Check security groups |
| `Connection refused` | RDS port blocked | Update security groups |
| `Access denied for user 'admin'` | Wrong password | Update environment variables |
| `502 Bad Gateway` | App crashed or not responding | Check logs |
| `503 Service Unavailable` | Load balancer unhealthy | Rebuild environment |
| `OutOfMemory` | Need more RAM | Upgrade instance |

---

## Debugging Workflow

```
1. Check Error Message
   ↓
2. Check Recent Logs (EB Console)
   ↓
3. Check Instance Health
   ↓
4. Verify Environment Variables
   ↓
5. Check Security Groups
   ↓
6. Test RDS Connectivity
   ↓
7. Restart/Rebuild Environment
   ↓
8. If still failing, check Full Logs
```

---

## Useful AWS CLI Commands

### Check EB Environment Status
```bash
aws elasticbeanstalk describe-environments \
  --application-name BankManagementApp \
  --region us-east-1
```

### Get Recent Events
```bash
aws elasticbeanstalk describe-events \
  --application-name BankManagementApp \
  --region us-east-1 \
  --max-items 20
```

### Get Logs
```bash
aws elasticbeanstalk request-environment-info \
  --environment-name BankManagementApp-env \
  --info-type logs \
  --region us-east-1
```

### Check RDS Status
```bash
aws rds describe-db-instances \
  --db-instance-identifier bankdb \
  --region us-east-1
```

### View RDS Configuration
```bash
aws rds describe-db-instances \
  --db-instance-identifier bankdb \
  --query 'DBInstances[0].{Engine,DBInstanceClass,AllocatedStorage,DBName}' \
  --region us-east-1
```

---

## Getting Professional Help

If you're stuck:

1. **AWS Support** (Free tier includes Community Forums)
   - https://console.aws.amazon.com/support/

2. **Stack Overflow** - Tag your question:
   - `aws` `elastic-beanstalk` `spring-boot` `mysql`

3. **AWS Documentation:**
   - RDS: https://docs.aws.amazon.com/rds/
   - EB: https://docs.aws.amazon.com/elasticbeanstalk/
   - Spring Boot: https://spring.io/projects/spring-boot

4. **Application Logs:**
   - Download full logs from EB console
   - Share with community (remove sensitive data!)

---

**Remember:** Most issues are caused by either:
1. ❌ Database connection (90% of cases)
2. ❌ Security groups (8% of cases)
3. ❌ Application configuration (2% of cases)

Check database connectivity first! 🔍

