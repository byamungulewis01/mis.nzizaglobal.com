const contactService = require('../services/contact');
const { validationResult } = require('express-validator');
const { transporter, emailConfig } = require('../config/email');
const { renderTemplate } = require('../utils/emailTemplate');

/**
 * Create a new contact request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createContactRequest = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: 'Validation failed'
      });
    }

    // Extract validated data
    const contactData = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      message: req.body.message
    };

    // Create contact request
    const result = await contactService.createContactRequest(contactData);

    // Prepare email data
    const emailData = {
      ...contactData,
      date: new Date().toLocaleString(),
      ip: req.ip || req.connection.remoteAddress,
      year: new Date().getFullYear()
    };

    // Render email template
    const html = await renderTemplate('contact', emailData);

    // Send email to admin
    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.adminEmail,
      subject: 'New Contact Request - Nziza Global',
      html
    });

    // Send confirmation email to the contact
    // await transporter.sendMail({
    //   from: emailConfig.from,
    //   to: contactData.email,
    //   subject: 'Thank You for Contacting Nziza Global',
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //       <h2 style="color: #2563eb;">Thank You for Contacting Us!</h2>
    //       <p>Dear ${contactData.firstName},</p>
    //       <p>We have received your message and will get back to you as soon as possible.</p>
    //       <p>Here's a summary of your message:</p>
    //       <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
    //         <p><strong>Message:</strong></p>
    //         <p>${contactData.message}</p>
    //       </div>
    //       <p>Best regards,<br>Nziza Global Team</p>
    //     </div>
    //   `
    // });

    // Return success response
    return res.status(201).json({
      success: true,
      data: result,
      message: 'Contact request submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};