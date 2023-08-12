import nodemailer from "nodemailer";

function sendEmail(email, subject, content, attachments, bcc) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_CONFIGS_EMAIL,
        pass: process.env.MAIL_CONFIGS_PASSWORD,
      },
    });

    let from = `Comfort Financial Solutions <${process.env.MAIL_CONFIGS_EMAIL}>`;
    const mailConfigs = {
      from: from,
      to: email,
      subject: subject,
      html: content,
      attachments: attachments,
      bcc: bcc,
    };

    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: "An error encountered." });
      }

      return resolve({ message: "Email has been sent." });
    });
  });
}

export default sendEmail;
