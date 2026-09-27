# 숏폼 리퍼포징 개발 서버 실행 스크립트
# "숏폼리퍼포징 실행파일.bat"이 이 파일을 불러서 실행한다.
# (cmd 배치파일 안에 한글을 넣으면 깨지므로, 한글 안내는 전부 이 PowerShell 쪽에 둔다)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [Text.Encoding]::UTF8

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 5175
$url = "http://localhost:$port/"

Set-Location -LiteralPath $projectDir

Write-Host ""
Write-Host "=== 숏폼 리퍼포징 개발 서버 ===" -ForegroundColor Cyan
Write-Host "폴더: $projectDir"
Write-Host ""

# 이미 켜져 있는 서버가 있으면 정리한다. 포트를 못 잡은 채 "실행 중"처럼 보이는 껍데기
# 프로세스가 남아 있는 경우가 있어서, 포트 주인뿐 아니라 이 프로젝트의 node 프로세스도 같이 확인한다.
function Stop-ExistingServer {
    $stopped = $false

    $conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($conn) {
        $owner = Get-CimInstance Win32_Process -Filter "ProcessId=$($conn.OwningProcess)" -ErrorAction SilentlyContinue
        if ($owner -and $owner.CommandLine -like "*server*index.js*") {
            Write-Host "이미 켜져 있는 서버를 종료합니다 (PID $($owner.ProcessId))" -ForegroundColor Yellow
            Stop-Process -Id $owner.ProcessId -Force
            $stopped = $true
        }
        elseif ($owner) {
            Write-Host "$port 포트를 다른 프로그램이 쓰고 있어요:" -ForegroundColor Red
            Write-Host "  PID $($owner.ProcessId) - $($owner.Name)"
            $answer = Read-Host "그 프로그램을 종료하고 계속할까요? (y/N)"
            if ($answer -eq "y") { Stop-Process -Id $owner.ProcessId -Force; $stopped = $true }
            else { Write-Host "중단합니다. 그 프로그램을 끄고 다시 실행해주세요." -ForegroundColor Red; exit 1 }
        }
    }

    # 포트를 못 잡고 남아 있는 이 프로젝트의 서버 프로세스 정리
    Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue |
        Where-Object { $_.CommandLine -like "*$projectDir*" -and $_.CommandLine -like "*server*index.js*" } |
        ForEach-Object {
            Write-Host "남아 있던 서버 프로세스를 정리합니다 (PID $($_.ProcessId))" -ForegroundColor Yellow
            Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
            $stopped = $true
        }

    if ($stopped) { Start-Sleep -Seconds 1 }
}

Stop-ExistingServer

if (-not (Test-Path -LiteralPath (Join-Path $projectDir "node_modules"))) {
    Write-Host "처음 실행이라 필요한 파일을 내려받습니다. 몇 분 걸릴 수 있어요..." -ForegroundColor Yellow
    & npm.cmd install
}

# 서버가 준비되면 브라우저를 자동으로 연다(서버 자체는 이 창에서 계속 돌아간다)
Start-Job -ScriptBlock {
    param($u)
    for ($i = 0; $i -lt 90; $i++) {
        try {
            Invoke-WebRequest -Uri $u -TimeoutSec 2 -UseBasicParsing | Out-Null
            Start-Process $u
            break
        } catch { Start-Sleep -Seconds 1 }
    }
} -ArgumentList $url | Out-Null

Write-Host "서버를 시작합니다. 준비되면 브라우저가 자동으로 열려요." -ForegroundColor Green
Write-Host "주소: $url"
Write-Host "끄려면 이 창을 닫거나 Ctrl+C 를 누르세요." -ForegroundColor DarkGray
Write-Host ""

& npm.cmd run dev

Write-Host ""
Write-Host "서버가 종료됐어요." -ForegroundColor Yellow
