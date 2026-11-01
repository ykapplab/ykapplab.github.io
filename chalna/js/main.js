/**
 * CHALNA (찰나) Landing Page Interactive Scripts
 * Handles tabs, lightbox modals, theme toggles, FAQ accordions, and smooth animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Light / Dark Mode) ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('chalna_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('chalna_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon';
      themeToggleBtn.setAttribute('title', '다크 모드로 전환');
    } else {
      themeIcon.className = 'fas fa-sun';
      themeToggleBtn.setAttribute('title', '라이트 모드로 전환');
    }
  }

  // --- 2. Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 3. Mobile Navigation Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- 4. Interactive Showcase Tabs ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.showcase-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`panel-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // --- 5. Lightbox Modal for Screenshots ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const triggerElements = document.querySelectorAll('[data-lightbox-src]');

  triggerElements.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox-src');
      const caption = item.getAttribute('data-lightbox-caption') || '';
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --- 6. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // --- 7. Copy Link Share Handler ---
  const shareBtn = document.getElementById('sharePageBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          showToast('링크가 클립보드에 복사되었습니다! 🎉');
        } else {
          showToast('주소창의 링크를 복사해주세요.');
        }
      } catch (err) {
        showToast('링크 복사에 실패했습니다.');
      }
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('chalna-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'chalna-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '2rem';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.background = 'rgba(15, 23, 42, 0.95)';
      toast.style.color = '#f8fafc';
      toast.style.padding = '0.85rem 1.75rem';
      toast.style.borderRadius = '9999px';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(139, 92, 246, 0.4)';
      toast.style.border = '1px solid rgba(139, 92, 246, 0.4)';
      toast.style.fontSize = '0.95rem';
      toast.style.fontWeight = '600';
      toast.style.zIndex = '9999';
      toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      toast.style.pointerEvents = 'none';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 2800);
  }

  // --- 8. Intersection Observer for Fade-in Animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeElements = document.querySelectorAll('.highlight-card, .gallery-card, .trust-banner, .faq-item');
  const appearObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    appearObserver.observe(el);
  });
});
