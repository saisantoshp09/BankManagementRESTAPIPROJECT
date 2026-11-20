@echo off
REM Quick Start Script for Bank Management System (Windows)

echo.
echo =========================================
echo Bank Management System - Quick Start
echo =========================================
echo.

REM Check prerequisites
echo Checking prerequisites...
where docker >nul 2>nul || (echo Error: Docker not installed & exit /b 1)
where git >nul 2>nul || (echo Error: Git not installed & exit /b 1)
where mvn >nul 2>nul || (echo Error: Maven not installed & exit /b 1)
where npm >nul 2>nul || (echo Error: Node.js/npm not installed & exit /b 1)
echo All prerequisites found
echo.

echo Select deployment option:
echo 1) Docker Compose (Recommended for local testing)
echo 2) Local Development (Separate services)
echo 3) Docker Multi-stage Build Only
echo.
set /p option="Enter option (1-3): "

if "%option%"=="1" (
    echo.
    echo Starting with Docker Compose...
    echo Services will be available at:
    echo   - API: http://localhost:8080/api
    echo   - Frontend: http://localhost:8080 (served by backend)
    echo   - MySQL: localhost:3306
    echo.
    docker-compose up --build
) else if "%option%"=="2" (
    echo.
    echo Starting local development...
    echo.
    echo Make sure to have MySQL running on localhost:3306
    echo.
    set /p mysql_running="Is MySQL running? (y/n): "
    if not "%mysql_running%"=="y" (
        echo Please start MySQL and try again
        exit /b 1
    )
    
    echo.
    echo Building and starting backend...
    start cmd /k mvn clean spring-boot:run
    
    timeout /t 10 /nobreak
    
    echo.
    echo Building and starting frontend...
    cd frontend
    call npm install
    call npm start
) else if "%option%"=="3" (
    echo.
    echo Building Docker multi-stage image...
    docker build -f Dockerfile.multistage -t bank-management-app:latest .
    echo.
    echo Docker image built successfully!
    echo.
    echo To run the image:
    echo docker run -p 8080:8080 ^
    echo   -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/bankdb ^
    echo   -e SPRING_DATASOURCE_USERNAME=root ^
    echo   -e SPRING_DATASOURCE_PASSWORD=root ^
    echo   bank-management-app:latest
) else (
    echo Invalid option
    exit /b 1
)
