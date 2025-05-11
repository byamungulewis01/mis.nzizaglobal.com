const fs = require('fs').promises;
const path = require('path');

async function renderTemplate(templateName, data) {
    try {
        const templatePath = path.join(__dirname, '..', 'templates', 'email', `${templateName}.html`);
        let template = await fs.readFile(templatePath, 'utf-8');
        
        // Replace all placeholders with actual data
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(regex, data[key]);
        });
        
        return template;
    } catch (error) {
        console.error('Error rendering email template:', error);
        throw error;
    }
}

module.exports = {
    renderTemplate
}; 