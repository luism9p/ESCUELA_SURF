/* ============================================
   JHONNY SURF SCHOOL
   Kinetic & Immersive Interactions
   GSAP-Powered | Full Rebuild
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    initScrollProgress();
    initCursorFollower();
    initHeroReveal();
    initHeaderScroll();
    initTextReveal();
    initAboutPortrait();
    initHorizontalScroll();
    initRetreatsParallax();
    initMagneticButtons();
    initMobileNav();
    initLanguageToggle();
    initSurfWidget();
    updateSurfConditions();
    BookingFlow.init();

    console.log('🌊 Jhonny Surf School — Initialized');
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
    const threshold = 80;

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > threshold);
    }, { passive: true });
}

/* -------------------- 
   Custom Cursor 
   -------------------- */
function initCursorFollower() {
    const cursor = document.getElementById('cursor-follower');
    if (!cursor || window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    (function animate() {
        curX += (mouseX - curX) * 0.13;
        curY += (mouseY - curY) * 0.13;
        cursor.style.left = `${curX}px`;
        cursor.style.top = `${curY}px`;
        requestAnimationFrame(animate);
    })();

    document.querySelectorAll('a, button, .menu-item, .retreat-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

/* -------------------- 
   Hero Text Reveal 
   -------------------- */
function initHeroReveal() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSub = document.querySelector('.hero-sub');
    const heroHint = document.querySelector('.hero-scroll-hint');
    if (!heroTitle) return;

    // Slide-up reveal on load
    gsap.to(heroTitle, {
        translateY: '0%',
        duration: 1.4,
        ease: 'power4.out',
        delay: 0.2,
        onComplete: () => {
            if (heroSub) heroSub.classList.add('visible');
        }
    });

    // Scroll: scale + fade out
    gsap.to(heroTitle, {
        scale: 2.8,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        }
    });

    if (heroSub) {
        gsap.to(heroSub, {
            opacity: 0,
            y: -30,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: '25% top',
                scrub: 0.8,
            }
        });
    }

    if (heroHint) {
        gsap.to(heroHint, {
            opacity: 0,
            y: -20,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: '18% top',
                scrub: 1,
            }
        });
    }
}

/* -------------------- 
   Text Reveal (About) 
   -------------------- */
function initTextReveal() {
    const textMasks = document.querySelectorAll('.text-mask');
    if (!textMasks.length) return;

    textMasks.forEach(mask => {
        // Slide up on enter
        gsap.from(mask, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: mask,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            }
        });

        // Color: dark grey → bright white as it crosses viewport center
        gsap.to(mask, {
            color: '#ffffff',
            ease: 'none',
            scrollTrigger: {
                trigger: mask,
                start: 'top 65%',
                end: 'top 35%',
                scrub: 1.2,
            }
        });
    });
}

/* -------------------- 
   About Portrait Fade 
   -------------------- */
function initAboutPortrait() {
    const portrait = document.querySelector('.about-portrait');
    if (!portrait) return;

    ScrollTrigger.create({
        trigger: '.about',
        start: 'top 60%',
        onEnter: () => portrait.classList.add('visible'),
        onLeaveBack: () => portrait.classList.remove('visible'),
    });
}

/* -------------------- 
   Horizontal Scroll (Lessons) 
   -------------------- */
