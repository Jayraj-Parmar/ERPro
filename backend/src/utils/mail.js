import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"ERPro" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export { sendMail };
