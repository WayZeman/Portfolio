document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initHeaderScroll();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initBackgroundParticles();
});

function initYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open);
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function initScrollAnimations() {
    const opts = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                observer.unobserve(e.target);
            }
        });
    }, opts);

    document.querySelectorAll('.card-project, .card-support').forEach(el => observer.observe(el));

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('in-view');
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.section').forEach(el => sectionObserver.observe(el));
}

function initBackgroundParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width, height, particles = [];
    const isMobile = () => window.innerWidth <= 767;
    const speed = 0.15;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const want = isMobile() ? 28 : 55;
        if (particles.length === 0 || particles.length !== want) {
            particles = Array.from({ length: want }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                r: 0.5 + Math.random() * 1.2,
                alpha: 0.15 + Math.random() * 0.25,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed - 0.1,
            }));
        }
    }

    function draw() {
        if (!ctx || !width || !height) return;
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -5 || p.x > width + 5) p.vx *= -1;
            if (p.y < -5 || p.y > height + 5) p.vy *= -1;
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = 'rgba(0, 212, 255, 0.9)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    requestAnimationFrame(draw);
}

function initSmoothScroll() {
    const header = document.querySelector('.header');
    const offset = header ? header.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}
