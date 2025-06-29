// Preloader Animation
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
  const nav = document.querySelector('nav ul');
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Book Card Hover Effects
document.querySelectorAll('.book-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
    this.style.border = '1px solid var(--gold)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '';
    this.style.border = '1px solid rgba(212, 175, 55, 0.3)';
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll
gsap.utils.toArray('.animate-on-scroll').forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
});

// Newsletter Form Submission
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const name = formData.get('name');
  
  // In production, connect to Mailchimp API here
  console.log('Form submitted:', Object.fromEntries(formData));
  
  // Show success message
  alert(`Thank you, ${name}! You've been subscribed to Rhoda's newsletter.`);
  this.reset();
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  
  // In production, connect to Formspree or similar service
  console.log('Contact form submitted:', Object.fromEntries(formData));
  
  alert("Thank you for your message! Rhoda will respond soon.");
  this.reset();
});

// Initialize dropdown functionality
document.querySelectorAll('.retailer-dropdown').forEach(dropdown => {
  const button = dropdown.querySelector('button');
  const content = dropdown.querySelector('.dropdown-content');
  
  button.addEventListener('click', function() {
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
  
  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      content.style.display = 'none';
    }
  });
});

// Amazon Affiliate Link Tracking
document.querySelectorAll('a[href*="amazon.com"]').forEach(link => {
  link.addEventListener('click', function() {
    // In production, add analytics tracking here
    console.log('Amazon link clicked:', this.href);
  });
});
