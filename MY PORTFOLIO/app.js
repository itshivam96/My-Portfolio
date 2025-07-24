// Portfolio JavaScript functionality with mobile navigation and improved theming

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with actual EmailJS public key
})();
// Resume download action
    window.downloadResume = () => {
      window.open('shivam_Kumar_webdev.pdf', '_blank', 'noopener,noreferrer');
    };
// Mobile Navigation Controller
class MobileNavigation {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileMenuClose = document.getElementById('mobileMenuClose');
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
        this.body = document.body;
        this.focusableElements = [];
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.navToggle || !this.mobileMenu) return;
        
        // Event listeners
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        this.mobileMenuClose.addEventListener('click', () => this.closeMenu());
        
        // Close menu when clicking on links
        this.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Close menu when clicking outside
        this.mobileMenu.addEventListener('click', (e) => {
            if (e.target === this.mobileMenu) {
                this.closeMenu();
            }
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isOpen = true;
        this.mobileMenu.classList.add('open');
        this.navToggle.classList.add('active');
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.mobileMenu.setAttribute('aria-hidden', 'false');
        this.body.classList.add('menu-open');
        
        // Set up focus trapping
        this.setupFocusTrap();
        
        // Focus the close button
        setTimeout(() => {
            this.mobileMenuClose.focus();
        }, 150);
    }
    
    closeMenu() {
        this.isOpen = false;
        this.mobileMenu.classList.remove('open');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
        this.body.classList.remove('menu-open');
        
        // Return focus to toggle button
        this.navToggle.focus();
    }
    
    setupFocusTrap() {
        // Get all focusable elements within the mobile menu
        this.focusableElements = this.mobileMenu.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (this.focusableElements.length === 0) return;
        
        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];
        
        // Handle tab key for focus trapping
        this.mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// Enhanced Theme Toggle with WCAG compliance
class ThemeToggle {
    constructor() {
        this.toggle = document.getElementById('themeToggle');
        this.mobileToggle = document.getElementById('mobileThemeToggle');
        this.html = document.documentElement;
        this.currentTheme = this.getStoredTheme();
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Event listeners
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
        
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('color-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    getStoredTheme() {
        const stored = localStorage.getItem('color-theme');
        if (stored) return stored;
        
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemPrefersDark ? 'dark' : 'light';
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        this.html.setAttribute('data-theme', theme);
        
        // Update toggle icons
        const icon = theme === 'dark' ? '☀️' : '🌙';
        const icons = document.querySelectorAll('.theme-toggle__icon');
        icons.forEach(iconEl => {
            iconEl.textContent = icon;
        });
        
        // Update aria-label
        const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        if (this.toggle) this.toggle.setAttribute('aria-label', label);
        if (this.mobileToggle) this.mobileToggle.setAttribute('aria-label', label);
        
        // Store preference
        localStorage.setItem('color-theme', theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Particle Background Animation
class ParticleBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scrolling Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Animation Observer
class ScrollAnimations {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );
        
        this.init();
    }
    
    init() {
        // Add fade-in class to elements that should animate
        const animatedElements = document.querySelectorAll(`
            .about__content,
            .skill-category,
            .experience-card,
            .project-card,
            .contact__content,
            .timeline__item
        `);
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when skills section comes into view
                if (entry.target.classList.contains('skill-category')) {
                    this.animateSkillBars(entry.target);
                }
            }
        });
    }
    
    animateSkillBars(skillCategory) {
        const skillBars = skillCategory.querySelectorAll('.skill-bar__fill');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = 'scaleX(1)';
            }, index * 200);
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Disable submit button
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // For demo purposes, we'll simulate email sending
            // In real implementation, integrate with EmailJS:
            // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data);
            
            await this.simulateEmailSend(data);
            
            this.showSuccess('Message sent successfully!');
            this.form.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            this.showError('Failed to send message. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    simulateEmailSend(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success 90% of the time
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Simulated failure'));
                }
            }, 2000);
        });
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 320px;
            ${type === 'success' ? 'background: #28A745;' : 'background: #DC3545;'}
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Navigation Scroll Effect
class NavigationScroll {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            this.nav.style.background = 'rgba(var(--color-surface-rgb), 0.98)';
            this.nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.nav.style.background = 'rgba(var(--color-surface-rgb), 0.95)';
            this.nav.style.boxShadow = 'none';
        }
    }
}

