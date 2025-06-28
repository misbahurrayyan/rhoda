$(document).ready(function() {
    // Mobile Menu Toggle
    $('.mobile-menu').click(function() {
        $('nav ul').slideToggle();
    });

    // Smooth Scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 80,
            },
            500,
            'linear'
        );
    });

    // Book Details Modal
    $('.view-details').click(function(e) {
        e.preventDefault();
        
        // In a real implementation, you would fetch this data from a database or JSON
        // For demo, we're using placeholder data based on which book was clicked
        const bookId = $(this).data('book');
        const bookData = getBookData(bookId);
        
        $('#modalBookTitle').text(bookData.title);
        $('#modalBookGenre').text(bookData.genre);
        $('#modalBookDescription').text(bookData.description);
        $('#modalBookPages').text(bookData.pages);
        $('#modalBookPublisher').text(bookData.publisher);
        $('#modalBookDate').text(bookData.date);
        $('#modalAmazonLink').attr('href', bookData.amazonLink);
        
        $('#bookModal').fadeIn();
    });

    // Close Modal
    $('.close-modal, #closeSuccessModal').click(function() {
        $('#bookModal, #successModal').fadeOut();
    });

    // Newsletter Form Submission
    $('#newsletter-form').submit(function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        
        // Here you would typically send this data to your server
        // For demo, we're just showing a success message
        console.log('Subscribed:', name, email);
        
        $('#successMessage').html(`Thank you, ${name}! You've been subscribed to our newsletter.`);
        $('#successModal').fadeIn();
        
        // Reset form
        this.reset();
    });

    // Contact Form Submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        const name = $('#contact-name').val();
        const email = $('#contact-email').val();
        const message = $('#message').val();
        
        // Here you would typically send this data to your server
        console.log('Contact Form Submitted:', { name, email, message });
        
        $('#successMessage').html(`Thank you, ${name}! Your message has been sent.`);
        $('#successModal').fadeIn();
        
        // Reset form
        this.reset();
    });

    // Close modal when clicking outside
    $(window).click(function(e) {
        if ($(e.target).hasClass('modal')) {
            $('#bookModal, #successModal').fadeOut();
        }
    });

    // Sample book data - in a real app, this would come from a database
    function getBookData(id) {
        const books = {
            1: {
                title: "The Silent Echo",
                genre: "Fiction, Thriller",
                description: "A gripping tale of mystery and suspense that follows journalist Sarah Carter as she uncovers dark secrets in a small coastal town where everyone has something to hide.",
                pages: "320",
                publisher: "Mystery House Publishing",
                date: "March 15, 2023",
                amazonLink: "https://www.amazon.com/dp/B0B1234567"
            },
            2: {
                title: "Beyond the Horizon",
                genre: "Non-Fiction, Adventure",
                description: "An inspiring true story of one man's journey across continents, facing incredible challenges and discovering the true meaning of perseverance and human connection.",
                pages: "280",
                publisher: "Adventure Press",
                date: "January 10, 2023",
                amazonLink: "https://www.amazon.com/dp/B0B2345678"
            },
            3: {
                title: "The Last Painting",
                genre: "Historical Fiction",
                description: "In 1940s Paris, a young art restorer stumbles upon a hidden masterpiece that leads her on a dangerous quest through war-torn Europe to uncover its shocking origins.",
                pages: "412",
                publisher: "Heritage Books",
                date: "November 5, 2022",
                amazonLink: "https://www.amazon.com/dp/B0B3456789"
            },
            4: {
                title: "Quantum Shadows",
                genre: "Science Fiction",
                description: "In a future where humanity has colonized the solar system, a rogue scientist discovers an alien artifact that could rewrite the laws of physics—or destroy civilization.",
                pages: "376",
                publisher: "Nebula Press",
                date: "September 22, 2022",
                amazonLink: "https://www.amazon.com/dp/B0B4567890"
            }
        };
        
        return books[id] || books[1]; // Default to first book if ID not found
    }

    // Track Amazon link clicks
    $('a[href*="amazon.com"]').click(function() {
        // In a real implementation, you might track this with Google Analytics
        console.log('Amazon link clicked:', $(this).attr('href'));
    });
});
