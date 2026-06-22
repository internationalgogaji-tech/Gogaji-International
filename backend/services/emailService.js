const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    await resend.emails.send({
      from: process.env.OTP_FROM_EMAIL,
      to,
      subject,
      html,
    });

    console.log("Email sent via Resend");
    return true;
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};