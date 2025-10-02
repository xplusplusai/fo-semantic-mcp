@echo off
echo Creating FO Semantic MCP v1.2.0 Release...
echo.

REM Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: PowerShell is not available on this system.
    echo Please run the create-release-v1.2.0.sh script using Git Bash instead.
    pause
    exit /b 1
)

REM Run the PowerShell script
powershell -ExecutionPolicy Bypass -File "create-release-v1.2.0.ps1"

echo.
echo Press any key to close...
pause >nul