#!/bin/bash
# Quick Start Script for Bank Management System

set -e

echo "========================================="
echo "Bank Management System - Quick Start"
echo "========================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."
command -v docker &> /dev/null || { echo "❌ Docker not installed"; exit 1; }
command -v git &> /dev/null || { echo "❌ Git not installed"; exit 1; }
command -v mvn &> /dev/null || { echo "❌ Maven not installed"; exit 1; }
command -v npm &> /dev/null || { echo "❌ Node.js/npm not installed"; exit 1; }
echo "✅ All prerequisites found"
echo ""

# Get option
echo "Select deployment option:"
echo "1) Docker Compose (Recommended for local testing)"
echo "2) Local Development (Separate services)"
echo "3) Docker Multi-stage Build Only"
echo ""
read -p "Enter option (1-3): " option

case $option in
    1)
        echo ""
        echo "🐳 Starting with Docker Compose..."
        echo "Services will be available at:"
        echo "  - API: http://localhost:8080/api"
        echo "  - Frontend: http://localhost:8080 (served by backend)"
        echo "  - MySQL: localhost:3306"
        echo ""
        docker-compose up --build
        ;;
    2)
        echo ""
        echo "🚀 Starting local development..."
        echo ""
        echo "Make sure to have MySQL running on localhost:3306"
        echo ""
        read -p "Is MySQL running? (y/n): " mysql_running
        if [ "$mysql_running" != "y" ]; then
            echo "Please start MySQL and try again"
            exit 1
        fi
        
        echo ""
        echo "📦 Building backend..."
        mvn clean spring-boot:run &
        BACKEND_PID=$!
        
        sleep 10
        
        echo ""
        echo "⚛️  Building frontend..."
        cd frontend
        npm install
        npm start
        
        wait $BACKEND_PID
        ;;
    3)
        echo ""
        echo "🐳 Building Docker multi-stage image..."
        docker build -f Dockerfile.multistage -t bank-management-app:latest .
        echo ""
        echo "✅ Docker image built successfully!"
        echo ""
        echo "To run the image:"
        echo "docker run -p 8080:8080 \\"
        echo "  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/bankdb \\"
        echo "  -e SPRING_DATASOURCE_USERNAME=root \\"
        echo "  -e SPRING_DATASOURCE_PASSWORD=root \\"
        echo "  bank-management-app:latest"
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac
