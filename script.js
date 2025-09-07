// Interactive Background
class InteractiveBackground {
    constructor() {
        this.canvas = document.getElementById('interactive-bg');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update particles
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.0003;
                particle.vy += dy * force * 0.0003;
            }
            
            // Boundaries
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(110, 142, 251, ${particle.opacity})`;
            this.ctx.fill();
            
            // Connect nearby particles
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(110, 142, 251, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
    }

    start() {
        return new Promise((resolve) => {
            this.element.classList.add('typing-cursor');
            const timer = setInterval(() => {
                if (this.currentIndex < this.text.length) {
                    this.element.textContent += this.text.charAt(this.currentIndex);
                    this.currentIndex++;
                } else {
                    this.element.classList.remove('typing-cursor');
                    clearInterval(timer);
                    resolve();
                }
            }, this.speed);
        });
    }
}

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-reveal');
        this.init();
    }

    init() {
        // Initially hide elements that should animate in
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop > window.innerHeight - 100) {
                element.classList.add('hidden');
            }
        });
        
        this.bindEvents();
        this.checkElements();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => this.checkElements());
    }

    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.remove('hidden');
                element.classList.add('revealed');
            }
        });
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasStarted = false;
        this.init();
    }

    init() {
        const aboutSection = document.getElementById('about');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasStarted) {
                    this.startCounters();
                    this.hasStarted = true;
                }
            });
        });
        observer.observe(aboutSection);
    }

    startCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, 20);
        });
    }
}

// Skills Progress Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.hasStarted = false;
        this.init();
    }

    init() {
        const skillsSection = document.getElementById('skills');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasStarted) {
                    this.animateSkills();
                    this.hasStarted = true;
                }
            });
        });
        observer.observe(skillsSection);
    }

    animateSkills() {
        this.skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.setProperty('--skill-width', width);
                bar.style.width = width;
            }, index * 200);
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form data
        if (!data.email || !data.subject || !data.message) {
            this.showError('Please fill in all fields.');
            return;
        }

        // Create mailto link with pre-filled data
        const mailtoLink = `mailto:ishmittal12@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.email}\n\nMessage:\n${data.message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        this.showSuccess();
        this.form.reset();
    }

    showSuccess() {
        // Create success message
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.textContent = 'Opening your email client... Please send the email to complete your message.';
        this.form.appendChild(message);

        setTimeout(() => message.remove(), 5000);
    }

    showError(errorText) {
        // Create error message
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.textContent = errorText || 'Please check your form and try again.';
        this.form.appendChild(message);

        setTimeout(() => message.remove(), 5000);
    }
}

// Theme Toggle
const themeCheckbox = document.getElementById('theme-toggle');
const body = document.body;

themeCheckbox.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeCheckbox.checked = true;
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = hamburger.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = hamburger.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = hamburger.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => span.style.transform = 'none');
            hamburger.querySelectorAll('span')[1].style.opacity = '1';
        }
    });
});

// Navbar Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background on scroll
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Add CSS for skill progress bars
const skillsCSS = `
.skill-progress::before {
    width: var(--skill-width, 0) !important;
}

.form-message {
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
}

.form-message.success {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
}

.form-message.error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = skillsCSS;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    const nameElement = document.getElementById('typing-name');
    const descElement = document.getElementById('typing-description');
    
    const nameTyping = new TypingAnimation(nameElement, 'Ishaan Mittal', 150);
    
    nameTyping.start().then(() => {
        const descTyping = new TypingAnimation(descElement, 'An 18-year-old pursuing Software Engineering', 80);
        return descTyping.start();
    });

    // Initialize other components
    new InteractiveBackground();
    // Disabled scroll reveal for now to ensure visibility
    // new ScrollReveal();
    new CounterAnimation();
    new SkillsAnimation();
    new ContactForm();
});

// Smooth page loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});
