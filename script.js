// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== PORTFOLIO IMAGES =====
const portfolioImages = {
  interiery: [
    'assets/portfolio/interiery/hf_20260318_141601_2458f9b3-caf3-40f5-a3ec-e05d8a0a8131.jpeg',
    'assets/portfolio/interiery/hf_20260323_092446_76326e3e-5e26-45b0-8aa1-5da152d0251a.jpeg',
    'assets/portfolio/interiery/hf_20260413_123009_fe9ead09-7415-43f0-beba-9db0fc6a638d.png',
    'assets/portfolio/interiery/hf_20260413_124515_5d03d794-8f10-4814-9cd9-6be86181e8fa.png',
    'assets/portfolio/interiery/hf_20260413_140624_ad81f9af-25d6-4358-9c1d-ead023102089.png',
  ],
  produktove: [
    'assets/portfolio/produktove/1.webp',
    'assets/portfolio/produktove/2.webp',
    'assets/portfolio/produktove/3.webp',
    'assets/portfolio/produktove/4.webp',
  ],
  reklamni: [
    'assets/portfolio/reklamni/1_1.png',
    'assets/portfolio/reklamni/1_3.png',
  ],
  lifestyle: [
  ],
};

function buildGrid(gridId, images) {
  const grid = document.getElementById(gridId);
  const category = gridId.replace('grid-', '');
  const LIMIT = 6;

  images.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'grid-item' + (index >= LIMIT ? ' grid-item--hidden' : '');

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Portfolio vizuál ${index + 1}`;
    img.loading = 'lazy';

    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(category, index));
    grid.appendChild(item);
  });

  if (images.length > LIMIT) {
    const btn = document.createElement('button');
    btn.className = 'btn-show-more';
    btn.textContent = 'Zobrazit více →';
    let expanded = false;
    btn.addEventListener('click', () => {
      expanded = !expanded;
      if (expanded) {
        grid.querySelectorAll('.grid-item--hidden').forEach(el => el.classList.remove('grid-item--hidden'));
        btn.textContent = 'Zobrazit méně ↑';
      } else {
        grid.querySelectorAll('.grid-item').forEach((el, i) => {
          if (i >= LIMIT) el.classList.add('grid-item--hidden');
        });
        btn.textContent = 'Zobrazit více →';
      }
    });
    grid.insertAdjacentElement('afterend', btn);
  }
}

function buildCarousel(category, images) {
  const carousel = document.getElementById(`carousel-${category}`);
  const track = document.getElementById(`track-${category}`);
  const dotsEl = document.getElementById(`dots-${category}`);
  let current = 0;
  let startX = 0;
  let dragX = 0;
  let dragging = false;

  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Portfolio vizuál ${i + 1}`;
    img.loading = 'lazy';
    slide.appendChild(img);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Snímek ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = Math.max(0, Math.min(index, images.length - 1));
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    dragX = 0;
    dragging = true;
    track.style.transition = 'none';
  }, { passive: true });

  carousel.addEventListener('touchmove', e => {
    if (!dragging) return;
    e.preventDefault();
    dragX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(calc(-${current * 100}% + ${dragX}px))`;
  }, { passive: false });

  carousel.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    if (dragX < -50) goTo(current + 1);
    else if (dragX > 50) goTo(current - 1);
    else goTo(current);
  });
}

buildGrid('grid-produktove', portfolioImages.produktove);
buildGrid('grid-reklamni', portfolioImages.reklamni);
buildGrid('grid-lifestyle', portfolioImages.lifestyle);
buildGrid('grid-interiery', portfolioImages.interiery);
buildCarousel('produktove', portfolioImages.produktove);
buildCarousel('reklamni', portfolioImages.reklamni);
buildCarousel('lifestyle', portfolioImages.lifestyle);
buildCarousel('interiery', portfolioImages.interiery);

// ===== TABS =====
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    gtag('event', 'portfolio_tab_click', { tab: btn.dataset.tab });
  });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentCategory = 'produktove';
let currentIndex = 0;
let savedScrollY = 0;

function openLightbox(category, index) {
  currentCategory = category;
  currentIndex = index;
  lightboxImg.src = portfolioImages[category][index];
  lightbox.classList.add('open');
  // iOS Safari scroll lock
  savedScrollY = window.scrollY;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.width = '100%';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, savedScrollY);
}

function navigate(dir) {
  const images = portfolioImages[currentCategory];
  currentIndex = (currentIndex + dir + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

let lbTouchStartX = 0;
lightbox.addEventListener('touchstart', e => {
  lbTouchStartX = e.touches[0].clientX;
}, { passive: true });
lightbox.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - lbTouchStartX;
  if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
}, { passive: true });

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ===== PRIVACY MODAL =====
const privacyModal = document.getElementById('privacy-modal');

function openPrivacy(e) {
  e.preventDefault();
  privacyModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePrivacy() {
  privacyModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('open-privacy').addEventListener('click', openPrivacy);
document.getElementById('open-privacy-footer').addEventListener('click', openPrivacy);
document.getElementById('close-privacy').addEventListener('click', closePrivacy);
privacyModal.addEventListener('click', e => { if (e.target === privacyModal) closePrivacy(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && privacyModal.classList.contains('open')) closePrivacy(); });

// ===== COOKIE CONSENT =====
const cookieBanner = document.getElementById('cookie-banner');
const COOKIE_KEY = 'omgai_cookie_consent';

function grantConsent() {
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted'
  });
}

if (localStorage.getItem(COOKIE_KEY) === 'accepted') {
  grantConsent();
} else if (!localStorage.getItem(COOKIE_KEY)) {
  setTimeout(() => cookieBanner.classList.add('visible'), 800);
}

document.getElementById('cookie-accept').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'accepted');
  cookieBanner.classList.remove('visible');
  grantConsent();
});

document.getElementById('cookie-necessary').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'declined');
  cookieBanner.classList.remove('visible');
});

document.getElementById('cookie-decline').addEventListener('click', () => {
  localStorage.setItem(COOKIE_KEY, 'declined');
  cookieBanner.classList.remove('visible');
});

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const feedback = document.getElementById('form-feedback');
  const btn = this.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'Odesílám…';

  setTimeout(() => {
    feedback.textContent = 'Zpráva odeslána! Ozveme se vám co nejdříve.';
    feedback.className = 'form-feedback success';
    this.reset();
    btn.disabled = false;
    btn.textContent = 'Odeslat';
    gtag('event', 'form_submit', { event_category: 'contact' });
  }, 800);
});

// ===== CTA TRACKING =====
document.querySelectorAll('a[href="#kontakt"]').forEach(el => {
  el.addEventListener('click', () => {
    gtag('event', 'cta_click', { label: el.textContent.trim() });
  });
});
