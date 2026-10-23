@echo off
rem QR menu photo collector - double click to start the dashboard
cd /d "%~dp0"
set PY=python
where py >nul 2>nul && set PY=py -3
%PY% -c "import playwright, PIL" 2>nul || (
  echo Installing playwright and pillow for the first time...
  %PY% -m pip install --upgrade playwright pillow
)
%PY% qrmenu_photos.py
pause
