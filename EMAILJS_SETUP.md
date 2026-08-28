# EmailJS Contact Form Setup Guide

Your contact form is now ready! Follow these steps to make it fully functional:

## Step 1: Create an EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Click "Sign Up" and create a free account
3. Verify your email

## Step 2: Create an Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose your email provider (Gmail recommended) or select "Gmail"
4. Follow the steps to connect your email account

## Step 3: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use these settings:

```
Template Name: marine_enquiry
Service ID: (from your service)
To Email: {{to_email}}
Subject: New Marine Equipment Enquiry from {{name}}

Template Content:
---
Name: {{name}}
Email: {{email}}
Phone: {{phone}}

Message:
{{message}}

---
Sent via VESS TANKO Contact Form
```

4. Save the template and note the **Template ID**

## Step 4: Get Your Credentials
1. Go to **Account** settings
2. Copy your **Public Key**
3. From your Email Service, copy the **Service ID**

## Step 5: Update Your Code
Open `script.js` and replace these lines:

```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your Public Key
```

and

```javascript
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
```

Replace:
- `YOUR_PUBLIC_KEY` with your actual Public Key
- `YOUR_SERVICE_ID` with your Service ID
- `YOUR_TEMPLATE_ID` with your Template ID (e.g., `marine_enquiry`)

## Step 6: Test the Form
1. Reload your website
2. Fill out the contact form
3. Submit and verify the email arrives at both addresses

## Features
✅ Form sends to both email addresses: `marinevess.tanko@gmail.com` and `technical@vesstanko.com`
✅ No backend server needed
✅ Free tier includes 200 emails/month
✅ Responsive form with success/error messages
✅ Client-side validation

## Troubleshooting
- **Emails not sending**: Check that your EmailJS service is connected properly
- **"Invalid credentials"**: Verify you copied the Public Key correctly
- **Missing emails**: Check spam folder and your EmailJS dashboard activity log
