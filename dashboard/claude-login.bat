@echo off
rem Jinwoo agent - one-time Claude Code login for the dashboard order box.
rem Opens Claude Code (the copy installed by the Claude desktop app) in this window.
rem Choose "Claude account with subscription", log in in the browser, then type /exit.
chcp 65001 >nul
cd /d "%~dp0.."
for /f "delims=" %%F in ('powershell -NoProfile -Command "Get-ChildItem \"$env:LOCALAPPDATA\Claude-Data\*\claude-code\*\*\claude.exe\" | Sort-Object { [version]$_.Directory.Parent.Name } | Select-Object -Last 1 -ExpandProperty FullName"') do set CLAUDE=%%F
if not defined CLAUDE (
  echo Claude Code not found. Open the Claude desktop app Code tab once, then try again.
  pause
  exit /b 1
)
echo.
echo  1. Login method: choose "Claude account with subscription" (Pro).
echo  2. Log in on the browser page that opens.
echo  3. When you see the chat box here, type /exit and press Enter.
echo.
"%CLAUDE%" /login
pause
