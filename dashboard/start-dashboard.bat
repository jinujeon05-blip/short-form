@echo off
rem QR menu dashboard - only this PC (127.0.0.1:8899). Close this window to stop.
cd /d "%~dp0"
set PY=python
where python >nul 2>nul || set PY=py
rem Chrome first (user wants Chrome), otherwise the default browser
set CHROME=
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set CHROME="%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set CHROME="%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set CHROME="%LocalAppData%\Google\Chrome\Application\chrome.exe"
if not defined CHROME goto default
start "" %CHROME% http://127.0.0.1:8899
goto run
:default
start "" http://127.0.0.1:8899
:run
%PY% server.py
pause
