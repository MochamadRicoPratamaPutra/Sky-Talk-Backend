const nodemailer = require('nodemailer');
function main(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: `${process.env.EMAIL_MAILER}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  transporter
    .sendMail({
      from: `"SkyTalk!"<${process.env.EMAIL_MAILER}>`,
      to: `${email}`,
      subject: 'Confirmation to change your password',
      html: `<h style:'margin-left:auto; margin-right:auto'>Click button below to change your password</h>
        <button style:'margin-left:auto; margin-right:auto;outline:none;border-radius:3px; background: red;padding: 5px 10px'>
        <a href='${process.env.TARGET_URL}/new-password/${email}'>Click here to confirm your account!</a>
        </button>`,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
module.exports = {
  main,
};