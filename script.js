document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    });

    // Mobile Menu
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        const nav = document.querySelector('nav ul');
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });
    });

    // Form Handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Replace with Mailchimp integration
            alert('Thank you for subscribing!');
            this.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!grecaptcha.getResponse()) {
                alert('Please complete the reCAPTCHA');
                return;
            }
            // Replace with Formspree integration
            alert('Message sent successfully!');
            this.reset();
            grecaptcha.reset();
        });
    }

    // Track retailer clicks
    document.querySelectorAll('.btn-amazon, .btn-barnes, .btn-apple').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookTitle = this.closest('.book-card').querySelector('h3').textContent;
            const retailer = this.classList.contains('btn-amazon') ? 'Amazon' : 
                           this.classList.contains('btn-barnes') ? 'Barnes & Noble' : 'Apple Books';
            console.log(`${bookTitle} purchased via ${retailer}`);
        });
    });
});
