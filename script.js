document.addEventListener('DOMContentLoaded', function() {
    // 1. PRELOADER (Client: "professional feel")
    window.addEventListener('load', function() {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    });

    // 2. BOOK RETAILER TRACKING (Client: Amazon focus)
    document.querySelectorAll('.btn-retailer').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Track retailer clicks (for client's analytics)
            const bookTitle = this.closest('.book').querySelector('h3').innerText;
            const retailer = this.classList.contains('amazon') ? 'Amazon' : 
                           this.classList.contains('barnes') ? 'Barnes & Noble' : 'Apple Books';
            
            console.log(`Book: ${bookTitle} | Retailer: ${retailer}`);
            // In production: Send to Google Analytics
        });
    });

    // 3. EMAIL CAPTURE (Client priority)
    const emailForm = document.getElementById('email-capture-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Client requested Mailchimp integration
            const formData = new FormData(this);
            const email = formData.get('email');
            
            // Example fetch to Mailchimp API
            fetch('https://[YOURMAILCHIMP].api.mailchimp.com/3.0/lists/[LISTID]/members', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer [APIKEY]',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed'
                })
            })
            .then(response => {
                alert('Thank you for subscribing!');
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // 4. SECURE CONTACT FORM (Client request)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!grecaptcha.getResponse()) {
                alert('Please complete the reCAPTCHA');
                return;
            }
            
            // Client requested Formspree integration
            fetch('https://formspree.io/f/[YOURFORMID]', {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                alert('Message sent successfully!');
                this.reset();
                grecaptcha.reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // 5. SCROLL ANIMATIONS (Client: "visually interesting")
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.book, .author-bio, .blog-post').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });
    });
});
