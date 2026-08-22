@echo off
REM AWS Deployment Script for Bank Management REST API (Windows)

echo === Bank Management App - AWS Deployment Script ===
echo.

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Maven is not installed. Please install Maven first.
    exit /b 1
)

echo [1/3] Building the application with Maven...
call mvn clean package -DskipTests

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Build successful!
    echo.
    echo [2/3] JAR file created at: target\BankMangementApp-0.0.1-SNAPSHOT.jar
    echo.
    echo [3/3] Next steps:
    echo   1. Create RDS MySQL instance in AWS Console
    echo   2. Deploy to Elastic Beanstalk
    echo   3. Configure environment variables with your RDS endpoint
    echo.
    echo Read AWS_DEPLOYMENT_GUIDE.md for detailed instructions.
) else (
    echo.
    echo ✗ Build failed. Please check the errors above.
    exit /b 1
)

