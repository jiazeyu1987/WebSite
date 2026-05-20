@echo off
setlocal

cd /d "%~dp0"

if not exist "package.json" (
  echo [ERROR] Missing package.json in %cd%
  echo [ERROR] Cannot start the website without the project root.
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm was not found in PATH.
  echo [ERROR] Install Node.js and npm first, then run this script again.
  exit /b 1
)

if not exist "node_modules" (
  echo [ERROR] Missing node_modules directory.
  echo [ERROR] Run "npm install" in %cd% before starting the website.
  exit /b 1
)

netstat -ano | findstr /r /c:":4173 .*LISTENING" >nul 2>nul
if not errorlevel 1 (
  echo [ERROR] Port 4173 is already in use.
  echo [ERROR] Stop the process using 127.0.0.1:4173 before starting the website.
  exit /b 1
)

echo Starting website on http://127.0.0.1:4173/
call npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
