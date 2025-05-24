// Enhanced Animation System
class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupLoadingAnimation();
        this.setupParallaxEffects();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all animation elements
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .skill-category, .project-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        element.classList.add('animate');
        
        // Special handling for skill progress bars
        if (element.classList.contains('skill-category')) {
            setTimeout(() => {
                const progressBars = element.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    bar.classList.add('animate');
                });
            }, 300);
        }

        // Special handling for project cards
        if (element.classList.contains('project-card')) {
            const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
            setTimeout(() => {
                element.style.transitionDelay = '0s';
            }, delay);
        }
    }

    setupLoadingAnimation() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingOverlay = document.getElementById('loadingOverlay');
                loadingOverlay.classList.add('fade-out');
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    setupParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-section');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }
}

// Initialize animation controller
const animationController = new AnimationController();

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Enhanced header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Update active nav based on scroll position
    const updateActiveNav = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
});

// Enhanced Projects filtering functionality
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-content');
    const overlay = document.querySelector('.dropdown-overlay') || createOverlay();
    const isVisible = dropdown.classList.contains('show');
    
    if (isVisible) {
        dropdown.classList.remove('show');
        overlay.classList.remove('show');
    } else {
        dropdown.classList.add('show');
        overlay.classList.add('show');
    }
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'dropdown-overlay';
    overlay.addEventListener('click', () => {
        document.getElementById('dropdown-content').classList.remove('show');
        overlay.classList.remove('show');
    });
    document.body.appendChild(overlay);
    return overlay;
}

// Update fungsi window.onclick untuk menggunakan overlay
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-btn') && !event.target.closest('.dropdown-content')) {
        const dropdown = document.getElementById('dropdown-content');
        const overlay = document.querySelector('.dropdown-overlay');
        if (dropdown) dropdown.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
    }
}

function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const selectedFilter = document.getElementById('selected-filter');
    
    const categoryNames = {
        'all': 'All Projects',
        'ui-design': 'UI Design',
        'web-development': 'Web Development',
        'mobile-app': 'Mobile App',
        'branding': 'Branding'
    };
    
    selectedFilter.textContent = categoryNames[category];
    
    // Add staggered animation to visible cards
    let visibleIndex = 0;
    cards.forEach((card, index) => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.style.transitionDelay = `${visibleIndex * 0.1}s`;
            card.classList.remove('animate');
            
            setTimeout(() => {
                card.classList.add('animate');
            }, 50);
            
            visibleIndex++;
        } else {
            card.classList.add('hidden');
            card.classList.remove('animate');
        }
    });
    
    document.getElementById('dropdown-content').classList.remove('show');
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-btn')) {
        const dropdown = document.getElementById('dropdown-content');
        dropdown.classList.remove('show');
    }
}

// Enhanced Testimonials functionality
const testimonials = [
    {
        quote: "Great things are not done by impulse, but by a series of small things brought together",
        author: "Leonardo - CEO of Jalu Company",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    },
    {
        quote: "Sandy's attention to detail and creative approach made our project exceptional. Highly recommended!",
        author: "Sarah Johnson - Marketing Director",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    },
    {
        quote: "Professional, reliable, and delivers outstanding results. A pleasure to work with.",
        author: "Michael Chen - Startup Founder",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    }
];

let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
    const card = document.getElementById('testimonial-card');
    const testimonial = testimonials[index];
    
    // Add exit animation
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    
    setTimeout(() => {
        document.querySelector('.testimonial-quote').textContent = `"${testimonial.quote}"`;
        document.querySelector('.testimonial-author').textContent = testimonial.author;
        document.querySelector('.testimonial-image').src = testimonial.image;
        
        // Add enter animation
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
        
        // Update dots
        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }, 300);
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function startTestimonialRotation() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopTestimonialRotation() {
    clearInterval(testimonialInterval);
}

// Start auto-rotation
startTestimonialRotation();

// Pause on hover
document.querySelector('.testimonials-section').addEventListener('mouseenter', stopTestimonialRotation);
document.querySelector('.testimonials-section').addEventListener('mouseleave', startTestimonialRotation);

// Enhanced Button ripple effects
document.querySelectorAll('.btn, .connect-button, .interest-btn, .contact-social-link, .footer-like').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.href && this.href.includes('mailto:')) {
            return; // Don't prevent default for email links
        }
        
        if (this.href && this.href.includes('#')) {
            e.preventDefault();
            const targetId = this.href.split('#')[1];
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Smooth scroll for all internal links
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

// Add CSS for enhanced animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .testimonial-card {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .dropdown-content {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .site-header {
        transition: transform 0.3s ease;
    }
    
    /* Enhanced hover effects */
    .project-card:hover .project-title {
        animation: titleGlow 0.5s ease;
    }
    
    @keyframes titleGlow {
        50% {
            text-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
        }
    }
    
    .skill-category:hover {
        animation: cardPulse 0.6s ease;
    }
    
    @keyframes cardPulse {
        50% {
            box-shadow: 0 30px 60px rgba(124, 58, 237, 0.2);
        }
    }
`;
document.head.appendChild(enhancedStyle);
