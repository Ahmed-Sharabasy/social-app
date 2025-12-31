import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // create transporter
    const trasporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // email options
    const mailOption = {
      from: "Social App <socialapp@gmail.com>",
      to,
      subject,
      html,
      text,
    };

    // send email
    await trasporter.sendMail(mailOption);
  } catch (error) {
    console.log("Error sending email", error);
    throw new Error("Email not sent");
  }
};

export default sendEmail;
