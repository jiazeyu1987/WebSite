@echo off
setlocal EnableExtensions

cd /d "%~dp0"

set "WEBSITE_HOST=127.0.0.1"
set "WEBSITE_PORT=4173"
set "WEBSITE_URL=http://%WEBSITE_HOST%:%WEBSITE_PORT%/"
set "WEBSITE_VITE_PATH=%cd%\node_modules\vite\bin\vite.js"
set "LISTEN_PID="

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

where powershell >nul 2>nul
if errorlevel 1 (
  echo [ERROR] powershell was not found in PATH.
  echo [ERROR] Windows PowerShell is required to inspect the current website process safely.
  exit /b 1
)

if not exist "node_modules" (
  echo [ERROR] Missing node_modules directory.
  echo [ERROR] Run "npm install" in %cd% before starting the website.
  exit /b 1
)

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /r /c:":%WEBSITE_PORT% .*LISTENING"') do (
  set "LISTEN_PID=%%P"
  goto :found_listener
)

goto :start_server

:found_listener
if not defined LISTEN_PID (
  goto :start_server
)

powershell -NoProfile -Command "$process = Get-CimInstance Win32_Process -Filter 'ProcessId = %LISTEN_PID%' | Select-Object -First 1; if (-not $process) { exit 2 }; $commandLine = [string]$process.CommandLine; $workspaceRoot = [string](Resolve-Path '.').Path; if ($process.Name -ieq 'node.exe' -and $commandLine -like ('*' + $workspaceRoot + '*') -and $commandLine -like '*node_modules*vite\bin\vite.js*') { exit 0 }; exit 3" >nul 2>nul
if errorlevel 3 (
  echo [ERROR] Port %WEBSITE_PORT% is already in use by a non-website process.
  echo [ERROR] Refusing to stop PID %LISTEN_PID% automatically.
  exit /b 1
)
if errorlevel 2 (
  echo [ERROR] Could not inspect the process using %WEBSITE_URL%
  echo [ERROR] Refusing to restart until the current listener can be identified.
  exit /b 1
)

echo Stopping existing website process on %WEBSITE_URL% (PID %LISTEN_PID%)
taskkill /PID %LISTEN_PID% /T /F >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Failed to stop PID %LISTEN_PID%.
  echo [ERROR] Restart aborted because the current website process is still running.
  exit /b 1
)

for /l %%I in (1,1,15) do (
  netstat -ano | findstr /r /c:":%WEBSITE_PORT% .*LISTENING" >nul 2>nul
  if errorlevel 1 goto :start_server
  timeout /t 1 >nul
)

echo [ERROR] Port %WEBSITE_PORT% is still listening after stopping PID %LISTEN_PID%.
echo [ERROR] Restart aborted because the previous website process did not release the port.
exit /b 1

:start_server
echo Restarting website on %WEBSITE_URL%
call npm run dev -- --host %WEBSITE_HOST% --port %WEBSITE_PORT% --strictPort
