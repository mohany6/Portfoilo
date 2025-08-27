@echo off
echo Starting Portfolio Development Environment...
echo.
echo Opening 2 terminal windows:
echo 1. Backend server (http://localhost:5000)
echo 2. Frontend server (http://localhost:4200)
echo.

start "Backend Server" cmd /k "cd backend && node server.js"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "cd frontend && ng serve"

echo.
echo Development servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:4200
echo.
pause
