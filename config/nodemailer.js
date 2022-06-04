const nodemailer = require('nodemailer');
require("dotenv").config();
const USER = process.env.USER;
const PASS = process.env.PASS;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: USER,
        pass: PASS
    }
})
module.exports = transporter;