import nodemailer from "nodemailer";

const otpStore = {};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (otpStore[email]) delete otpStore[email];
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expiry: Date.now() + 5 * 60 * 1000 };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "singlabhargav2004@gmail.com",
        pass: "etrp cpes pcff mtew",
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const data = otpStore[email];
  if (!data) return res.status(400).json({ message: "OTP not found or expired" });
  const { otp: storedOtp, expiry } = data;
  if (Date.now() > expiry) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  if (storedOtp !== parseInt(otp, 10)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  delete otpStore[email];
  return res.status(200).json({ success: true, message: "OTP verified successfully" });
};
