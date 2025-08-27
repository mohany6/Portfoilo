const nodemailer = require('nodemailer');
const config = require('../../config/email.config');

// Create transporter for Gmail
const createTransporter = () => {
  if (!config.email.appPassword) {
    throw new Error('EMAIL_APP_PASSWORD is not configured. Please set up your Gmail App Password.');
  }

  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: config.email.user,
      pass: config.email.appPassword
    }
  });
};

// Send contact form email
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: config.email.user,
      to: config.email.user, // Your email address
      subject: `New Contact Form Message from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #4b5563;">${contactData.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #f3f4f6; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This message was sent from your portfolio contact form at ${config.email.frontendUrl}
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
};

// Send auto-reply to sender
const sendAutoReply = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: config.email.user,
      to: contactData.email,
      subject: 'Thank you for contacting Mohamed Hany',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          
          <p style="color: #374151; line-height: 1.6;">
            Dear ${contactData.name},
          </p>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Message Summary</h3>
            <p style="color: #6b7280; font-style: italic;">"${contactData.message.substring(0, 100)}${contactData.message.length > 100 ? '...' : ''}"</p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            In the meantime, feel free to check out my projects and blog posts on my website.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${config.email.frontendUrl}" 
               style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit My Portfolio
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            Best regards,<br>
            <strong>Mohamed Hany</strong><br>
            Full-Stack Developer
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Auto-reply sending error:', error);
    // Don't throw error for auto-reply failure
  }
};

module.exports = {
  sendContactEmail,
  sendAutoReply
};
