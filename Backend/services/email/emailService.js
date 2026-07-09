const nodemailer = require("nodemailer");

const APP_NAME = "SOC Log Analyzer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) == 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error) => {
    if (error) {
      console.error("SMTP Connection Error:", error.message);
    } else {
      console.log("📧 SMTP Server Ready");
    }
  });

const sendEmail = async ({ to, subject, html }) => {
  if (!to || !subject || !html) {
    throw new Error("Missing email parameters.");
  }
  try {
    await transporter.sendMail({
      from: `"${APP_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    // console.error("Email sending failed:", error.message);
    throw error;
  }
};

module.exports = {
  sendEmail,
};