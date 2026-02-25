// ============================================
// ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Автоматичне оновлення року в футері
    initializeFooterYear();
    
    // Плавна анімація при скролі
    initializeScrollAnimations();
    
    // Плавний скрол до секцій
    initializeSmoothScroll();
});

// ============================================
// ФУТЕР - АВТОМАТИЧНИЙ РІК
// ============================================

function initializeFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// АНІМАЦІЇ ПРИ СКРОЛІ
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Відписуємось для оптимізації
            }
        });
    }, observerOptions);

    // Спостерігаємо за всіма секціями
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
    
    // Спостерігаємо за картками підтримки
    const supportCards = document.querySelectorAll('.support-card');
    supportCards.forEach(card => observer.observe(card));
}

// ============================================
// ПЛАВНИЙ СКРОЛ ДО СЕКЦІЙ
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ігноруємо порожні якори
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// КОНСОЛЬ - ВІТАЛЬНЕ ПОВІДОМЛЕННЯ
// ============================================

console.log('%c👋 Привіт!', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cДякую, що завітали на мій сайт! 🚀', 'font-size: 14px; color: #64748b;');
