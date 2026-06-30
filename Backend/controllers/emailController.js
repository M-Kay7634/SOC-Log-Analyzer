const { sendEmail } = require("../services/email/emailService");

const testEmail = async (req, res) => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "SOC Log Analyzer - Test Email",
      html: `
        <h2>✅ Test Email Successful</h2>
        <p>Your SOC Log Analyzer email service is working correctly.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Test email sent successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  testEmail,
};