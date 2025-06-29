// DOM Ready
document.addEventListener('DOMContentLoaded', function() {

  // 1. PRELOADER
  window.addEventListener('load', function() {
    document.querySelector('.preloader').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.preloader').style.display = 'none';
    }, 500);
  });

  // 2. CLIENT-REQUESTED FEATURES IMPLEMENTATION

  // a. Enhanced Book Display
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.book-cover').style.transform = 'scale(1.05) rotate(-2deg)';
    });
    card.addEventListener('mouseleave', function() {
      this.querySelector('.book-cover').style.transform = '';
    });
  });

  // b. Multi-Retailer Tracking
  document.querySelectorAll('.retailer-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const retailer = this.dataset.retailer;
      const bookTitle = this.closest('.book-card').dataset.book;
      
      // Track in Google Analytics (example)
      console.log(`Book: ${bookTitle} | Retailer: ${retailer}`);
      
      // Open retailer link
      window.open(this.href, '_blank');
    });
  });

  // c. Newsletter Integration (Mailchimp)
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const email = formData.get('email');
      
      // Example Mailchimp integration
      fetch('https://yourapp.us10.list-manage.com/subscribe/post?u=XXX', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        showSuccessModal('Thank you for subscribing!');
        this.reset();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }

  // d. Secure Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!grecaptcha.getResponse()) {
        alert('Please complete the reCAPTCHA');
        return;
      }
      
      // Formspree integration example
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(this),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        showSuccessModal('Message sent successfully!');
        this.reset();
        grecaptcha.reset();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }

  // 3. ANIMATIONS
  // Scroll-triggered animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => observer.observe(el));

  // Helper function
  function showSuccessModal(message) {
    const modal = document.getElementById('success-modal');
    modal.querySelector('.modal-message').textContent = message;
    modal.style.display = 'flex';
    
    modal.querySelector('.close-modal').addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }
});

// Initialize when Recaptcha loads
function onRecaptchaLoad() {
  console.log('reCAPTCHA ready');
}
