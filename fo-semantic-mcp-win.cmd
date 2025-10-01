@echo off
REM FO Semantic MCP Server for Windows
REM This batch file launches the Node.js MCP server

REM Change to the directory where this script is located
cd /d "%~dp0"

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        echo Press any key to exit...
        pause >nul
        exit /b 1
    )
)

REM Check if built files exist
if not exist "dist\server.js" (
    echo Building application...
    npm run build
    if errorlevel 1 (
        echo ERROR: Failed to build application
        echo Press any key to exit...
        pause >nul
        exit /b 1
    )
)

REM Launch the MCP server
node dist/server.js %*