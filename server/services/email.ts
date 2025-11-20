import { MailService } from '@sendgrid/mail';
import { logger } from '../utils/logger';
import { AppError } from '../utils/errors';

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(
  apiKey: string | null,
  params: EmailParams
): Promise<void> {
  // Use provided API key or fall back to environment variable
  const key = apiKey || process.env.SENDGRID_API_KEY || null;
  
  if (!key) {
    logger.warn('SendGrid API key not provided, email will not be sent', {
      to: params.to,
      subject: params.subject,
    });
    throw new AppError(
      500,
      'Email service not configured. Please contact the administrator.'
    );
  }

  try {
    const mailService = new MailService();
    mailService.setApiKey(key);

    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    
    logger.info('Email sent successfully', {
      to: params.to,
      subject: params.subject,
    });
  } catch (error) {
    logger.error('SendGrid email error', error as Error, {
      to: params.to,
      subject: params.subject,
    });
    
    // Re-throw as AppError for proper error handling
    throw new AppError(
      500,
      'Failed to send email. Please try again later.'
    );
  }
}
