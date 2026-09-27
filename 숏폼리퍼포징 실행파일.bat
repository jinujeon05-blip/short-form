@echo off
rem Keep this file ASCII-only. All Korean messages live in start-server.ps1.
chcp 65001 > nul
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
