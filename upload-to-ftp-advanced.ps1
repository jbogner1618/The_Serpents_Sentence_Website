# WinSCP .NET assembly-based upload script

# Load WinSCP .NET assembly
try {
    # Try to load WinSCP .NET assembly
    Add-Type -Path "C:\Program Files (x86)\WinSCP\WinSCPnet.dll" -ErrorAction Stop
    $winScpAvailable = $true
}
catch {
    Write-Host "WinSCP .NET assembly not found. The script will use built-in WebClient instead." -ForegroundColor Yellow
    Write-Host "For better reliability, consider installing WinSCP (https://winscp.net/)" -ForegroundColor Yellow
    $winScpAvailable = $false
}

# FTP Details
$ftpHost = "ftp.theserpentssentence.com" 
$ftpUser = "u937127586.admin"
$ftpPass = "Nexus**1618"
$ftpRemotePath = "/public_html"
$localPath = "J:\ss_Websitte\dist"

# Build the site first
Write-Host "Building the website..." -ForegroundColor Cyan
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed with exit code $LASTEXITCODE"
    }
    Write-Host "Build successful!" -ForegroundColor Green
} catch {
    Write-Host "Build failed: $_" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $localPath)) {
    Write-Host "Build directory not found at $localPath" -ForegroundColor Red
    exit 1
}

# Upload function using WebClient (fallback)
function Upload-UsingWebClient {
    param(
        [string]$ftpHost,
        [string]$ftpUser,
        [string]$ftpPass,
        [string]$ftpRemotePath,
        [string]$localPath
    )
    
    Write-Host "Uploading using WebClient..." -ForegroundColor Cyan
    
    # Create credentials
    $credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
    
    # Create WebClient
    $webclient = New-Object System.Net.WebClient
    $webclient.Credentials = $credentials
    
    # Function to upload directory recursively
    function Upload-Directory {
        param(
            [string]$localDir,
            [string]$remoteDir
        )
        
        Write-Host "Processing directory: $localDir -> $remoteDir" -ForegroundColor Green
        
        # Get all items in directory
        $items = Get-ChildItem -Path $localDir
        
        foreach ($item in $items) {
            $remotePath = "ftp://$ftpHost$remoteDir/$($item.Name)"
            
            if ($item.PSIsContainer) {
                # Create directory
                try {
                    $ftpRequest = [System.Net.FtpWebRequest]::Create($remotePath)
                    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                    $ftpRequest.Credentials = $credentials
                    $ftpRequest.GetResponse() | Out-Null
                } catch {
                    # Directory may already exist, which is fine
                }
                
                # Process subdirectory
                Upload-Directory -localDir $item.FullName -remoteDir "$remoteDir/$($item.Name)"
            } else {
                # Upload file
                try {
                    Write-Host "  Uploading: $($item.Name)" -ForegroundColor White
                    $webclient.UploadFile($remotePath, $item.FullName)
                } catch {
                    Write-Host "  Failed to upload: $($item.Name) - $_" -ForegroundColor Red
                }
            }
        }
    }
    
    # Start upload
    Upload-Directory -localDir $localPath -remoteDir $ftpRemotePath
    
    # Cleanup
    $webclient.Dispose()
}

# Upload function using WinSCP
function Upload-UsingWinSCP {
    param(
        [string]$ftpHost,
        [string]$ftpUser,
        [string]$ftpPass,
        [string]$ftpRemotePath,
        [string]$localPath
    )
    
    Write-Host "Uploading using WinSCP..." -ForegroundColor Cyan
    
    # Setup session options
    $sessionOptions = New-Object WinSCP.SessionOptions
    $sessionOptions.Protocol = [WinSCP.Protocol]::Ftp
    $sessionOptions.HostName = $ftpHost
    $sessionOptions.UserName = $ftpUser
    $sessionOptions.Password = $ftpPass
    $sessionOptions.FtpMode = [WinSCP.FtpMode]::Passive
    
    # Connect
    $session = New-Object WinSCP.Session
    try {
        $session.Open($sessionOptions)
        
        # Upload files
        $transferOptions = New-Object WinSCP.TransferOptions
        $transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
        
        # Synchronize directories - uploads new and modified files
        $result = $session.SynchronizeDirectories(
            [WinSCP.SynchronizationMode]::Remote,
            $localPath,
            $ftpRemotePath,
            $true,
            $false,
            [WinSCP.SynchronizationCriteria]::Time,
            $transferOptions)
        
        # Check for errors
        $result.Check()
        
        # Display results
        foreach ($transfer in $result.Transfers) {
            Write-Host "Uploaded: $($transfer.FileName)" -ForegroundColor Green
        }
        
        Write-Host "Upload completed successfully!" -ForegroundColor Green
    }
    finally {
        # Disconnect, clean up
        $session.Dispose()
    }
}

# Try alternative FTP hosts if the primary one doesn't work
$ftpHosts = @(
    "ftp.theserpentssentence.com",
    "theserpentssentence.com"
)

$uploadSuccess = $false

foreach ($host in $ftpHosts) {
    Write-Host "Trying to connect to $host..." -ForegroundColor Yellow
    
    # Test connection
    try {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        $connectionResult = $tcpClient.BeginConnect($host, 21, $null, $null)
        $waitHandle = $connectionResult.AsyncWaitHandle
        $waitHandle.WaitOne(1000, $false) | Out-Null
        $tcpClient.Close()
        
        if ($connectionResult.IsCompleted) {
            Write-Host "Connection to $host successful!" -ForegroundColor Green
            $ftpHost = $host
            
            # Upload files
            if ($winScpAvailable) {
                Upload-UsingWinSCP -ftpHost $ftpHost -ftpUser $ftpUser -ftpPass $ftpPass -ftpRemotePath $ftpRemotePath -localPath $localPath
            } else {
                Upload-UsingWebClient -ftpHost $ftpHost -ftpUser $ftpUser -ftpPass $ftpPass -ftpRemotePath $ftpRemotePath -localPath $localPath
            }
            
            $uploadSuccess = $true
            break
        }
    }
    catch {
        Write-Host "Failed to connect to $host" -ForegroundColor Red
    }
}

if (-not $uploadSuccess) {
    Write-Host "Failed to upload files. Could not connect to any FTP server." -ForegroundColor Red
    
    # Additional troubleshooting information
    Write-Host "`nTroubleshooting information:" -ForegroundColor Yellow
    Write-Host "1. Check if the FTP server is online"
    Write-Host "2. Verify the FTP credentials"
    Write-Host "3. Check your network connection"
    Write-Host "4. Try using a dedicated FTP client like FileZilla"
    
    Write-Host "`nFTP Details for manual connection:" -ForegroundColor Cyan
    Write-Host "FTP Server: $ftpHost"
    Write-Host "Username: $ftpUser"
    Write-Host "Remote Path: $ftpRemotePath"
    Write-Host "Local Path: $localPath"
}
