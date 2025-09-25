import sgMail from "@sendgrid/mail";

const otpstore = {};

sgMail.setApiKey("SG.fzT7M2t5TvCKJIa8zPgBvQ.oXahf3YyMX_pZh6npN9Lgad4PPvsLdWOVWQsLLZpivICopied!");

export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;
    if (otpstore[email]) {
      delete otpstore[email];
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpstore[email] = {
      otp,
      expiry: Date.now() + 5 * 60 * 1000
    };
    const msg = {
      to: email,
      from: "singlabhargav2004@gmail.com",
      subject: "Your OTP is",
      text: `Your OTP is ${otp}`
    };
    await sgMail.send(msg);
    console.log("OTP sent successfully to", email);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("Error occurred:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const verifyotp = async (req, res) => {
  const { email, otp } = req.body;
  const data = otpstore[email];
  if (!data) {
    return res.status(400).json({ message: "OTP not found or expired" });
  }
  const { otp: storedotp, expiry } = data;
  if (Date.now() > expiry) {
    delete otpstore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  if (storedotp !== parseInt(otp, 10)) {
    return res.status(400).json({ message: "OTP is wrong" });
  }
  delete otpstore[email];
  return res.status(200).json({ success: true, message: "OTP verified successfully" });
};
