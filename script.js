// Theme Toggle
const themeCheckbox = document.getElementById('theme-toggle');
const body = document.body;

themeCheckbox.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

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
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => span.style.transform = 'none');
            hamburger.querySelectorAll('span')[1].style.opacity = '1';
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = window.scrollY > 50
        ? (body.classList.contains('light-mode') ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)')
        : (body.classList.contains('light-mode') ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)');
});