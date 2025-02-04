document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 200; // Adjust speed of counting
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });
    }

    // Intersection Observer for stats animation
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simple form validation
            let isValid = true;
            const email = formObject.email;
            const phone = formObject.phone;

            if (!email.includes('@')) {
                isValid = false;
                showError('Please enter a valid email address');
            }

            if (phone.length < 8) {
                isValid = false;
                showError('Please enter a valid phone number');
            }

            if (isValid) {
                // Here you would typically send the data to your server
                console.log('Form submitted:', formObject);
                showSuccess('Thank you for your message. We will contact you soon!');
                this.reset();
            }
        });
    }

    // Error and success message handling
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        insertMessage(errorDiv);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        insertMessage(successDiv);
    }

    function insertMessage(messageDiv) {
        const form = document.getElementById('contact-form');
        const existingMessage = form.querySelector('.error-message, .success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        form.insertBefore(messageDiv, form.firstChild);
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Scroll-based animations for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .university-card, .testimonial-card');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Header scroll behavior
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // Initialize any tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', e => {
            const tip = document.createElement('div');
            tip.className = 'tooltip';
            tip.textContent = e.target.dataset.tooltip;
            document.body.appendChild(tip);

            const rect = e.target.getBoundingClientRect();
            tip.style.top = rect.bottom + 10 + 'px';
            tip.style.left = rect.left + (rect.width - tip.offsetWidth) / 2 + 'px';
        });

        tooltip.addEventListener('mouseleave', () => {
            const tip = document.querySelector('.tooltip');
            if (tip) {
                tip.remove();
            }
        });
    });
});