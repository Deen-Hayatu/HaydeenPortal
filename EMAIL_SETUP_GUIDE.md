# Email.js Setup Guide for Haydeen Technologies Website

This guide will help you set up Email.js for handling contact form submissions and newsletter subscriptions on the Haydeen Technologies website.

## Step 1: Create an Email.js Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up for an account.
2. Once registered, log in to your Email.js dashboard.

## Step 2: Add an Email Service

1. In your Email.js dashboard, go to the "Email Services" section.
2. Click "Add New Service".
3. Select your email service provider (Gmail, Outlook, custom SMTP, etc.).
4. Follow the instructions to connect your email account.
5. Name the service (e.g., "Haydeen Tech Service") and save it.
6. Note down the **Service ID** for later use.

## Step 3: Create Email Templates

### Contact Form Template

1. In your Email.js dashboard, go to the "Email Templates" section.
2. Click "Create New Template".
3. Name the template (e.g., "Contact Form").
4. Set up the template with the following structure:

   - **Subject**: New Contact Form Submission - Haydeen Technologies
   - **Content**:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Phone: {{from_phone}}
     Company: {{from_company}}
     
     Message:
     {{message}}
     ```

5. Save the template and note down the **Template ID**.

### Newsletter Template

1. Create another template named "Newsletter Subscription".
2. Set up the template with the following structure:

   - **Subject**: Welcome to the Haydeen Technologies Newsletter
   - **Content**:
     ```
     Hello,
     
     Thank you for subscribing to the Haydeen Technologies newsletter. You'll now receive updates on our solutions, industry insights, and upcoming events.
     
     If you did not request this subscription, please click here to unsubscribe:
     {{unsubscribe_url}}
     
     Best regards,
     The Haydeen Technologies Team
     ```

3. Save the template and note down the **Template ID**.

## Step 4: Get Your Public Key

1. In your Email.js dashboard, go to the "Account" section.
2. Find your **Public Key** in the account settings.

## Step 5: Configure the Website

Create a `.env` file in the root of the project with the following variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID=your_newsletter_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Replace the placeholder values with the actual IDs and keys you noted down in the previous steps.

## Step 6: Test the Forms

1. Start the application.
2. Go to the Contact page and fill out the form.
3. Submit the form and check if you receive the email.
4. Test the newsletter subscription form on the homepage in the same way.

## Troubleshooting

If emails are not being sent:

1. Check the browser console for any errors.
2. Verify that all the IDs and keys in the `.env` file are correct.
3. Make sure your Email.js service is properly connected.
4. Check your Email.js dashboard for any quota limitations or issues.

## Free Plan Limitations

Note that the Email.js free plan has a limit of 200 emails per month. If you need to send more, consider upgrading to a paid plan.