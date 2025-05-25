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
                    document.body.style.overflow = '';
                } else {
                    dropdownContent.classList.remove('show');
                    dropdownOverlay.classList.remove('show');
                    document.body.style.overflow = '';
                }
            };

            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleDropdown(!this.dropdownOpen);
            });

            dropdownOverlay.addEventListener('click', () => {
                toggleDropdown(false);
            });

            dropdownContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });

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
                    image: "https://media.istockphoto.com/id/1354898581/photo/shot-of-a-young-businessman-using-a-laptop-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=dDDNcvIoG-4VdO01ZlENqODBoNocT434vIFp0duuTZM="
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

            const stopRotation = () => {
                clearInterval(testimonialInterval);
            };

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
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
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
            
                    // Jika href adalah ID (#about, #contact), lakukan scroll
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
            
                    // Ripple effect
                    createRipple(e);
                });
            });
            
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
    }

    // Initialize everything
    document.addEventListener('DOMContentLoaded', () => {
        const animationController = new AnimationController();

        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
            .dropdown-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                z-index: 9998;
                display: none;
            }
            .dropdown-overlay.show {
                display: block;
            }
            .dropdown-content a.active {
                background: rgba(124, 58, 237, 0.3);
                color: white;
                font-weight: 500;
            }
            .footer-like.active {
                color: red;
            }
        `;
        document.head.appendChild(style);
    });

    // Optional global toggle
    function toggleDropdown() {
        const dropdownContent = document.getElementById('dropdown-content');
        const dropdownOverlay = document.getElementById('dropdownOverlay');

        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
            dropdownOverlay.classList.remove('show');
        } else {
            dropdownContent.classList.add('show');
            dropdownOverlay.classList.add('show');
        }
    }
