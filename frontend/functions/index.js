import { onCall, HttpsError } from "firebase-functions/v2/https";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5453cb5c5a44be",
    pass: "e0bf1de87400ae",
  },
});

export const sendInquiryResponse = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated");
  }

  const { email, name, reply } = request.data;

  try {
    await transporter.sendMail({
      from: '"AI Solutions" <noreply@aisolutions.com>',
      to: email,
      subject: "Response to Your Inquiry",
      html: `
        <h2>Thank you for your inquiry</h2>
        <p>Dear ${name},</p>
        <p>${reply}</p>
        <br>
        <p>Best regards,</p>
        <p>Your Company Team</p>
      `,
    });

    return { success: true };
  } catch (error) {
    throw new HttpsError("internal", error.message);
  }
});
