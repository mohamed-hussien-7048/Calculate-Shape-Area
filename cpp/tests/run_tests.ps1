
$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "../..")
$buildDirectory = Join-Path $projectRoot "cpp/build"
$includeDirectory = Join-Path $projectRoot "cpp/include"
$sourceDirectory = Join-Path $projectRoot "cpp/src"
$testsDirectory = $PSScriptRoot

$passed = 0
$failed = 0

function Write-TestResult {
    param(
        [string]$TestName,
        [bool]$Success
    )

    if ($Success) {
        Write-Host "[PASSED] $TestName" -ForegroundColor Green
        $script:passed++
    }
    else {
        Write-Host "[FAILED] $TestName" -ForegroundColor Red
        $script:failed++
    }
}

function Build-And-RunTest {
    param(
        [string]$TestName,
        [string]$TestSource
    )

    $executable = Join-Path $buildDirectory "$TestName.exe"

    & g++ -std=c++17 -Wall -Wextra -Wpedantic `
        "-I$includeDirectory" `
        $TestSource `
        (Join-Path $sourceDirectory "shapes/Circle.cpp") `
        (Join-Path $sourceDirectory "shapes/Rectangle.cpp") `
        -o $executable

    if ($LASTEXITCODE -ne 0) {
        Write-TestResult $TestName $false
        return
    }

    & $executable

    Write-TestResult $TestName ($LASTEXITCODE -eq 0)
}


function Build-ExpectedFailureTest {
    param(
        [string]$TestName,
        [string]$TestSource
    )

    $objectFile = Join-Path $buildDirectory "$TestName.o"
    $previousPreference = $ErrorActionPreference

    try {
        $ErrorActionPreference = "Continue"

        & g++ -std=c++17 -Wall -Wextra -Wpedantic `
            "-I$includeDirectory" `
            -c $TestSource `
            -o $objectFile 2>$null

        $compileExitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $previousPreference
    }

    if ($compileExitCode -ne 0) {
        Write-TestResult $TestName $true
    }
    else {
        Write-TestResult $TestName $false
    }

    if (Test-Path $objectFile) {
        Remove-Item $objectFile -Force
    }
}

Write-Host "`n========== C++ TEST SUITE ==========`n" -ForegroundColor Cyan

Build-And-RunTest `
    "oop_test" `
    (Join-Path $testsDirectory "oop_test.cpp")

Build-And-RunTest `
    "validation_test" `
    (Join-Path $testsDirectory "validation_test.cpp")

Build-ExpectedFailureTest `
    "encapsulation_negative_test" `
    (Join-Path $testsDirectory "encapsulation_negative_test.cpp")

Build-ExpectedFailureTest `
    "abstraction_negative_test" `
    (Join-Path $testsDirectory "abstraction_negative_test.cpp")

Write-Host "`n========== TEST SUMMARY ==========" -ForegroundColor Cyan

Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red

if ($failed -gt 0) {
    exit 1
}

Write-Host "`nAll tests completed successfully." -ForegroundColor Green

exit 0
