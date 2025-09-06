# FTP Upload Script
# This script uploads all website files to the FTP server

# FTP Details
$ftpUrl = "ftp://ftp.theserpentssentence.com"
$ftpUser = "u937127586.admin"
$ftpPath = "public_html"
$sourcePath = "J:\ss_Websitte\dist"
$ftpPassword = "Nexus**1618" # Hardcoded for automation, remove if security is a concern

# Check if the build files exist
if (-not (Test-Path $sourcePath)) {
    Write-Host "Build directory not found. Running build process first..." -ForegroundColor Yellow
    npm run build
}

# Check again if build was successful
if (-not (Test-Path $sourcePath)) {
    Write-Host "Build failed or build directory not found at $sourcePath" -ForegroundColor Red
    exit 1
}

# Create credential (using stored password)
$securePassword = ConvertTo-SecureString $ftpPassword -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($ftpUser, $securePassword)

# Upload files
Write-Host "Starting upload to $ftpUrl/$ftpPath..." -ForegroundColor Cyan

# Create a WebClient object with the credential
$webClient = New-Object System.Net.WebClient
$webClient.Credentials = $credential

# Function to upload directory recursively
function Upload-Directory {
    param (
        [string]$localPath,
        [string]$remotePath
    )
    
    Write-Host "Processing directory: $localPath -> $remotePath" -ForegroundColor Green
    
    # Get all items in the directory
    $items = Get-ChildItem -Path $localPath
    
    foreach ($item in $items) {
        $remoteItem = "$remotePath/$($item.Name)"
        
        if ($item.PSIsContainer) {
            # Try to create the directory (it may fail if it already exists, which is fine)
            try {
                $ftpRequest = [System.Net.FtpWebRequest]::Create("$ftpUrl/$remoteItem")
                $ftpRequest.Credentials = $credential
                $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                $ftpRequest.UseBinary = $true
                $ftpRequest.UsePassive = $true
                $ftpResponse = $ftpRequest.GetResponse()
                $ftpResponse.Close()
            }
            catch {
                # Directory might already exist, which is fine
            }
            
            # Process subdirectory
            Upload-Directory -localPath $item.FullName -remotePath $remoteItem
        }
        else {
            # Upload file
            Write-Host "  Uploading: $($item.Name)" -ForegroundColor White
            try {
                $webClient.UploadFile("$ftpUrl/$remoteItem", $item.FullName)
            }
            catch {
                Write-Host "  Failed to upload: $($item.Name) - $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
}

# Start the upload process
try {
    Upload-Directory -localPath $sourcePath -remotePath $ftpPath
    Write-Host "Upload complete!" -ForegroundColor Green
}
catch {
    Write-Host "An error occurred during upload: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    # Clean up
    $webClient.Dispose()
}
