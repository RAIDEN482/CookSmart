@echo off
title Cook Smart - Localhost Server
echo ===================================================
echo           Starting Cook Smart Dev Server...
echo ===================================================
echo.
cd /d "%~dp0"

:: Open the browser after 2 seconds
start "" http://localhost:5173

:: Start the Vite development server
npm run dev

pause
