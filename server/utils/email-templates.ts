/**
 * Email template utilities with sanitization
 */
import { sanitizeEmailContent } from './sanitize';

export interface ContactFormEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface JobApplicationEmailData {
  position: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  university?: string;
  studyField?: string;
  graduationYear?: string;
  experience?: string;
  motivation: string;
  cvFileName?: string;
  applicationId: number;
}

/**
 * Creates sanitized contact form notification email
 */
export function createContactNotificationEmail(data: ContactFormEmailData): string {
  const sanitized = {
    name: sanitizeEmailContent(data.name),
    email: sanitizeEmailContent(data.email),
    phone: data.phone ? sanitizeEmailContent(data.phone) : 'Not provided',
    company: data.company ? sanitizeEmailContent(data.company) : 'Not provided',
    message: sanitizeEmailContent(data.message),
  };

  return `
New contact form submission:

Name: ${sanitized.name}
Email: ${sanitized.email}
Phone: ${sanitized.phone}
Company: ${sanitized.company}

Message:
${sanitized.message}
  `.trim();
}

/**
 * Creates sanitized contact form confirmation email
 */
export function createContactConfirmationEmail(name: string): string {
  const sanitizedName = sanitizeEmailContent(name);
  return `
Dear ${sanitizedName},

Thank you for contacting Haydeen Technologies. We have received your message and will get back to you as soon as possible.

Best regards,
The Haydeen Technologies Team
  `.trim();
}

/**
 * Creates sanitized newsletter subscription email
 */
export function createNewsletterSubscriptionEmail(email: string, unsubscribeUrl: string): string {
  return `
Dear Subscriber,

Thank you for subscribing to the Haydeen Technologies newsletter. You'll now receive updates on our solutions, industry insights, and upcoming events.

If you did not request this subscription, please click here to unsubscribe:
${unsubscribeUrl}

Best regards,
The Haydeen Technologies Team
  `.trim();
}

/**
 * Creates sanitized job application notification email
 */
export function createJobApplicationNotificationEmail(data: JobApplicationEmailData): string {
  const sanitized = {
    position: sanitizeEmailContent(data.position),
    firstName: sanitizeEmailContent(data.firstName),
    lastName: sanitizeEmailContent(data.lastName),
    email: sanitizeEmailContent(data.email),
    phone: sanitizeEmailContent(data.phone),
    location: sanitizeEmailContent(data.location),
    university: data.university ? sanitizeEmailContent(data.university) : 'Not provided',
    studyField: data.studyField ? sanitizeEmailContent(data.studyField) : 'Not provided',
    graduationYear: data.graduationYear ? sanitizeEmailContent(data.graduationYear) : 'Not provided',
    experience: data.experience ? sanitizeEmailContent(data.experience) : 'Not provided',
    motivation: sanitizeEmailContent(data.motivation),
    cvFileName: data.cvFileName ? sanitizeEmailContent(data.cvFileName) : 'Not provided',
  };

  return `
New job application received:

Position: ${sanitized.position}
Name: ${sanitized.firstName} ${sanitized.lastName}
Email: ${sanitized.email}
Phone: ${sanitized.phone}
Location: ${sanitized.location}
University: ${sanitized.university}
Field of Study: ${sanitized.studyField}
Graduation Year: ${sanitized.graduationYear}

Experience:
${sanitized.experience}

Motivation:
${sanitized.motivation}

CV: ${sanitized.cvFileName}

Application ID: ${data.applicationId}
  `.trim();
}

/**
 * Creates sanitized job application confirmation email
 */
export function createJobApplicationConfirmationEmail(data: {
  firstName: string;
  position: string;
  applicationId: number;
}): string {
  const sanitized = {
    firstName: sanitizeEmailContent(data.firstName),
    position: sanitizeEmailContent(data.position),
  };

  return `
Dear ${sanitized.firstName},

Thank you for applying for the ${sanitized.position} position at Haydeen Technologies. We have received your application and will review it carefully.

We appreciate your interest in joining our team and helping us build innovative solutions for Ghana's agricultural and healthcare sectors. Our team will review your application and get back to you within 1-2 weeks.

If you have any questions in the meantime, please don't hesitate to contact us.

Best regards,
The Haydeen Technologies Team

Application Details:
- Position: ${sanitized.position}
- Application ID: ${data.applicationId}
- Submitted: ${new Date().toLocaleDateString()}
  `.trim();
}