function initHorizontalScroll() {
    const wrapper = document.querySelector('.packages-wrapper');
    const track = document.querySelector('.packages-track');
    const panels = document.querySelectorAll('.package-panel');
    if (!wrapper || !track || !panels.length) return;

    gsap.to(track, {
        xPercent: -(panels.length - 1) * 100,
        ease: 'none',
        scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${wrapper.offsetHeight - window.innerHeight}`,
            pin: '.packages-container',
            scrub: 1,
            anticipatePin: 1,
        }
    });
}

/* -------------------- 
   Retreats Parallax 
   -------------------- */
function initRetreatsParallax() {
    const retreatsImg = document.querySelector('.retreats-img');
    if (!retreatsImg) return;

    gsap.to(retreatsImg, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.retreats',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
        }
    });

    // Cards stagger fade-in
    const cards = document.querySelectorAll('.retreat-card');
    cards.forEach((card, i) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.retreats-cards',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });
    });

    // Retreats title reveal
    const rTitle = document.querySelector('.retreats-title');
    if (rTitle) {
        gsap.from(rTitle, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.retreats-header',
                start: 'top 80%',
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
   Language Toggle (EN / ES) 
   -------------------- */
function initLanguageToggle() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;

    const html = document.documentElement;
    let currentLang = html.getAttribute('data-lang') || 'es';

    // Set initial active state
    updateLangUI(currentLang);

    toggle.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-lang-btn]');
        if (!btn) return;
        const newLang = btn.dataset.langBtn;
        if (newLang === currentLang) return;
        currentLang = newLang;
        html.setAttribute('data-lang', currentLang);
        switchLanguage(currentLang);
        updateLangUI(currentLang);
    });

    function switchLanguage(lang) {
        document.querySelectorAll('[data-en][data-es]').forEach(el => {
            el.textContent = el.dataset[lang] || el.textContent;
        });
        // Handle innerHTML elements (like retreats-title with <br>)
        document.querySelectorAll('[data-en*="<br"]').forEach(el => {
            el.innerHTML = el.dataset[lang] || el.innerHTML;
        });
        // Update html lang attribute
        document.querySelector('html').setAttribute('lang', lang);
    }

    function updateLangUI(lang) {
        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.langBtn === lang);
        });
    }
}

/* -------------------- 
   Surf Widget API
   -------------------- */
async function initSurfWidget() {
    const loadingEl = document.getElementById('surf-loading');
    const contentEl = document.getElementById('surf-content');
    const statusEl = document.getElementById('surf-status');
    const dataEl = document.getElementById('surf-data');

    if (!loadingEl || !contentEl || !statusEl || !dataEl) return;

    try {
        const response = await fetch('https://marine-api.open-meteo.com/v1/marine?latitude=-4.45&longitude=-81.28&current=wave_height,wave_period,wave_direction&timezone=auto');
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();

        if (data && data.current) {
            const height = data.current.wave_height;
            const period = data.current.wave_period;
            
            let statusText = "SIN DATOS";
            let icon = "⚪";

            if (height < 1.2) {
                statusText = "PERFECTO PARA APRENDER";
                icon = "🟢";
            } else if (height >= 1.2 && height < 1.9) {
                statusText = "DIVERTIDO / INTERMEDIO";
                icon = "🟡";
            } else if (height >= 1.9) {
                statusText = "SOLO EXPERTOS";
                icon = "🔴";
            }

            statusEl.innerHTML = `<span>${icon}</span> <span>${statusText}</span>`;
            dataEl.textContent = `Altura: ${height}m | Periodo: ${period}s`;

            loadingEl.style.display = 'none';
            contentEl.style.display = 'block';
        } else {
            loadingEl.textContent = 'Reporte no disponible';
        }
    } catch (e) {
        console.error("Error fetching surf widget data:", e);
        if(loadingEl) loadingEl.textContent = 'Error al cargar reporte';
    }
}

/* -------------------- 
   Dashboard Surf Conditions
   -------------------- */
async function updateSurfConditions() {
    const elHeight = document.getElementById('api-surf-height');
    const elSubHeight = document.getElementById('api-surf-sub');
    const elSwell = document.getElementById('api-swell-primary');
    const elWind = document.getElementById('api-wind');
    const elWater = document.getElementById('api-temp-water');
    const elAir = document.getElementById('api-temp-air');

    // Return if not on dashboard page
    if (!elHeight) return;

    // Helper: degree to compass Rose direction
    const getCompassDir = (deg) => {
        const val = Math.floor((deg / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    };

    try {
        // Fetch Marine Data (Waves)
        const marineRes = await fetch('https://marine-api.open-meteo.com/v1/marine?latitude=-4.45&longitude=-81.28&current=wave_height,wave_period,wave_direction');
        if (marineRes.ok) {
            const marineData = await marineRes.json();
            if (marineData && marineData.current) {
                const wh = marineData.current.wave_height;
                const wp = marineData.current.wave_period;
                const wd = marineData.current.wave_direction;

                // Card 1: Height
                const minH = Math.max(0, (wh - 0.2)).toFixed(1);
                const maxH = (wh + 0.2).toFixed(1);
                elHeight.textContent = `${minH} - ${maxH}m`;

                // Give it a human-readable subtext based on height
                let humanSub = "Plano o muy pequeño";
                if (wh > 0.6 && wh < 1.2) humanSub = "Por la rodilla/cintura";
                if (wh >= 1.2 && wh < 1.8) humanSub = "Por la cintura/pecho";
                if (wh >= 1.8 && wh < 2.5) humanSub = "Overhead (Por encima de la cabeza)";
                if (wh >= 2.5) humanSub = "Doble Overhead+";
                elSubHeight.textContent = humanSub;

                // Dynamic Rating Banner
                const ratingEl = document.getElementById('api-surf-rating');
                if (ratingEl) {
                    if (wh < 1.2) {
                        ratingEl.textContent = "🟢 PERFECTO PARA APRENDER";
                        ratingEl.className = "api-surf-rating status-green";
                    } else if (wh >= 1.2 && wh < 1.9) {
                        ratingEl.textContent = "🟡 DIVERSIÓN / INTERMEDIO";
                        ratingEl.className = "api-surf-rating status-yellow";
                    } else {
                        ratingEl.textContent = "🔴 SOLO EXPERTOS";
                        ratingEl.className = "api-surf-rating status-red";
                    }
                }

                // Card 2: Swell
                const dirStr = getCompassDir(wd);
                const arrowSvg = `<svg style="width: 16px; height: 16px; color: #9ca3af; display: inline-block; margin-right: 4px; transform: rotate(${Math.round(wd)}deg);" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>`;
                elSwell.innerHTML = `<span>${wh}m</span> <span style="opacity: 0.5;">|</span> <span>${wp}s</span> <span style="opacity: 0.5;">|</span> <span style="font-size: 1rem; display: flex; align-items: center;">${arrowSvg} ${dirStr} ${Math.round(wd)}°</span>`;
            }
        }

        // Fetch Weather Data (Wind & Temp)
        const weatherRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-4.45&longitude=-81.28&current=temperature_2m,wind_speed_10m,wind_direction_10m');
        if (weatherRes.ok) {
            const weatherData = await weatherRes.json();
            if (weatherData && weatherData.current) {
                const ws = weatherData.current.wind_speed_10m;
                const wdir = weatherData.current.wind_direction_10m;
                const temp = weatherData.current.temperature_2m;

                // Card 3: Wind
                const wDirStr = getCompassDir(wdir);
                const wArrowSvg = `<svg style="width: 16px; height: 16px; color: #9ca3af; display: inline-block; margin-right: 4px; transform: rotate(${Math.round(wdir)}deg);" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>`;
                elWind.innerHTML = `<div style="display: flex; align-items: center;">${wArrowSvg} ${Math.round(ws)} kph ${wDirStr}</div>`;

                // Card 5: Temperature
                const tAir = Math.round(temp);
                const tWater = Math.max(16, tAir - 2); // Roughly air - 2 degrees, minimum ~16C for Peru
                elAir.textContent = `${tAir}°C`;
                elWater.textContent = `${tWater}°C`;
            }
        }

    } catch (e) {
        console.error("Error fetching Dashboard data:", e);
    }
}

/* ============================================
   BOOKING FLOW — CINEMATIC FULL-SCREEN
   ============================================ */
const BookingFlow = {
    overlay: null,
    steps: null,
    currentStep: 1,

    data: {
        level: null, price: 0,
        date: null, time: null,
        name: '', phone: ''
    },

    calendar: {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    },

    init() {
        this.overlay = document.getElementById('booking-overlay');
        this.steps = document.querySelectorAll('.booking-step');
        if (!this.overlay) return;
        this.bindEvents();
        this.generateCalendar();
        console.log('📅 Booking Flow Ready');
    },

    bindEvents() {
        // Open: circular CTA + nav RESERVAR button
        ['cta-circle-btn', 'nav-reservar-btn'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.open();
            });
        });

        // Open: retreats CTA
        document.getElementById('retreats-cta-btn')?.addEventListener('click', () => this.open());

        // Close
        document.getElementById('booking-close')?.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) this.close();
        });

        // Backdrop click to close
        document.querySelector('.booking-backdrop')?.addEventListener('click', () => this.close());

        // Experience Strips
        document.querySelectorAll('.experience-strip').forEach(strip => {
            strip.addEventListener('click', () => {
                this.selectExperience(strip.dataset.package, parseInt(strip.dataset.price));
            });
        });

        // Calendar
        document.getElementById('cal-prev')?.addEventListener('click', () => this.prevMonth());
        document.getElementById('cal-next')?.addEventListener('click', () => this.nextMonth());

        // Time Slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                this.data.time = slot.dataset.time;
                this.updateContinueButton();
            });
        });

        // Step 2 → 3
        document.getElementById('to-step-3')?.addEventListener('click', () => {
            if (this.data.date && this.data.time) this.goToStep(3);
        });

        // Form Submit
        document.getElementById('booking-form')?.addEventListener('submit', (e) => {
            this.submitBooking(e);
        });


    },

    open() {
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.resetFlow();
    },

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            document.getElementById('booking-success')?.classList.remove('active');
            this.resetFlow();
        }, 600);
    },

    resetFlow() {
        this.currentStep = 1;
        this.data = { package: null, price: 0, date: null, time: null, name: '', phone: '' };
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

    selectExperience(pkg, price) {
        this.data.package = pkg;
        this.data.price = price;
        const priceEl = document.getElementById('confirm-price');
        if (priceEl) priceEl.textContent = `(S/. ${price})`;
        setTimeout(() => this.goToStep(2), 350);
    },

    generateCalendar() {
        const daysEl = document.getElementById('calendar-days');
        const monthEl = document.getElementById('calendar-month');
        if (!daysEl || !monthEl) return;

        const { currentYear: yr, currentMonth: mo } = this.calendar;
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        monthEl.textContent = `${monthNames[mo]} ${yr}`;

        const firstDay = new Date(yr, mo, 1).getDay();
        const daysInMonth = new Date(yr, mo + 1, 0).getDate();
        const startDay = firstDay === 0 ? 6 : firstDay - 1;
        const today = new Date(); today.setHours(0, 0, 0, 0);

        daysEl.innerHTML = '';

        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement('button');
            empty.className = 'calendar-day empty';
            empty.type = 'button';
            daysEl.appendChild(empty);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const btn = document.createElement('button');
            btn.className = 'calendar-day';
            btn.textContent = day;
            btn.type = 'button';
            const date = new Date(yr, mo, day);

            if (date < today) {
                btn.classList.add('disabled');
                btn.disabled = true;
            } else {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    btn.classList.add('selected');
                    this.data.date = `${day}/${mo + 1}/${yr}`;
                    this.updateContinueButton();
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
        document.getElementById('summary-level').textContent = this.data.package || '—';
        document.getElementById('summary-date').textContent = this.data.date || '—';
        document.getElementById('summary-time').textContent = this.data.time || '—';
    },

    submitBooking(e) {
        if (e) e.preventDefault();

        const nameInput = document.getElementById('booking-name');
        const name = nameInput?.value.trim() || '';

        if (!name) {
            if (nameInput) {
                nameInput.style.borderColor = '#ff4444';
                nameInput.placeholder = 'Por favor, ingresa tu nombre para continuar.';
            }
            alert("Por favor, ingresa tu nombre para continuar.");
            return;
        } else {
            if (nameInput) nameInput.style.borderColor = '';
        }

        this.data.name = name;

        /* ── WhatsApp redirect ── */
        const waNumber = '51978693003';
        const message = `¡Hola Jhonny! Quiero separar mis clases de surf. Aquí te dejo los detalles de mi reserva:\n\n- *Nombre:* ${this.data.name}\n- *Paquete:* ${this.data.package}\n- *Fecha:* ${this.data.date}\n- *Hora:* ${this.data.time}\n- *Total:* S/. ${this.data.price}\n\n¡Me confirmas la disponibilidad!`;
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');

        /* ── Show success screen then close ── */
        document.getElementById('booking-success')?.classList.add('active');
        setTimeout(() => this.close(), 4500);
    }
};

/* -------------------- 
   Smooth Scroll for Anchors 
   -------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
