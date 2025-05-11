// Set the launch date (adjust this to your desired launch date)
const launchDate = new Date('2025-06-01T00:00:00').getTime();

// Update the countdown every second
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the DOM
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector('.countdown').innerHTML = '<h2>We\'re Live!</h2>';
    }
}, 1000);

// Handle form submission
document.getElementById('notify-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    const submitButton = this.querySelector('button[type="submit"]');
    
    try {
        // Disable form while submitting
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';
        
        const response = await fetch('/api/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = data.message;
            successMessage.style.color = '#059669';
            successMessage.style.marginTop = '1rem';
            this.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = error.message;
        errorMessage.style.color = '#dc2626';
        errorMessage.style.marginTop = '1rem';
        this.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    } finally {
        // Re-enable form
        submitButton.disabled = false;
        submitButton.textContent = 'Notify Me';
    }
}); 