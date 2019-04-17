@ECHO OFF
setlocal EnableDelayedExpansion

for %%i in ("%~dp0.") do SET "CURRENT_DIR=%%~fi"

for %%j in ("%CURRENT_DIR%\*.java") DO (
  echo Compiling Java code: %%~nxj
  javac -cp "%CURRENT_DIR%/../nextlabs-openaz-pep.jar;%CURRENT_DIR%/../libs/*" "%%j"
  echo Executing Java class: %%~nj
  java -cp "%CURRENT_DIR%;%CURRENT_DIR%/../nextlabs-openaz-pep.jar;%CURRENT_DIR%/../libs/*;%CURRENT_DIR%/config" "%%~nj"
)
