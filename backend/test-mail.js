const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  try {
    const result = await resend.emails.send({
      from: process.env.OTP_FROM_EMAIL,
      to: ["internationalgogaji@gmail.com"],
      subject: "Test OTP",
      html: "<h1>Hello World</h1>",
    });

    console.log("SUCCESS");
    console.log(result);
  } catch (err) {
    console.log("ERROR");
    console.log(JSON.stringify(err, null, 2));
  }
}

test();