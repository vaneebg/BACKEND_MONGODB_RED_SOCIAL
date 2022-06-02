const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'your email',
        pass: 'your password'
    }
});
module.exports = transporter;