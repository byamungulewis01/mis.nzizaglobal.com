const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create a new contact request in the database
 * @param {Object} contactData - Contact request data
 * @returns {Promise<Object>} Created contact request
 */
exports.createContactRequest = async (contactData) => {
  try {
    const newContactRequest = await prisma.contactRequest.create({
      data: contactData
    });
    
    return newContactRequest;
  } catch (error) {
    console.error('Error creating contact request:', error);
    throw new Error('Failed to create contact request');
  }
};