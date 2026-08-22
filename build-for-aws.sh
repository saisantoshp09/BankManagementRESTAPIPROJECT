#!/bin/bash

# AWS Deployment Script for Bank Management REST API
# This script helps you build and prepare for AWS deployment

echo "=== Bank Management App - AWS Deployment Script ==="
echo ""

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Maven is not installed. Please install Maven first."
    exit 1
fi

echo "[1/3] Building the application with Maven..."
mvn clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "✓ Build successful!"
    echo ""
    echo "[2/3] JAR file created at: target/BankMangementApp-0.0.1-SNAPSHOT.jar"
    echo ""
    echo "[3/3] Next steps:"
    echo "  1. Create RDS MySQL instance in AWS Console"
    echo "  2. Deploy to Elastic Beanstalk"
    echo "  3. Configure environment variables with your RDS endpoint"
    echo ""
    echo "Read AWS_DEPLOYMENT_GUIDE.md for detailed instructions."
else
    echo "✗ Build failed. Please check the errors above."
    exit 1
fi

