/* ============================
   SHRIRAM TECHNOLOGIES — JS
   ============================ */

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) navLinks.classList.remove('open');
    });
}

// ---- Cursor glow ----
const glow = document.getElementById('cursorGlow');
if (glow) {
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// ---- Particle canvas ----
function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.3,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            o: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.o})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        animFrame = requestAnimationFrame(draw);
    }
    draw();
}

initParticles('particleCanvas');

// ---- Typed text ----
const typedEl = document.getElementById('typedText');
if (typedEl) {
    const words = ['Future of Automation', 'World of Robotics', 'Power of AI', 'Era of Innovation'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
        const word = words[wi];
        if (!deleting) {
            typedEl.textContent = word.slice(0, ci + 1);
            ci++;
            if (ci === word.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            typedEl.textContent = word.slice(0, ci - 1);
            ci--;
            if (ci === 0) {
                deleting = false;
                wi = (wi + 1) % words.length;
            }
        }
        setTimeout(type, deleting ? 55 : 90);
    }
    type();
}

// ---- Counter animation ----
function animateCounters() {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target = +el.dataset.target;
        const suffix = el.nextElementSibling?.textContent || '';
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Trigger counters when stats come into view
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsEl);
}

// ---- Contact form ----
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            form.reset();
            btn.innerHTML = 'Send Message <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
            btn.disabled = false;
            const success = document.getElementById('formSuccess');
            success.style.display = 'block';
            success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => success.style.display = 'none', 6000);
        }, 1400);
    });
}
