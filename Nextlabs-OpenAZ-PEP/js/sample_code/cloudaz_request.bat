@ECHO OFF
setlocal EnableDelayedExpansion

for %%i in ("%~dp0.") do SET "CURRENT_DIR=%%~fi"

echo Running npm install
call npm install

for %%j in ("%CURRENT_DIR%\*.js") DO (
  echo Executing node code: %%~nxj
  node "%%j"
)
