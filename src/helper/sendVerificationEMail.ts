import { Apiresponse } from "@/types/ApiResponse";
const nodemailer = require("nodemailer");

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<Apiresponse> {
  try {
    // Construct the HTML content directly
    const htmlContent = `
      <html lang="en">
        <head>
          <style>
            body {
              font-family: 'Roboto', sans-serif;
            }
            .container {
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 5px;
              width: 80%;
              margin: auto;
            }
            h2 {
              color: #333;
            }
            .code {
              font-size: 24px;
              font-weight: bold;
              color: #61dafb;
            }
            p {
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Hello ${username},</h2>
            <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
            <p class="code">${verifyCode}</p>
            <p>If you did not request this code, please ignore this email.</p>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: '"Mystery Message" <noreplymysterymessage@gmail.com>', // sender address
      to: email, // recipient email
      subject: "Mystery Message Verification Code", // Subject line
      html: htmlContent, // Directly use the HTML string
    };

    // Send the email using nodemailer
    await transporter.sendMail(mailOptions);

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
