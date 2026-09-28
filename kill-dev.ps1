# Stop any leftover Next.js dev server from this project, on any port
$project = (Get-Location).Path
Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -and $_.CommandLine -like "*$project*next*" } |
  ForEach-Object {
    Write-Host "Stopping old Next.js server (PID $($_.ProcessId))"
    Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
  }

# Remove the stale lock so Next doesn't think a server is still running
if (Test-Path ".next\dev") { Remove-Item ".next\dev" -Recurse -Force -ErrorAction SilentlyContinue }