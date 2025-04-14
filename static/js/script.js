document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    function updateCountdown() {
        const eventDate = new Date('April 26, 2025 10:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.cyber-countdown').innerHTML = '<div class="countdown-ended">Митап начался!</div>';
        }
    }
    
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.cyber-card, .speaker-card, .contact-card, .stats-item, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Спасибо за регистрацию! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
    
    const ctfButton = document.querySelector('.cyber-button[href="https://ctf.caspianctf.ru"]');
    
    if (ctfButton) {
        ctfButton.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
            this.setAttribute('data-text', this.textContent);
        });
        
        ctfButton.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    }
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const header = document.querySelector('.cyber-header');
        
        if (header) {
            header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
});

window.addEventListener('message', function(e) {
    if (e.data && e.data.timepad && e.data.timepad.registration) {
        const registrationData = e.data.timepad.registration;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'registration', {
                'event_category': 'form',
                'event_label': 'Timepad'
            });
        }
        
        const widgetContainer = document.querySelector('.timepad-container');
        const confetti = document.createElement('div');
        confetti.className = 'cyber-confetti';
        widgetContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
});

window.addEventListener('message', function(e) {
    if (e.data && e.data.timepad && e.data.timepad.widgetLoaded) {
        const container = document.querySelector('.cyber-timepad-container');
        
        container.classList.remove('loading');
        
        const iframe = container.querySelector('iframe');
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        iframe.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            iframe.style.opacity = '1';
            iframe.style.transform = 'translateY(0)';
        }, 100);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.cyber-timepad-container');
    if (container) {
        container.classList.add('loading');
    }
});

