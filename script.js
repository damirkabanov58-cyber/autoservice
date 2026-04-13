// ===== NAV: scroll shadow & burger =====
const nav     = document.getElementById('nav');
const burger  = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');

const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lbImg.src = galleryItems[index].dataset.src;
  lbImg.alt = galleryItems[index].querySelector('img').alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  lbImg.src = galleryItems[currentIndex].dataset.src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  lbImg.src = galleryItems[currentIndex].dataset.src;
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showPrev();
  if (e.key === 'ArrowRight')  showNext();
});
