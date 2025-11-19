import { MailService } from '@sendgrid/mail';

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(
  apiKey: string,
  params: EmailParams
): Promise<boolean> {
  try {
    // Use provided API key or fall back to environment variable
    const key = apiKey || process.env.SENDGRID_API_KEY || "";
    
    if (!key) {
      console.error("SendGrid API key not provided");
      return false;
    }

    const mailService = new MailService();
    mailService.setApiKey(key);

    // SendGrid requires at least text or html
    const mailData: {
      to: string;
      from: string;
      subject: string;
      text: string;
      html?: string;
    } = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || params.html || params.subject, // Ensure text is always present
    };

    if (params.html) {
      mailData.html = params.html;
    }

    await mailService.send(mailData);
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}
