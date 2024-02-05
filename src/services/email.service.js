const AppError = require("../exception/app.exception");
const nodemailer = require("nodemailer");
class EmailService {
  transporter;
  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "14984663638e03",
          pass: "5449ae6aa124ec",
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
        from: "noreply@mern26.com",
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
