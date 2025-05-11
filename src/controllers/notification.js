const { transporter, emailConfig } = require('../config/email');
const { renderTemplate } = require('../utils/emailTemplate');

const notificationController = {
    async sendNotification(req, res) {
        try {
            const { email } = req.body;
            const ip = req.ip || req.connection.remoteAddress;
            const date = new Date().toLocaleString();
            const year = new Date().getFullYear();

            // Prepare email data
            const emailData = {
                email,
                date,
                ip,
                year,
                adminUrl: `${req.protocol}://${req.get('host')}/admin`
            };

            // Render email template
            const html = await renderTemplate('notification', emailData);

            // Send email to admin
            await transporter.sendMail({
                from: emailConfig.from,
                to: emailConfig.adminEmail,
                subject: 'New Subscriber Notification - Nziza Global',
                html
            });

            // Send confirmation email to subscriber
            await transporter.sendMail({
                from: emailConfig.from,
                to: email,
                subject: 'Welcome to Nziza Global - Coming Soon',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2563eb;">Thank You for Subscribing!</h2>
                        <p>We're excited to have you join us on this journey. We'll keep you updated about our launch and important announcements.</p>
                        <p>Best regards,<br>Nziza Global Team</p>
                    </div>
                `
            });

            res.status(200).json({
                success: true,
                message: 'Thank you for subscribing! We\'ll keep you updated.'
            });
        } catch (error) {
            console.error('Error sending notification:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred while processing your request.'
            });
        }
    }
};

module.exports = notificationController; 