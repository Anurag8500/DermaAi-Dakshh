import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  html: string;
}

/**
 * Utility function to send emails using Nodemailer and Gmail SMTP
 * @param {EmailOptions} options - Email options (email, subject, html)
 */
const sendEmail = async (options: EmailOptions): Promise<any> => {
  try {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2) Define the email options
    const mailOptions = {
      from: `"DermaAI" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    // 3) Actually send the email
    console.log(`Attempting to send email to: ${options.email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Nodemailer Error:', error);
    throw new Error('Email could not be sent. Please check your EMAIL_USER and EMAIL_PASS in .env');
  }
};

export default sendEmail;
