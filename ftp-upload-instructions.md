# Manual FTP Upload Instructions

Since the automated FTP upload script is encountering issues, here are instructions for manually uploading your website files:

## Using FileZilla (Recommended)

1. **Download and Install FileZilla Client** from [https://filezilla-project.org/](https://filezilla-project.org/)

2. **Import Site Manager Configuration**:
   - Open FileZilla
   - Go to File > Import... 
   - Select the `filezilla-site-manager.xml` file from your project folder

3. **Connect to the Server**:
   - Open the Site Manager (Ctrl+S)
   - Select "The Serpent's Sentence" site
   - Click "Connect"

4. **Upload Files**:
   - Navigate to the `dist` folder in the left panel (local files)
   - Select all files and folders in the `dist` directory
   - Right-click and select "Upload"
   - Files will be uploaded to the `/public_html` directory on the server

## FTP Connection Details

If you prefer to use another FTP client, here are the connection details:

- **Server/Host**: ftp.theserpentssentence.com
- **Username**: u937127586.admin
- **Password**: Nexus**1618
- **Port**: 21 (standard FTP port)
- **Local Directory**: J:\ss_Websitte\dist
- **Remote Directory**: /public_html

## Troubleshooting

If you're having issues connecting:

1. **Verify the server address**: Try using just `theserpentssentence.com` if `ftp.theserpentssentence.com` doesn't work.

2. **Check network restrictions**: Some networks block FTP traffic. Try connecting from a different network or using FTPS/SFTP if available.

3. **Contact hosting provider**: If connection issues persist, contact your hosting provider to verify:
   - The FTP server is online and accessible
   - Your FTP credentials are correct
   - There are no IP restrictions on FTP access

4. **Use GitHub Pages as alternative**: If FTP continues to be problematic, consider using GitHub Pages for hosting:
   - Push your code to GitHub
   - Enable GitHub Pages for your repository
   - Configure it to serve from the `dist` folder or a separate `gh-pages` branch
