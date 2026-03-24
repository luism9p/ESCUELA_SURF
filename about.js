/* ============================================
   ABOUT.JS — Jhonny Surf School
   Kinetic animations for about.html
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Mark page as loaded for CSS transitions
    document.body.classList.add('loaded');

    initScrollProgress();
    initCursorFollower();
    initHeaderScroll();
    initAboutHeroReveal();
    initSpotParallax();
    initBioAnimations();
    initImpactQuote();
    initMagneticButtons();
    initMobileNav();
    initLanguageToggle();
    BookingFlow.init();

    console.log('🌊 About Page — Initialized');
});

/* -------------------- 
   Scroll Progress 
   -------------------- */
function initScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${(scrollTop / docHeight) * 100}%`;
    }, { passive: true });
}

/* -------------------- 
   Header Scroll State
   -------------------- */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
}

/* -------------------- 
   Custom Cursor
   -------------------- */
function initCursorFollower() {
    const cursor = document.getElementById('cursor-follower');
    if (!cursor || window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    (function animate() {
        curX += (mouseX - curX) * 0.13;
        curY += (mouseY - curY) * 0.13;
        cursor.style.left = `${curX}px`;
        cursor.style.top = `${curY}px`;
        requestAnimationFrame(animate);
    })();

    document.querySelectorAll('a, button, .bio-image-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

/* -------------------- 
   About Hero Reveal
   -------------------- */
function initAboutHeroReveal() {
    const title = document.querySelector('.about-hero-title');
    const subtitle = document.querySelector('.about-hero-subtitle');
    const hint = document.querySelector('.hero-scroll-hint');

    if (title) {
        gsap.to(title, {
            translateY: '0%',
            duration: 1.3,
            ease: 'power4.out',
            delay: 0.3,
        });
    }

    if (subtitle) {
        gsap.to(subtitle, {
            translateY: '0%',
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.7,
        });
    }

    // Scroll-out parallax fade
    if (title) {
        gsap.to(title, {
            scale: 1.15,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            }
        });
    }

    if (hint) {
        gsap.to(hint, {
            opacity: 0,
            y: -20,
            scrollTrigger: {
                trigger: '.about-hero',
                start: 'top top',
                end: '20% top',
                scrub: 1,
            }
        });
    }
}

/* -------------------- 
   Spot Parallax
   -------------------- */
function initSpotParallax() {
    const img = document.querySelector('.spot-img');
    if (!img) return;

    gsap.to(img, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
            trigger: '.spot-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        }
    });

    // Spot content fade in
    const content = document.querySelector('.spot-content');
    if (content) {
        gsap.from(content, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.spot-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            }
        });
    }
}

/* -------------------- 
   Bio Section Animations
   -------------------- */
function initBioAnimations() {
    // Bio heading reveal
    const bioHeading = document.querySelector('.bio-heading');
    if (bioHeading) {
        gsap.from(bioHeading, {
            yPercent: 40,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.bio-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse',
            }
        });
    }

    // Bio text
    const bioText = document.querySelector('.bio-text');
    if (bioText) {
        gsap.from(bioText, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: bioText,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });
    }

    // Stats stagger
    const stats = document.querySelectorAll('.stat-item');
    if (stats.length) {
        gsap.from(stats, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.bio-stats',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    }

    // Testimonial card
    const card = document.querySelector('.testimonial-card');
    if (card) {
        gsap.from(card, {
            x: 50,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.bio-right',
                start: 'top 78%',
                toggleActions: 'play none none reverse',
            }
        });
    }

    // Image card
    const imgCard = document.querySelector('.bio-image-card');
    if (imgCard) {
        gsap.from(imgCard, {
            x: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: '.bio-right',
                start: 'top 74%',
                toggleActions: 'play none none reverse',
            }
        });
    }
}

/* -------------------- 
   Impact Quote Animation
   -------------------- */
function initImpactQuote() {
    const quoteText = document.querySelector('.impact-quote-text');
    const author = document.querySelector('.impact-author');

    if (quoteText) {
        gsap.from(quoteText, {
            y: 50,
            opacity: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.impact-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            }
        });
    }

    if (author) {
        gsap.from(author, {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.3,
            scrollTrigger: {
                trigger: '.impact-quote-footer',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    }
}

/* -------------------- 
   Magnetic Buttons
   -------------------- */
function initMagneticButtons() {
    const btns = document.querySelectorAll('.magnetic-btn');
    if (!btns.length || window.matchMedia('(hover: none)').matches) return;

    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.32, y: y * 0.32, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
    });
}

/* -------------------- 
   Mobile Navigation
   -------------------- */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navBackdrop = document.getElementById('nav-backdrop');
    if (!navToggle || !navMenu) return;

    function openMenu() {
        navMenu.classList.add('open');
        if (navBackdrop) navBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        if (navBackdrop) navBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', openMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);
    if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* -------------------- 
   Language Toggle
   -------------------- */
function initLanguageToggle() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;

    const html = document.documentElement;
    let currentLang = html.getAttribute('data-lang') || 'es';
    updateLangUI(currentLang);

    toggle.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-lang-btn]');
        if (!btn) return;
        const newLang = btn.dataset.langBtn;
        if (newLang === currentLang) return;
        currentLang = newLang;
        html.setAttribute('data-lang', currentLang);
        html.setAttribute('lang', currentLang);
        switchLanguage(currentLang);
        updateLangUI(currentLang);
    });

    function switchLanguage(lang) {
        document.querySelectorAll('[data-en][data-es]').forEach(el => {
            const val = el.dataset[lang];
            if (!val) return;
            // handle innerHTML with <br>
            if (val.includes('<')) el.innerHTML = val;
            else el.textContent = val;
        });
    }

    function updateLangUI(lang) {
        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.langBtn === lang);
        });
    }
}

/* ============================================
   BOOKING FLOW (identical to main page)
   ============================================ */
const BookingFlow = {
    overlay: null, steps: null, currentStep: 1,
    data: { level: null, price: 0, date: null, time: null, name: '', phone: '' },
    calendar: { currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear() },

    init() {
        this.overlay = document.getElementById('booking-overlay');
        this.steps = document.querySelectorAll('.booking-step');
        if (!this.overlay) return;
        this.bindEvents();
        this.generateCalendar();
    },

    bindEvents() {
        ['cta-circle-btn', 'nav-reservar-btn'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation(); this.open();
            });
        });
        document.getElementById('booking-close')?.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) this.close();
        });
        document.querySelector('.booking-backdrop')?.addEventListener('click', () => this.close());

        document.querySelectorAll('.experience-strip').forEach(strip => {
            strip.addEventListener('click', () => this.selectExperience(strip.dataset.level, parseInt(strip.dataset.price)));
        });

        document.getElementById('cal-prev')?.addEventListener('click', () => this.prevMonth());
        document.getElementById('cal-next')?.addEventListener('click', () => this.nextMonth());

        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                this.data.time = slot.dataset.time;
                this.updateContinueButton();
            });
        });

        document.getElementById('to-step-3')?.addEventListener('click', () => {
            if (this.data.date && this.data.time) this.goToStep(3);
        });

        document.getElementById('booking-form')?.addEventListener('submit', (e) => {
            e.preventDefault(); this.submitBooking();
        });

        document.getElementById('booking-phone')?.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 9);
            if (v.length > 6) v = `${v.slice(0,3)} ${v.slice(3,6)} ${v.slice(6)}`;
            else if (v.length > 3) v = `${v.slice(0,3)} ${v.slice(3)}`;
            e.target.value = v;
        });
    },

    open() { this.overlay.classList.add('active'); document.body.style.overflow = 'hidden'; this.resetFlow(); },

    close() {
        this.overlay.classList.remove('active'); document.body.style.overflow = '';
        setTimeout(() => { document.getElementById('booking-success')?.classList.remove('active'); this.resetFlow(); }, 600);
    },

    resetFlow() {
        this.currentStep = 1;
        this.data = { level: null, price: 0, date: null, time: null, name: '', phone: '' };
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        const btn = document.getElementById('to-step-3');
        if (btn) btn.disabled = true;
        document.getElementById('booking-form')?.reset();
        this.goToStep(1);
    },

    goToStep(step) {
        this.currentStep = step;
        document.getElementById('current-step').textContent = step;
        document.getElementById('progress-fill').style.width = `${(step / 3) * 100}%`;
        this.steps.forEach(s => {
            const n = parseInt(s.dataset.step);
            s.classList.remove('active', 'exit');
            if (n === step) s.classList.add('active');
            else if (n < step) s.classList.add('exit');
        });
        if (step === 3) this.updateSummary();
    },

    selectExperience(level, price) {
        this.data.level = level; this.data.price = price;
        const priceEl = document.getElementById('confirm-price');
        if (priceEl) priceEl.textContent = `(S/. ${price})`;
        setTimeout(() => this.goToStep(2), 350);
    },

    generateCalendar() {
        const daysEl = document.getElementById('calendar-days');
        const monthEl = document.getElementById('calendar-month');
        if (!daysEl || !monthEl) return;
        const { currentYear: yr, currentMonth: mo } = this.calendar;
        const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        monthEl.textContent = `${monthNames[mo]} ${yr}`;
        const firstDay = new Date(yr, mo, 1).getDay();
        const daysInMonth = new Date(yr, mo + 1, 0).getDate();
        const startDay = firstDay === 0 ? 6 : firstDay - 1;
        const today = new Date(); today.setHours(0,0,0,0);
        daysEl.innerHTML = '';
        for (let i = 0; i < startDay; i++) {
            const e = document.createElement('button'); e.className = 'calendar-day empty'; e.type = 'button'; daysEl.appendChild(e);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const btn = document.createElement('button'); btn.className = 'calendar-day'; btn.textContent = day; btn.type = 'button';
            const date = new Date(yr, mo, day);
            if (date < today) { btn.classList.add('disabled'); btn.disabled = true; }
            else {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    btn.classList.add('selected'); this.data.date = `${day}/${mo + 1}/${yr}`; this.updateContinueButton();
                });
            }
            daysEl.appendChild(btn);
        }
    },

    prevMonth() {
        this.calendar.currentMonth--;
        if (this.calendar.currentMonth < 0) { this.calendar.currentMonth = 11; this.calendar.currentYear--; }
        this.generateCalendar();
    },
    nextMonth() {
        this.calendar.currentMonth++;
        if (this.calendar.currentMonth > 11) { this.calendar.currentMonth = 0; this.calendar.currentYear++; }
        this.generateCalendar();
    },
    updateContinueButton() {
        const btn = document.getElementById('to-step-3');
        if (btn) btn.disabled = !(this.data.date && this.data.time);
    },
    updateSummary() {
        const levelMap = { principiante: 'Principiante', intermedio: 'Intermedio', avanzado: 'Avanzado' };
        document.getElementById('summary-level').textContent = levelMap[this.data.level] || '—';
        document.getElementById('summary-date').textContent = this.data.date || '—';
        document.getElementById('summary-time').textContent = this.data.time || '—';
    },
    submitBooking() {
        const name = document.getElementById('booking-name')?.value || '';
        const phone = document.getElementById('booking-phone')?.value || '';
        if (!name || !phone) return;
        this.data.name = name; this.data.phone = phone;
        document.getElementById('booking-success')?.classList.add('active');
        setTimeout(() => this.close(), 4500);
    }
};
