// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Reservation form submission
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const reservationData = {
                restaurant: formData.get('restaurant'),
                guests: formData.get('guests'),
                date: formData.get('date'),
                time: formData.get('time'),
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                specialRequests: formData.get('special-requests'),
                terms: formData.get('terms')
            };

            // Validate form
            if (!reservationData.restaurant || !reservationData.guests || !reservationData.date || 
                !reservationData.time || !reservationData.name || !reservationData.phone || 
                !reservationData.email || !reservationData.terms) {
                alert('Please fill in all required fields and accept the terms & conditions.');
                return;
            }

            // Show success message
            showSuccessMessage(reservationData);
            
            // Reset form
            this.reset();
        });
    }
});

function showSuccessMessage(data) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'reservation-success show';
    successDiv.innerHTML = `
        <h4>
            <i class="fas fa-check-circle"></i>
            Reservation Confirmed!
        </h4>
        <p><strong>Dear ${data.name},</strong></p>
        <p>Your reservation has been successfully submitted. We will send a confirmation email to <strong>${data.email}</strong> shortly.</p>
        <p><strong>Reservation Details:</strong></p>
        <ul style="margin-top: 10px; padding-left: 20px;">
            <li>Restaurant: ${document.querySelector(`#restaurant option[value="${data.restaurant}"]`).textContent}</li>
            <li>Date: ${formatDate(data.date)}</li>
            <li>Time: ${formatTime(data.time)}</li>
            <li>Guests: ${data.guests}</li>
        </ul>
    `;

    // Insert success message before the form
    const formContainer = document.querySelector('.reservation-form-container');
    const existingSuccess = formContainer.querySelector('.reservation-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    formContainer.insertBefore(successDiv, formContainer.querySelector('.reservation-form'));

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove success message after 10 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 10000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}


