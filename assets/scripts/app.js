// Portfolio JavaScript for interactivity

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for navbar height
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking a link
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section, div[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
            
                const sectionId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Typing effect for the title
    const titleElement = document.querySelector('.title-heading');
    
    if (titleElement) {
        const title = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < title.length) {
                titleElement.textContent += title.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing when the element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 1000); // Delay before typing starts
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(titleElement);
    }
    
    // Reveal animations for content sections except intro paragraph and image
    const revealElements = document.querySelectorAll('.fade-in:not(.no-animation)');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '-50px' });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Add visible class to elements when they enter the viewport
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Form validation and submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nameInput = document.getElementById('nameControl');
            const emailInput = document.getElementById('emailControl');
            const messageInput = document.getElementById('messageControl');
            
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                highlightInvalidField(nameInput);
                isValid = false;
            } else {
                resetField(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightInvalidField(emailInput);
                isValid = false;
            } else {
                resetField(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                highlightInvalidField(messageInput);
                isValid = false;
            } else {
                resetField(messageInput);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    function highlightInvalidField(field) {
        field.classList.add('is-invalid');
        field.style.borderColor = '#dc3545';
    }
    
    function resetField(field) {
        field.classList.remove('is-invalid');
        field.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});