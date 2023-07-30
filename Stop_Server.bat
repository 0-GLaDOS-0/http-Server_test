@echo off
for /f "tokens=2 delims==" %%a in ('"WMIC PROCESS Where (CommandLine='node  server.js') Get ProcessId /Value"') do set PID=%%a

taskkill /F /FI "PID eq %PID%"