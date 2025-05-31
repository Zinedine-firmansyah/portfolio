(function() {
    'use strict';

    // ===== UTILITY FUNCTIONS =====
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    const debounce = (func, wait) => {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };

    // ===== DOM ELEMENTS =====
    const navbar = document.getElementById('navbar');
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    // ===== NAVBAR BACKGROUND ON SCROLL =====
    const updateNavbar = throttle(() => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    }, 16);

    window.addEventListener('scroll', updateNavbar);

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(section => {
        fadeInObserver.observe(section);
    });

    // ===== SKILL PROGRESS ANIMATION =====
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-level');
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 300);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillProgressBars.forEach(bar => {
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });

    // ===== KEYBOARD NAVIGATION SUPPORT =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== LAZY LOADING FOR IMAGES =====
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // ===== PERFORMANCE MONITORING =====
    const logPerformanceMetrics = () => {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                }, 0);
            });
        }
    };

    logPerformanceMetrics();

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            stack: e.error?.stack
        });
    });

    // ===== PROGRESSIVE ENHANCEMENT =====
    // Add enhanced features only if JavaScript is enabled
    document.documentElement.classList.add('js-enabled');

    // ===== RESIZE HANDLER =====
    const handleResize = debounce(() => {
        // Close mobile menu on resize to desktop
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.classList.remove('active');
            }
            document.body.classList.remove('menu-open');
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // ===== INTERSECTION OBSERVER FOR NAVBAR ACTIVE STATES =====
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-links a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===== INITIALIZE FEATURES ON DOM CONTENT LOADED =====
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize any features that need DOM to be fully loaded
        console.log('Portfolio website initialized successfully');
    });

})();
