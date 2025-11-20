# File Storage Migration Guide

## Overview

The file upload system has been improved to use file system storage instead of storing files as base64 in the database. This provides better performance, scalability, and maintainability.

## What Changed

### Before
- CV files were stored as base64-encoded strings in the `cvFileData` database column
- This was inefficient for large files and increased database size
- No file management capabilities

### After
- CV files are stored in the `uploads/` directory on the file system
- Only the file path is stored in the database (`cvFileData` now stores the file path)
- File storage service provides better file management
- Ready for cloud storage integration (S3, Cloudinary, etc.)

## Database Schema

The database schema remains the same, but the `cvFileData` field now stores:
- **Before**: Base64-encoded file content
- **After**: File path (e.g., `uploads/cv_1234567890_abc123.pdf`)

## Configuration

### Environment Variables

Add to your `.env` file:

```env
# File Upload Configuration (Optional)
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes
```

### Directory Structure

The file storage service will automatically create the `uploads/` directory if it doesn't exist.

```
HaydeenPortal/
├── uploads/          # Created automatically
│   ├── cv_1234567890_abc123.pdf
│   └── cv_1234567891_def456.pdf
└── ...
```

## Migration Steps

### 1. For New Deployments

No migration needed! The new system will work automatically.

### 2. For Existing Deployments with Base64 Files

If you have existing job applications with base64-encoded files, you have two options:

#### Option A: Keep Base64 Files (Recommended for Small Deployments)

The system will continue to work with existing base64 files. New uploads will use file storage.

#### Option B: Migrate Existing Files

Create a migration script to extract base64 files and save them to disk:

```typescript
// scripts/migrate-files.ts
import { db } from '../server/db';
import { jobApplications } from '@shared/schema';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

async function migrateFiles() {
  const applications = await db.select().from(jobApplications);
  const uploadDir = './uploads';
  
  await mkdir(uploadDir, { recursive: true });
  
  for (const app of applications) {
    if (app.cvFileData && app.cvFileName && app.cvFileData.startsWith('data:')) {
      // This is base64 data, extract and save
      const base64Data = app.cvFileData.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `cv_${app.id}_${Date.now()}.pdf`;
      const filePath = join(uploadDir, fileName);
      
      await writeFile(filePath, buffer);
      
      // Update database with file path
      await db
        .update(jobApplications)
        .set({ cvFileData: filePath })
        .where(eq(jobApplications.id, app.id));
      
      console.log(`Migrated file for application ${app.id}`);
    }
  }
}

migrateFiles();
```

## File Access

### Serving Files

To serve uploaded files, add a route in `server/routes.ts`:

```typescript
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getFileStorage } from './utils/file-storage';

// Serve CV files (with authentication/authorization)
app.get('/api/files/cv/:fileName', async (req, res, next) => {
  try {
    const { fileName } = req.params;
    const fileStorage = getFileStorage();
    const filePath = fileStorage.getFilePath(fileName);
    
    // TODO: Add authentication/authorization check here
    // Only allow access to authorized users (admin, HR, etc.)
    
    const file = await readFile(filePath);
    const ext = fileName.split('.').pop();
    const contentType = ext === 'pdf' ? 'application/pdf' : 
                       ext === 'doc' ? 'application/msword' : 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(file);
  } catch (error) {
    next(error);
  }
});
```

### Security Considerations

1. **Authentication**: Always verify user permissions before serving files
2. **File Validation**: The file storage service validates file types and sizes
3. **Path Traversal**: File names are sanitized to prevent directory traversal attacks
4. **Access Control**: Implement proper access control for sensitive files like CVs

## Cloud Storage Integration

The file storage service is designed to be easily extended for cloud storage. Here's an example for AWS S3:

```typescript
// server/utils/file-storage-s3.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3FileStorage extends FileStorageService {
  private s3Client: S3Client;
  private bucketName: string;

  async saveFile(file: FileUploadInput): Promise<FileUploadResult> {
    // Upload to S3 instead of local storage
    const fileName = this.generateFileName(file.originalname);
    
    await this.s3Client.send(new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    return {
      fileName,
      filePath: `s3://${this.bucketName}/${fileName}`, // Store S3 path
      fileSize: file.size,
      mimeType: file.mimetype,
    };
  }

  async getFileUrl(fileName: string): Promise<string> {
    // Generate presigned URL for secure file access
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });
    
    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
}
```

## Benefits

1. **Performance**: Files are served directly from disk/cloud, not from database
2. **Scalability**: Database size is reduced, better for large files
3. **Maintainability**: Easier to manage, backup, and migrate files
4. **Flexibility**: Easy to switch to cloud storage when needed
5. **Cost**: Reduced database storage costs

## Troubleshooting

### Files Not Saving

1. Check that the `uploads/` directory is writable
2. Verify `UPLOAD_DIR` environment variable is set correctly
3. Check file permissions on the upload directory

### Files Not Found

1. Verify file paths in the database
2. Check that files weren't accidentally deleted
3. Ensure the upload directory exists

### File Size Errors

1. Check `MAX_FILE_SIZE` environment variable
2. Verify server has enough disk space
3. Check multer configuration matches file storage limits

## Next Steps

1. **Add File Cleanup**: Implement scheduled cleanup of old/unused files
2. **Add File Compression**: Compress PDFs before storage
3. **Add Virus Scanning**: Scan uploaded files for malware
4. **Add Cloud Storage**: Migrate to S3/Cloudinary for production
5. **Add File Versioning**: Keep multiple versions of CVs

