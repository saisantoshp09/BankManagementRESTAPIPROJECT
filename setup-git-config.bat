@echo off
REM Git Configuration Setup for Bank Management Project
REM Run this once to configure Git for collaboration

echo.
echo ========================================
echo Git Configuration Setup
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com
    pause
    exit /b 1
)

echo Git is installed successfully!
echo.

REM Get current configuration
echo Current Git Configuration:
echo.
git config --list | findstr /R "user\."
echo.

REM Ask for user name
set /p username="Enter your name for Git commits: "
git config user.name "%username%"
echo ✓ Configured user.name: %username%

echo.

REM Ask for email
set /p useremail="Enter your email for Git commits: "
git config user.email "%useremail%"
echo ✓ Configured user.email: %useremail%

echo.

REM Ask if they want to set editor
set /p editor="Do you want to set default Git editor? (y/n): "
if /i "%editor%"=="y" (
    echo Available options: vim, nano, notepad, code (VS Code)
    set /p edit_choice="Enter your choice: "
    git config core.editor "%edit_choice%"
    echo ✓ Configured core.editor: %edit_choice%
)

echo.
echo ========================================
echo Git Configuration Complete!
echo ========================================
echo.
echo Your configuration:
git config --list | findstr /R "user\."
echo.
echo You're ready to collaborate!
echo Ready to work with your friend on the repository.
echo.
echo Next steps:
echo 1. Create a new branch: git checkout -b feature/your-feature
echo 2. Make your changes
echo 3. Commit: git commit -m "Your message"
echo 4. Push: git push origin feature/your-feature
echo.
pause

