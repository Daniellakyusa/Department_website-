// JavaScript for interactive features and smooth scrolling

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handler
const inquiryForm = document.querySelector('.inquiry-form');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(inquiryForm);
        
        // Show success message (in real application, you would send this to a server)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        inquiryForm.reset();
        
        // Log form data (for demonstration)
        console.log('Form submitted successfully');
    });
}

// Add animation on scroll using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.program-card, .staff-card, .news-card, .highlight-card, .lab-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '☰';
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.style.display = 'none';
    menuToggle.setAttribute('aria-label', 'Toggle Menu');
    
    // Add styles for mobile menu button
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle {
            background: #FFD700;
            border: none;
            color: #003366;
            font-size: 1.5rem;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            position: absolute;
            top: 20px;
            right: 20px;
        }
        
        @media (max-width: 640px) {
            .mobile-menu-toggle {
                display: block !important;
            }
            
            .main-nav {
                display: none;
                width: 100%;
                margin-top: 20px;
            }
            
            .main-nav.active {
                display: block;
            }
            
            .main-nav ul {
                flex-direction: column;
                align-items: center;
            }
        }
    `;
    document.head.appendChild(style);
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    document.querySelector('.header .container').appendChild(menuToggle);
};

// Initialize mobile menu
createMobileMenu();

// Counter animation for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.highlight-card h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.innerText.replace(/\D/g, ''));
            const count = parseInt(counter.getAttribute('data-count') || '0');
            const increment = target / speed;
            
            if (count < target) {
                counter.setAttribute('data-count', Math.ceil(count + increment));
                const suffix = counter.innerText.replace(/[0-9]/g, '');
                counter.innerText = Math.ceil(count + increment) + suffix;
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + suffix;
            }
        };
        
        // Store original text with suffix
        if (!counter.hasAttribute('data-original')) {
            counter.setAttribute('data-original', counter.innerText);
        }
        
        updateCount();
    });
};

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about-section');
const aboutObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        aboutObserver.disconnect();
    }
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Console message for developers
console.log('%c Welcome to Computing and Informatics Department!', 'background: #003366; color: #FFD700; font-size: 16px; padding: 10px;');
console.log('%c Built with HTML, CSS, and JavaScript', 'color: #666; font-size: 12px;');

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade-in effect to the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle broken links (prevent default for # links)
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('This is a placeholder link. Please update with actual URL.');
    });
});
