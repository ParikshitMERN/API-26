const AppError = require("../exception/app.exception");
const nodemailer = require("nodemailer");
class EmailService {
  transporter;
  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 465,
        auth: {
          username: "89f6689c4498cf",
          pass: "1e88df89f65eb0",
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
