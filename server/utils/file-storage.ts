/**
 * File storage service
 * Handles file uploads with support for local storage and cloud storage
 * 
 * Currently implements local file storage. Can be extended to support:
 * - AWS S3
 * - Cloudinary
 * - Google Cloud Storage
 * - Azure Blob Storage
 */

import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { logger } from './logger';
import { AppError } from './errors';

export interface FileUploadResult {
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
}

export interface FileStorageConfig {
  uploadDir: string;
  maxFileSize: number; // in bytes
  allowedMimeTypes: string[];
}

const DEFAULT_CONFIG: FileStorageConfig = {
  uploadDir: './uploads',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

export class FileStorageService {
  private config: FileStorageConfig;

  constructor(config: Partial<FileStorageConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Initialize storage directory
   */
  async initialize(): Promise<void> {
    try {
      if (!existsSync(this.config.uploadDir)) {
        await mkdir(this.config.uploadDir, { recursive: true });
        logger.info('Created upload directory', { path: this.config.uploadDir });
      }
    } catch (error) {
      logger.error('Failed to initialize file storage', error as Error);
      throw new AppError(500, 'Failed to initialize file storage');
    }
  }

  /**
   * Validate file before upload
   */
  validateFile(file: { size: number; mimetype: string; originalname: string }): void {
    if (file.size > this.config.maxFileSize) {
      throw new AppError(
        400,
        `File size exceeds maximum allowed size of ${this.config.maxFileSize / 1024 / 1024}MB`
      );
    }

    if (!this.config.allowedMimeTypes.includes(file.mimetype)) {
      throw new AppError(
        400,
        `File type ${file.mimetype} is not allowed. Allowed types: ${this.config.allowedMimeTypes.join(', ')}`
      );
    }
  }

  /**
   * Generate a unique filename to prevent collisions
   */
  private generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_');
    return `${nameWithoutExt}_${timestamp}_${random}.${extension}`;
  }

  /**
   * Save file to storage
   */
  async saveFile(
    file: { buffer: Buffer; originalname: string; mimetype: string; size: number }
  ): Promise<FileUploadResult> {
    this.validateFile(file);

    const fileName = this.generateFileName(file.originalname);
    const filePath = join(this.config.uploadDir, fileName);

    try {
      await writeFile(filePath, file.buffer);
      
      logger.info('File saved successfully', {
        fileName,
        filePath,
        size: file.size,
        mimeType: file.mimetype,
      });

      return {
        fileName,
        filePath,
        fileSize: file.size,
        mimeType: file.mimetype,
      };
    } catch (error) {
      logger.error('Failed to save file', error as Error, {
        originalName: file.originalname,
      });
      throw new AppError(500, 'Failed to save file');
    }
  }

  /**
   * Delete file from storage
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      if (existsSync(filePath)) {
        await unlink(filePath);
        logger.info('File deleted successfully', { filePath });
      }
    } catch (error) {
      logger.error('Failed to delete file', error as Error, { filePath });
      // Don't throw - file deletion failures shouldn't break the app
    }
  }

  /**
   * Get file path for a stored file
   */
  getFilePath(fileName: string): string {
    return join(this.config.uploadDir, fileName);
  }
}

// Singleton instance
let fileStorage: FileStorageService | null = null;

export function getFileStorage(): FileStorageService {
  if (!fileStorage) {
    fileStorage = new FileStorageService({
      uploadDir: process.env.UPLOAD_DIR || './uploads',
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB default
    });
  }
  return fileStorage;
}

