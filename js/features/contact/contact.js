import dataContact from '../../../data/contact.json';

export function contact(element) {
    const html = `
        <div class="contact--title">
            <h4>${dataContact.contact_title}</h4>
        </div>
        <form id="contactForm" class="contact-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="submit-button">Send Message</button>
            </div>
            <div id="formStatus" class="form-status"></div>
        </form>
    `;

    $(element).html(html);
    
    // Initialize form submission handler
    initContactForm();
}

/**
 * Initializes the contact form submission handler
 */
function initContactForm() {
    $('#contactForm').on('submit', async function(e) {
        e.preventDefault();
        
        const $form = $(this);
        const $status = $('#formStatus');
        
        // Clear previous status
        $status.removeClass('success error').text('');
        
        // Show loading state
        $form.find('button[type="submit"]').prop('disabled', true).text('Sending...');
        
        try {
            // Get form data
            const formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            };
            
            // Log form data for debugging
            console.log("Form data received:", formData);
            
            // Send email via PHP backend
            const response = await fetch('/send-email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                $status.addClass('success').text('Message sent');
                // Reset form
                $form[0].reset();
            } else {
                throw new Error(result.error || 'Message failed');
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            $status.addClass('error').text('Failed to send message: ' + error.message);
        } finally {
            // Reset button state
            $form.find('button[type="submit"]').prop('disabled', false).text('Send Message');
        }
    });
}
