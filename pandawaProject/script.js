// ===== MOBILE NAV (FULLSCREEN) =====
const navToggle = document.getElementById("navToggle");
const navMenu   = document.getElementById("navMenu");
const menuClose = document.getElementById("menuClose");

if (navToggle && navMenu) {

  // buka menu
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("open");
    document.body.style.overflow = "hidden"; // lock scroll
  });

  // tutup menu via tombol X
  if (menuClose) {
    menuClose.addEventListener("click", () => {
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  // tutup menu saat klik link
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}


// ===== SIMPLE SLIDER (Fokus Layanan) =====
const track = document.getElementById("sliderTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

function getCardWidth() {
  const first = track?.querySelector(".service-card");
  if (!first) return 260;
  const style = window.getComputedStyle(track);
  const gap = parseInt(style.gap || "0", 10);
  return first.getBoundingClientRect().width + gap;
}

function buildDots() {
  if (!track || !dotsWrap) return;
  dotsWrap.innerHTML = "";

  const cardCount = track.querySelectorAll(".service-card").length;
  // tampilan dots: 3 seperti UI (anggap viewport menampilkan ~2 kartu)
  const dotCount = Math.max(3, Math.min(cardCount, 5));

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => {
      const step = getCardWidth();
      track.scrollTo({ left: i * step, behavior: "smooth" });
      setActiveDot(i);
    });
    dotsWrap.appendChild(dot);
  }
}

function setActiveDot(index) {
  if (!dotsWrap) return;
  dotsWrap.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

function syncDotsOnScroll() {
  if (!track || !dotsWrap) return;
  const step = getCardWidth();
  const idx = Math.round(track.scrollLeft / step);
  const dots = dotsWrap.querySelectorAll(".dot");
  if (dots.length) setActiveDot(Math.min(idx, dots.length - 1));
}

if (track && prevBtn && nextBtn) {
  buildDots();

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -getCardWidth(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: getCardWidth(), behavior: "smooth" });
  });

  track.addEventListener("scroll", () => {
    window.requestAnimationFrame(syncDotsOnScroll);
  });

  window.addEventListener("resize", () => {
    buildDots();
    syncDotsOnScroll();
  });
}

// ===== HERO FADE SLIDESHOW =====
const heroSlides = document.querySelectorAll(".hero-bg");
let heroIndex = 0;
const heroInterval = 5000; // 5 detik

if (heroSlides.length > 1) {
  setInterval(() => {
    heroSlides[heroIndex].classList.remove("active");
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add("active");
  }, heroInterval);
}