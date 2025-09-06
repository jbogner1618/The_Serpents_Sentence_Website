# Simple FTP Upload Script for The Serpent's Sentence Website
# This script uses a minimal approach to upload files

# FTP Details
$ftpServer = "ftp.theserpentssentence.com"
$ftpUsername = "u937127586.admin"
$ftpPassword = "Nexus**1618"
$ftpRemotePath = "/public_html"
$localPath = "J:\ss_Websitte\dist"

# Make sure we have files to upload
if (-not (Test-Path $localPath)) {
    Write-Host "Building the website first..." -ForegroundColor Yellow
    npm run build
    
    if (-not (Test-Path $localPath)) {
        Write-Host "Build failed or directory not found at $localPath" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Preparing to upload files to $ftpServer..." -ForegroundColor Cyan

# Create FTP client
$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($ftpUsername, $ftpPassword)

# Function to upload directory recursively
function Upload-FolderRecursively {
    param(
        [string]$LocalFolder,
        [string]$RemoteFolder
    )
    
    Write-Host "Processing directory: $LocalFolder -> $RemoteFolder" -ForegroundColor Yellow
    
    # Get all items in directory
    $items = Get-ChildItem -Path $LocalFolder
    
    foreach ($item in $items) {
        $remotePath = "ftp://$ftpServer$RemoteFolder/$($item.Name)"
        
        if ($item.PSIsContainer) {
            # Create directory
            try {
                $ftpRequest = [System.Net.FtpWebRequest]::Create($remotePath)
                $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                $ftpRequest.Credentials = $webclient.Credentials
                $ftpResponse = $ftpRequest.GetResponse()
                $ftpResponse.Close()
                Write-Host "Created directory: $($item.Name)" -ForegroundColor Green
            } catch {
                Write-Host "Directory may already exist: $($item.Name)" -ForegroundColor Yellow
            }
            
            # Process subdirectory
            Upload-FolderRecursively -LocalFolder $item.FullName -RemoteFolder "$RemoteFolder/$($item.Name)"
        } else {
            # Upload file
            try {
                Write-Host "Uploading: $($item.Name)" -ForegroundColor Cyan
                $webclient.UploadFile($remotePath, $item.FullName)
                Write-Host "Successfully uploaded: $($item.Name)" -ForegroundColor Green
            } catch {
                Write-Host "Failed to upload: $($item.Name) - $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
}

# Try alternative server name if the first doesn't work
$ftpServerOptions = @(
    "ftp.theserpentssentence.com", 
    "theserpentssentence.com"
)

$uploadSuccessful = $false

foreach ($server in $ftpServerOptions) {
    Write-Host "Trying to connect to $server..." -ForegroundColor Yellow
    
    try {
        # Test connection with a simple command
        $testRequest = [System.Net.FtpWebRequest]::Create("ftp://$server/")
        $testRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
        $testRequest.Credentials = $webclient.Credentials
        $testRequest.Timeout = 10000 # 10 seconds
        
        $response = $testRequest.GetResponse()
        $response.Close()
        
        Write-Host "Connection to $server successful!" -ForegroundColor Green
        $ftpServer = $server
        
        # Start upload process
        Upload-FolderRecursively -LocalFolder $localPath -RemoteFolder $ftpRemotePath
        
        $uploadSuccessful = $true
        break
    }
    catch {
        Write-Host "Could not connect to $server - $($_.Exception.Message)" -ForegroundColor Red
    }
}

if (-not $uploadSuccessful) {
    Write-Host "`nAll connection attempts failed. Please try these troubleshooting steps:" -ForegroundColor Red
    Write-Host "1. Verify the FTP server address is correct"
    Write-Host "2. Check that the FTP credentials are valid"
    Write-Host "3. Ensure your network allows FTP connections (port 21)"
    Write-Host "4. Try using FileZilla or another FTP client with these credentials:"
    Write-Host "   - Host: $ftpServer"
    Write-Host "   - Username: $ftpUsername"
    Write-Host "   - Password: (provided in script)"
    Write-Host "   - Port: 21"
}

# Clean up
$webclient.Dispose()

if ($uploadSuccessful) {
    Write-Host "Upload process completed successfully!" -ForegroundColor Green
} else {
    Write-Host "Upload process failed." -ForegroundColor Red
}
