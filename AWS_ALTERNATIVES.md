# Alternative AWS Deployment Methods

## Option 1: Docker + Elastic Container Registry (ECR)

### Advantages:
- More consistent across environments
- Easier to version and rollback
- Good for free tier

### Steps:

**1. Install Docker** on your machine

**2. Build Docker Image:**
```bash
docker build -t bankmanagement:1.0 .
```

**3. Tag for ECR:**
```bash
docker tag bankmanagement:1.0 your-account-id.dkr.ecr.us-east-1.amazonaws.com/bankmanagement:1.0
```

**4. Push to ECR:**
```bash
# Get ECR login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.us-east-1.amazonaws.com

# Push image
docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/bankmanagement:1.0
```

**5. Deploy from ECR to Elastic Beanstalk:**
- In Elastic Beanstalk, upload a `Dockerrun.aws.json` file

---

## Option 2: AWS App Runner (Simplest Container Deployment)

### Advantages:
- Fully managed
- Simple to use
- Good for free tier

### Disadvantages:
- Less control than Elastic Beanstalk

### Steps:

1. Push Docker image to ECR (same as Option 1)
2. Go to AWS Console → App Runner
3. Create Application
4. Connect to ECR repository
5. The rest is automatic!

---

## Option 3: EC2 + RDS (Most Control)

### Advantages:
- Full control
- Can SSH into instance
- Flexible configuration

### Disadvantages:
- Requires more management
- More manual steps

### Steps:

**1. Launch EC2 Instance:**
- AMI: Ubuntu 22.04 LTS (free tier eligible)
- Instance: t2.micro (free tier)
- Storage: 30 GB EBS

**2. SSH into instance:**
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

**3. Install Java and MySQL client:**
```bash
sudo yum update -y
sudo yum install java-21-amazon-corretto -y
sudo yum install mysql -y
```

**4. Upload JAR file:**
```bash
scp -i your-key.pem target/BankMangementApp-0.0.1-SNAPSHOT.jar ec2-user@your-instance:/home/ec2-user/
```

**5. Run application:**
```bash
export DB_URL=jdbc:mysql://your-rds-endpoint:3306/bankdb
export DB_USERNAME=admin
export DB_PASSWORD=your-password
export SPRING_PROFILES_ACTIVE=prod

java -jar BankMangementApp-0.0.1-SNAPSHOT.jar
```

**6. Use systemd for auto-start:**
Create `/etc/systemd/system/bankapp.service`:
```ini
[Unit]
Description=Bank Management REST API
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user
Environment="DB_URL=jdbc:mysql://your-rds-endpoint:3306/bankdb"
Environment="DB_USERNAME=admin"
Environment="DB_PASSWORD=your-password"
Environment="SPRING_PROFILES_ACTIVE=prod"
ExecStart=/usr/bin/java -jar /home/ec2-user/BankMangementApp-0.0.1-SNAPSHOT.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable bankapp.service
sudo systemctl start bankapp.service
```

---

## Comparison Table

| Feature | Elastic Beanstalk | Docker + ECR | App Runner | EC2 Direct |
|---------|------------------|-------------|-----------|------------|
| **Ease of Use** | Easy | Medium | Very Easy | Hard |
| **Free Tier Eligible** | Yes ✓ | Yes ✓ | Limited | Yes ✓ |
| **Setup Time** | 15 min | 30 min | 10 min | 45 min |
| **Auto-scaling** | Built-in | Needs setup | Built-in | Manual |
| **Load Balancing** | Built-in | Optional | Built-in | Manual |
| **Monitoring** | CloudWatch | CloudWatch | CloudWatch | CloudWatch |
| **Cost (Free Tier)** | $0/mo* | $0/mo* | ~$5/mo | $0/mo* |

*For first 12 months with free tier

---

## Recommended Path for Your Project

### 1. **First Deployment (Simplest):** 
   → Elastic Beanstalk (follow AWS_STEP_BY_STEP.md)

### 2. **When Ready to Upgrade:**
   → Docker + ECR (for better control and versioning)

### 3. **For Production:**
   → App Runner (easiest managed solution)

---

## AWS Free Tier Limits

### Always Free:
- AWS Lambda: 1M free requests/month
- DynamoDB: 25GB storage
- CloudWatch: Basic monitoring free

### 12 Months Free:
- **EC2 t2.micro**: 750 hours/month
- **RDS db.t3.micro**: 750 hours/month
- **Elastic Beanstalk**: Free (pay only for EC2)
- **Data Transfer**: 100GB outbound/month (limited)

### That Month Only (then paid):
- S3: 5GB free (then pay per storage)
- SQS: 1M free requests (then pay)

---

## Cost Optimization Tips

1. **Use Reserved Instances** (not applicable with free tier)
2. **Monitor Data Transfer** - most expensive after first free tier
3. **Set up Budget Alerts** - AWS will email you
4. **Terminate unused resources** - RDS/EC2 cost money if left running
5. **Use Spot Instances** - much cheaper (manually manage)

---

## Security Best Practices

1. **Use IAM roles** instead of access keys in code
2. **Enable RDS encryption** (minimal performance impact)
3. **Use security groups** to restrict traffic
4. **Enable VPC** for private networks
5. **Rotate passwords** every 90 days
6. **Use AWS Secrets Manager** for sensitive data

---

## Monitoring & Maintenance

### CloudWatch Metrics to Monitor:
- **CPU Utilization** - should be < 70%
- **Database Connections** - track growth
- **Memory Usage** - watch for leaks
- **HTTP Errors** - 4xx and 5xx responses
- **Application Response Time** - track performance

### Regular Tasks:
- [ ] Check CloudWatch dashboards (weekly)
- [ ] Review RDS backups (monthly)
- [ ] Update dependencies (monthly)
- [ ] Rotate credentials (quarterly)
- [ ] Review security groups (quarterly)

---

## Migration Guide (if changing methods)

From **Elastic Beanstalk** to **Docker:**
1. Build Docker image
2. Push to ECR
3. Switch EB to use Docker container
4. Keep same RDS database

From **Elastic Beanstalk** to **EC2:**
1. Launch new EC2 instance
2. Copy RDS connection string
3. Upload JAR and run
4. Point load balancer (if any) to new instance
5. Terminate old EB environment

---

Need help with any of these options? Check AWS_STEP_BY_STEP.md for detailed instructions!

