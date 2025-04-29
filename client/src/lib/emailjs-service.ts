import emailjs from '@emailjs/browser';

// EmailJS configuration settings
// Replace these values with your own EmailJS credentials once you create an account
// You can find these credentials in your EmailJS dashboard after setting up a service
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
const TEMPLATE_ID_CONTACT = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'contact_form';
const TEMPLATE_ID_NEWSLETTER = import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID || 'newsletter';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Initialize EmailJS with your user ID
emailjs.init({
  publicKey: PUBLIC_KEY,
});

/**
 * Sends a contact form submission via EmailJS
 */
export const sendContactForm = async (data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) => {
  try {
    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone || 'N/A',
      from_company: data.company || 'N/A',
      message: data.message,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_CONTACT,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Error sending contact form:', error);
    return { success: false, error };
  }
};

/**
 * Sends a newsletter subscription confirmation via EmailJS
 */
export const sendNewsletterConfirmation = async (email: string) => {
  try {
    // Prepare template parameters
    const templateParams = {
      subscriber_email: email,
      unsubscribe_url: `https://haydeentech.com/newsletter/unsubscribe?email=${encodeURIComponent(email)}`,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_NEWSLETTER,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    return { success: false, error };
  }
};
