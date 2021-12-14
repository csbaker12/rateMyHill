const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailUpdates = async (userEmail) => {
  try {
    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Rate My Hill',
        link: `${process.env.EMAIL_MAIN_URL}verification/${emailToken}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro:
          'Thank you for signing up for email updates! I will not actually send you anything, just wanted to showcase that I can do this!',
        outro:
          'Feel free to reply to this email if you need help or have any questions!',
      },
    };

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Rate My Hill Email Updates Confirmation',
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

const registerEmail = async (userEmail, emailToken) => {
  try {
    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Rate My Hill',
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro: 'Welcome to Rate My Hill',
        action: {
          instructions: 'To validate your account, please click here: ',
          button: {
            color: '#0bd1e3',
            text: 'Verify Account',
            link: `${process.env.SITE_DOMAIN}verification/${emailToken}`,
          },
        },
        outro:
          'Feel free to reply to this email if you need help or have any questions!',
        signature: 'Cheers',
      },
    };

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Welcome to Rate My Hill',
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

module.exports = {
  registerEmail,
  emailUpdates,
};
