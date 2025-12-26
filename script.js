// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    if (email) {
        alert('Thank you for subscribing! You will receive offers in your inbox.');
        this.querySelector('.newsletter-input').value = '';
    }
});

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('#name').value;
    const email = this.querySelector('#email').value;
    const mobile = this.querySelector('#mobile').value;
    const message = this.querySelector('#message').value;
    
    if (name && email && mobile && message) {
        alert('Thank you for contacting us! We will get back to you soon.');
        this.reset();
    }
});

// City card click handler to navigate to collections page
document.addEventListener('DOMContentLoaded', function() {
    const cityCards = document.querySelectorAll('.city-card');
    
    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            const cityName = this.querySelector('h3').textContent.trim();
            window.location.href = `collections.html?city=${encodeURIComponent(cityName)}`;
        });
    });
});

