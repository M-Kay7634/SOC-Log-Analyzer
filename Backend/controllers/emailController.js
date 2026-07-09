const Settings = require("../models/Settings");

const { sendEmail } = require("../services/email/emailService");

const testEmail = async (req, res) => {
  try {

    const settings = await Settings.findOne();

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings not found.",
      });
    }

    if (!settings.emailAlertsEnabled) {
      return res.status(400).json({
        success: false,
        message: "Email alerts are disabled.",
      });
    }

    if (!settings.alertEmail) {
      return res.status(400).json({
        success: false,
        message: "Alert email is not configured.",
      });
    }

    await sendEmail({
      to: settings.alertEmail,
      subject: "SOC Log Analyzer - Test Email",
      html: `
        <h2>✅ Test Email Successful</h2>
        <p>Your SOC Log Analyzer email service is working correctly.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
    });

    res.json({
      success: true,
      message: "Test email sent successfully.",
    });

  } catch (error) {

    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  testEmail,
};