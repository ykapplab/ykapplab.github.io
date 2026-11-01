/* ==========================================================
   소담달력 (Sodam Calendar) - 공식 랜딩페이지 인터랙션 스크립트
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Feature Showcase Tabs
  const tabs = document.querySelectorAll('.showcase-tab');
  const tabImages = document.querySelectorAll('.tab-image');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      // Update tabs active state
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Update images active state
      tabImages.forEach((img) => {
        img.classList.remove('active');
        if (img.getAttribute('id') === targetId) {
          img.classList.add('active');
        }
      });
    });
  });

  // 3. Screenshots Carousel
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    const cards = track.querySelectorAll('.carousel-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    const cardWidth = 320 + 24; // width + gap

    // Create indicator dots
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
      // Calculate max scrollable index based on visible width
      const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
      let targetX = currentIndex * cardWidth;
      if (targetX > maxScroll) targetX = maxScroll;
      if (targetX < 0) targetX = 0;

      track.style.transform = `translateX(-${targetX}px)`;

      // Update active dot
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, totalCards - 1));
      updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalCards - 1;
      }
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalCards - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });

    // Touch & Drag Support
    let isDown = false;
    let startX = 0;
    let currentTranslate = 0;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX;
      track.style.transition = 'none';
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDown) return;
      isDown = false;
      track.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      const diffX = e.pageX - startX;
      if (diffX < -50) {
        nextBtn.click();
      } else if (diffX > 50) {
        prevBtn.click();
      } else {
        updateCarousel();
      }
    });

    // Window resize handler
    window.addEventListener('resize', updateCarousel);
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((i) => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    // Close menu when clicking links
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }
});
