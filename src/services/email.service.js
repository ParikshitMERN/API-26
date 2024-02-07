require("dotenv").config();
const AppError = require("../exception/app.exception");
const nodemailer = require("nodemailer");
class EmailService {
  transporter;
  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    } catch (exception) {
      console.log("Mail Connection", exception);
      throw new AppError({
        data: null,
        message: "Error conencting SMTP Server",
        code: 500,
      });
    }
  }

  sendEmail = async ({ to, subject, message }) => {
    try {
      const response = await this.transporter.sendMail({
        to: to,
        from: process.env.SMTP_FROM,
        subject: subject,
        html: message,
      });
      return response;
    } catch (exception) {
      console.log("Email Send error", exception);
      throw new AppError({
        data: null,
        message: "Email Send Error",
        code: 500,
      });
    }
  };
}

const emailSvc = new EmailService();
module.exports = emailSvc;
