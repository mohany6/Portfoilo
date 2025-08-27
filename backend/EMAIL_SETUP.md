# Email Setup Instructions

## Gmail App Password Setup

To enable email functionality for the contact form, you need to set up a Gmail App Password:

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Navigate to Security
- Enable 2-Step Verification if not already enabled

### 2. Generate App Password
- Go to Security > 2-Step Verification
- Scroll down to "App passwords"
- Select "Mail" and "Other (Custom name)"
- Enter "Portfolio Contact Form" as the name
- Click "Generate"
- Copy the 16-character password

### 3. Environment Variables
Create a `.env` file in the backend directory with:

```env
EMAIL_USER=mahamedhany8@gmail.com
EMAIL_APP_PASSWORD=your_16_character_app_password_here
FRONTEND_URL=http://localhost:4200
```

### 4. Important Notes
- Never use your regular Gmail password
- App passwords are more secure for applications
- The app password will only work with 2FA enabled
- Keep your app password secure and don't commit it to version control

### 5. Testing
After setup, test the contact form:
1. Fill out the contact form on your portfolio
2. Check your email for the notification
3. Check the sender's email for the auto-reply

### 6. Troubleshooting
If emails aren't sending:
- Verify 2FA is enabled
- Check the app password is correct
- Ensure Gmail allows "less secure app access" is disabled
- Check server logs for error messages
