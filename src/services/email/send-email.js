const { emailTransmiter, APP_EMAIL } = require("./email.config");
const { createButton } = require("./email.html");

const sendVerificationEmail = ({ url, email_to }) => {
  return emailTransmiter
    .sendMail({
      from: APP_EMAIL,
      to: [email_to],
      subject: "Email Verification",
      html: createButton("Verify Account", url),
    })
    .then((res) => {
      console.log("email sent", res);
    })
    .catch((err) => {
      console.error("error sending email", err);
    });
};

module.exports = {
  sendVerificationEmail,
};
