class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.dropdownOpen = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupLoadingAnimation();
        this.setupDropdown();
        this.setupMobileMenu();
        this.setupTestimonials();
        this.setupButtonEffects();
        this.setupSmoothScrolling();
        this.setupFiltering();
        this.setupTypingEffect();
        this.setupThemeToggle();
        this.setupCustomCursor();
        this.setupTiltEffect();
        this.setupBackToTop();
        this.setupLikeButton();
        this.setupHeroParticles();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .skill-category, .project-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        element.classList.add('animate');

        if (element.classList.contains('skill-category')) {
            setTimeout(() => {
                const progressBars = element.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    bar.classList.add('animate');
                });
            }, 300);
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

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const navLinks = document.querySelectorAll('.mobile-nav .nav-link');

        if (!mobileMenuBtn || !mobileNav || !mobileNavOverlay) return;

        const toggleMobileMenu = () => {
            mobileNav.classList.toggle('open');
            mobileNavOverlay.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';

            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileNavOverlay.addEventListener('click', toggleMobileMenu);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu();
            });
        });
    }

    setupDropdown() {
        const dropdownBtn = document.querySelector('.dropdown-btn');
        const dropdownContent = document.getElementById('dropdown-content');
        const dropdownOverlay = document.getElementById('dropdownOverlay');

        if (!dropdownBtn || !dropdownContent || !dropdownOverlay) return;

        const toggleDropdown = (show) => {
            this.dropdownOpen = show;
            if (show) {
                dropdownContent.classList.add('show');
                dropdownOverlay.classList.add('show');
            } else {
                dropdownContent.classList.remove('show');
                dropdownOverlay.classList.remove('show');
            }
        };

        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(!this.dropdownOpen);
        });

        dropdownOverlay.addEventListener('click', () => toggleDropdown(false));
        dropdownContent.addEventListener('click', (e) => e.stopPropagation());

        document.addEventListener('click', (e) => {
            if (this.dropdownOpen && !e.target.closest('.filter-dropdown')) {
                toggleDropdown(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (this.dropdownOpen && e.key === 'Escape') {
                toggleDropdown(false);
            }
        });
    }

    setupFiltering() {
        const dropdownItems = document.querySelectorAll('.dropdown-content a');

        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const category = item.getAttribute('data-category');
                this.filterProjects(category);

                dropdownItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    filterProjects(category) {
        const cards = document.querySelectorAll('.project-card');
        const selectedFilter = document.getElementById('selected-filter');
        const dropdownContent = document.getElementById('dropdown-content');
        const dropdownOverlay = document.getElementById('dropdownOverlay');

        const categoryNames = {
            'all': 'All Projects',
            'ui-design': 'UI Design',
            'web-development': 'Web Development',
            'mobile-app': 'Mobile App',
            'branding': 'Branding'
        };

        selectedFilter.textContent = categoryNames[category];

        cards.forEach((card, index) => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });

        dropdownContent.classList.remove('show');
        dropdownOverlay.classList.remove('show');
        this.dropdownOpen = false;
    }

    setupTestimonials() {
        const testimonials = [
            {
                quote: "Great things are not done by impulse, but by a series of small things brought together",
                author: "Leonardo - CEO of Jalu Company",
                image: "images/image.png"
            },
            {
                quote: "Sandy's attention to detail and creative approach made our project exceptional. Highly recommended!",
                author: "Sarah Johnson - Marketing Director",
                image: "https://t3.ftcdn.net/jpg/03/58/93/04/360_F_358930412_rodvr4vvY4LG0bUG8MKC3wwCZhWGozcW.jpg"
            },
            {
                quote: "Professional, reliable, and delivers outstanding results. A pleasure to work with.",
                author: "Michael Chen - Startup Founder",
                image: "https://media.istockphoto.com/id/1354898581/photo/shot-of-a-young-businessman-using-a-laptop-in-a-modern-office.jpg"
            }
        ];

        let currentTestimonial = 0;
        let testimonialInterval;

        const showTestimonial = (index) => {
            const card = document.getElementById('testimonial-card');
            const testimonial = testimonials[index];

            card.style.opacity = '0';

            setTimeout(() => {
                document.querySelector('.testimonial-quote').textContent = `"${testimonial.quote}"`;
                document.querySelector('.testimonial-author').textContent = testimonial.author;
                document.querySelector('.testimonial-image').src = testimonial.image;

                card.style.opacity = '1';

                document.querySelectorAll('.nav-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });

                currentTestimonial = index;
            }, 300);
        };

        const startRotation = () => {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        };

        const stopRotation = () => clearInterval(testimonialInterval);

        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopRotation();
                showTestimonial(index);
                startRotation();
            });
        });

        const arrows = document.querySelectorAll('.nav-arrow');
        if (arrows.length >= 2) {
            arrows[0].addEventListener('click', () => {
                stopRotation();
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
                startRotation();
            });

            arrows[1].addEventListener('click', () => {
                stopRotation();
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
                startRotation();
            });
        }

        startRotation();

        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('mouseenter', stopRotation);
            testimonialsSection.addEventListener('mouseleave', startRotation);
        }
    }

    setupButtonEffects() {
        const createRipple = (e) => {
            const btn = e.currentTarget;
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 0, 0, 0.1)'; /* Darker ripple for light theme */
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        };

        document.querySelectorAll('.btn, .connect-button, .interest-btn, .contact-social-link, .footer-like').forEach(btn => {
            btn.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                createRipple(e);
            });
        });

        document.querySelectorAll('.footer-like').forEach(btn => {
            btn.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        });
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        const header = document.getElementById('header');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;

            if (scrollPos > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            document.querySelectorAll('section[id]').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    const id = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        });
    }

    setupTypingEffect() {
        const typedText = document.getElementById('typed-text');
        const cursor = document.getElementById('typed-cursor');
        const texts = [
            "Sandy Teuku Pranata",
        ];

        if (!typedText || !cursor) return;

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typedText.innerHTML = "Hi! I Am<br>" + currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.innerHTML = "Hi! I Am<br>" + currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 50 : 100; // Faster backspace

            if (!isDeleting && charIndex === currentText.length) {
                // Pause at the end of typing
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                // Move to next phrase
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing new text
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        const root = document.documentElement;

        // Check local storage for saved theme, default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        root.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });

        function updateIcon(theme) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    setupCustomCursor() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        if (!cursorDot || !cursorOutline) return;

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Subtle delay for the outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to interactive elements
        const interactibles = document.querySelectorAll('a, button, .footer-project, .dropdown-btn, input, textarea');
        interactibles.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    }

    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('.profile-image-container');

        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg rotation
                const rotateY = ((x - centerX) / centerX) * 15;

                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                el.style.transition = 'transform 0.1s ease';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                el.style.transition = 'transform 0.5s ease';
            });
        });
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupLikeButton() {
        const likeBtn = document.getElementById('likeButton');
        const likeCounter = document.getElementById('likeCounter');
        if (!likeBtn || !likeCounter) return;

        // Ensure baseline likes is a believable number
        let likes = parseInt(localStorage.getItem('portfolio_likes')) || 194;
        let hasLiked = localStorage.getItem('portfolio_has_liked') === 'true';

        likeCounter.innerText = likes;
        if (hasLiked) {
            likeBtn.classList.add('liked');
            likeBtn.querySelector('i').classList.replace('far', 'fas');
        }

        likeBtn.addEventListener('click', (e) => {
            if (hasLiked) return; // Prevent multiple likes

            likes++;
            hasLiked = true;
            localStorage.setItem('portfolio_likes', likes);
            localStorage.setItem('portfolio_has_liked', 'true');

            likeCounter.innerText = likes;
            likeBtn.classList.add('liked');

            const icon = likeBtn.querySelector('i');
            icon.classList.replace('far', 'fas');

            // Pop animation
            likeBtn.style.transform = 'scale(1.15)';
            setTimeout(() => {
                likeBtn.style.transform = '';
            }, 200);

            // Create floating hearts
            for (let i = 0; i < 4; i++) {
                setTimeout(() => createFloatingHeart(), i * 100);
            }
        });

        function createFloatingHeart() {
            const heart = document.createElement('i');
            heart.classList.add('fas', 'fa-heart', 'floating-heart');

            // Random horizontal offset
            const offset = (Math.random() - 0.5) * 60;
            heart.style.left = `calc(50% + ${offset}px)`;
            heart.style.top = '10px';

            likeBtn.appendChild(heart);

            setTimeout(() => {
                if (likeBtn.contains(heart)) {
                    heart.remove();
                }
            }, 1000);
        }
    }

    setupHeroParticles() {
        if (typeof tsParticles === 'undefined') {
            console.warn('tsParticles library not loaded');
            return;
        }

        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = isDarkMode ? "#a855f7" : "#7c3aed";
        const linkColor = isDarkMode ? "#6d28d9" : "#a855f7";

        tsParticles.load("tsparticles", {
            fullScreen: { enable: false, zIndex: 0 },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: { enable: true, mode: "grab" },
                    resize: true,
                },
                modes: {
                    push: { quantity: 4 },
                    grab: { distance: 200, links: { opacity: 0.3 } }
                },
            },
            particles: {
                color: { value: particleColor },
                links: {
                    color: linkColor,
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                collisions: { enable: false },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: true,
                    speed: 1,
                    straight: false,
                },
                number: { value: window.innerWidth < 768 ? 30 : 80, density: { enable: true, area: 800 } },
                opacity: { value: 0.5, random: true },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 }, random: true },
            },
            detectRetina: true,
        });

        // Listen for theme changes to update particle colors dynamically
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle && !this.tsparticlesThemeInitialized) {
            this.tsparticlesThemeInitialized = true;
            themeToggle.addEventListener('click', () => {
                setTimeout(() => {
                    this.setupHeroParticles(); // Reload particles with new theme colors
                }, 100);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Clean URL parameters (like utm_source, fbclid) for a cleaner look
    if (window.history && window.history.replaceState && window.location.search) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    new AnimationController();

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        #typed-title::after {
            content: '|';
            animation: blink 0.7s infinite;
            color: #7c3aed; /* Updated to primary accent */
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});