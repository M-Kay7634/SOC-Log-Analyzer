require("dotenv").config();

const sendEmail = require("./utils/sendEmail");
const otpTemplate = require("./utils/emailTemplate");

(async () => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "SOC Log Analyzer Email Test",
      html: otpTemplate("123456"),
    });

    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error(err);
  }
})();