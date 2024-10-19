import nodemailer from 'nodemailer';

export const sendEmail = async (data: {
  email: string;
  subject: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'), // Default to port 587 if not provided
    secure: false, // Use TLS (for port 587)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email (your email)
    to: process.env.EMAIL_TO, // Recipient's email
    subject: data.subject || 'No subject provided', // Email subject from the contact form
    text: `Message from: ${data.email}\n\n${data.message}`, // Plain text version of the message
    html: `<p><strong>From:</strong> ${data.email}</p><p>${data.message}</p>`, // HTML version of the message
  };
  
  console.log(mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw new Error('Failed to send email');
  }
};
