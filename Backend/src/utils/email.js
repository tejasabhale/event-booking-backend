import nodemailer from 'nodemailer'
import { Otp } from '../models/otp.model.js'
import dotenv from "dotenv"
dotenv.config(); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})



const getOtpTemplate = (otp, msg) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

  <table align="center" width="100%" style="max-width:600px; background:#ffffff; margin-top:40px; border-radius:8px; overflow:hidden;">
    
    <tr>
      <td style="background:#4CAF50; padding:20px; text-align:center; color:#ffffff; font-size:24px; font-weight:bold;">
        EventZone
      </td>
    </tr>

    <tr>
      <td style="padding:30px; color:#333333;">
        <p>Hello,</p>
        
        <p>${msg}</p>

        <div style="text-align:center; margin:30px 0;">
          <span style="display:inline-block; padding:15px 25px; font-size:28px; letter-spacing:5px; background:#f0f0f0; border-radius:6px; font-weight:bold;">
            ${otp}
          </span>
        </div>

        <p>This OTP is valid for <strong>5 minutes</strong>.</p>

        <p>If you did not request this, you can ignore this email.</p>

        <p>Thanks,<br><strong>EventZone Team</strong></p>
      </td>
    </tr>

    <tr>
      <td style="background:#f4f4f4; text-align:center; padding:15px; font-size:12px; color:#777777;">
        © 2026 EventZone
      </td>
    </tr>

  </table>

</body>
</html>
`;

export const sendOtpEmail = async (email, otp, type) => {
    try {
        const title = type === 'accountVerification' ? 'Verify your EventZone Account' : "Event Booking Verification"
        const msg = type === 'accountVerification' 
        ? 'Please use the following OTP to verify your EventZone account'
        : 'Please use the following OTP to verify and confirm your event booking'
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: title,
            html: getOtpTemplate(otp, msg)
        }
    
        await transporter.sendMail(mailOptions)
        console.log(`OTP email sent to ${email} for ${type}`);
    } catch (error) {
        console.log(`Error while sending otp email to ${email} for ${type}:`, error);
    }
}

export const sendBookingEmail = async (email, username, eventTitle, eventDate) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Booking Confirmed: ${eventTitle}`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #4CAF50;">Booking Confirmed 🎉</h2>
                    
                    <p>Hi ${username},</p>
                    
                    <p>Your booking has been successfully confirmed. Here are your details:</p>
                    
                    <table style="border-collapse: collapse; width: 100%;">
                        <tr>
                            <td><strong>Event:</strong></td>
                            <td>${eventTitle}</td>
                        </tr>
                        <tr>
                            <td><strong>Date:</strong></td>
                            <td>${eventDate}</td>
                        </tr>
                    </table>

                    <p style="margin-top: 20px;">
                        Please show this email at the venue for entry.
                    </p>

                    <p>Thank you for booking with us! 🙌</p>
                </div>
      `
    }
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to ", email);
  } catch (error) {
    console.log("Error sending email: ", error);
  }
}