// Skill Bar Hover Effects
class SkillBarInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            bar.addEventListener('mouseenter', () => this.animateHover(bar, true));
            bar.addEventListener('mouseleave', () => this.animateHover(bar, false));
        });
    }
    
    animateHover(bar, isHover) {
        const fill = bar.querySelector('.skill-bar__fill');
        const percentage = bar.querySelector('.skill-bar__percentage');
        
        if (isHover) {
            fill.style.transform = 'scaleY(1.2)';
            fill.style.filter = 'brightness(1.1)';
            percentage.style.transform = 'scale(1.1)';
            percentage.style.color = 'var(--color-accent-hover)';
        } else {
            fill.style.transform = 'scaleY(1)';
            fill.style.filter = 'brightness(1)';
            percentage.style.transform = 'scale(1)';
            percentage.style.color = 'var(--color-accent)';
        }
    }
}

// Button Ripple Effects
class RippleEffects {
    constructor() {
        this.init();
    }
    
    init() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
        });
    }
    
    createRipple(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple animation keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// Project Card Interactions
class ProjectCardInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleHover(card, true));
            card.addEventListener('mouseleave', () => this.handleHover(card, false));
        });
    }
    
    handleHover(card, isHover) {
        const techTags = card.querySelectorAll('.tech-tag');
        
        if (isHover) {
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px) scale(1.05)';
                }, index * 50);
            });
        } else {
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        }
    }
}

// Keyboard Navigation Enhancement
class KeyboardNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Add keyboard navigation for custom elements
        const focusableElements = document.querySelectorAll(`
            .nav__link,
            .btn,
            .contact__social-link,
            .theme-toggle,
            input,
            textarea,
            button
        `);
        
        focusableElements.forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (el.tagName === 'A' || el.tagName === 'BUTTON') {
                        e.preventDefault();
                        el.click();
                    }
                }
            });
        });
        
        // Skip to main content shortcut
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                const mainContent = document.getElementById('about');
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

// Accessibility Announcements
class AccessibilityAnnouncements {
    constructor() {
        this.init();
    }
    
    init() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }
    
    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor performance and log to console for development
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('🚀 Page Load Performance:', {
                        'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart) + 'ms',
                        'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart) + 'ms',
                        'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms'
                    });
                }, 0);
            });
        }
    }
}

// Color Contrast Validator (Development Tool)
class ContrastValidator {
    constructor() {
        this.init();
    }
    
    init() {
        // Only run in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.validateContrast();
        }
    }
    
    validateContrast() {
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, .nav__link, .about__text');
        
        textElements.forEach(el => {
            const styles = getComputedStyle(el);
            const color = styles.color;
            const backgroundColor = styles.backgroundColor;
            
            // Log color information for manual verification
            if (color && backgroundColor) {
                console.log('Element contrast check:', {
                    element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ')[0] : ''),
                    color: color,
                    backgroundColor: backgroundColor
                });
            }
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    const particleCanvas = document.getElementById('particleCanvas');
    if (particleCanvas) {
        new ParticleBackground(particleCanvas);
    }
    
    // Core functionality
    new MobileNavigation();
    new ThemeToggle();
    new SmoothScroll();
    new ScrollAnimations();
    new ContactForm();
    new NavigationScroll();
    new SkillBarInteractions();
    new RippleEffects();
    new ProjectCardInteractions();
    new KeyboardNavigation();
    new AccessibilityAnnouncements();
    new PerformanceMonitor();
    new ContrastValidator();
    
    // Add smooth reveal animation to hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
    
    console.log('🚀 Portfolio with mobile navigation initialized successfully!');
});

// Handle scroll performance optimization
let ticking = false;

function updateOnScroll() {
    // Add any scroll-based updates here
    ticking = false;
}

document.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalLinks = [
        'https://cdn.emailjs.com/dist/email.min.js'
    ];
    
    criticalLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MobileNavigation,
        ThemeToggle,
        ContactForm
    };
}
