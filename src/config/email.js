const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const emailConfig = {
    from: process.env.SMTP_FROM || 'Nziza Global <noreply@nzizaglobal.com>',
    adminEmail: process.env.ADMIN_EMAIL || 'info@nzizaglobal.com'
};

module.exports = {
    transporter,
    emailConfig
}; 