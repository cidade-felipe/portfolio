/**
 * Portfolio - Felipe Cidade Soares
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  initMobileMenu();
  
  // Smooth scroll for anchor links
  initSmoothScroll();
  
  // Header scroll effect
  initHeaderScroll();
  
  // Fade in animations on scroll
  initScrollAnimations();
  
  // Active nav link based on scroll position
  initActiveNavLink();
});

function getPageLanguage() {
  const lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
  return lang.startsWith('en') ? 'en' : 'pt';
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const topbar = document.querySelector('.topbar');
  let lastScroll = 0;
  
  if (topbar) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add/remove scrolled class
      if (currentScroll > 50) {
        topbar.classList.add('scrolled');
      } else {
        topbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }
}

/**
 * Scroll Animations - Fade in elements
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-card, .feature, .contact-card');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/**
 * Active Nav Link based on scroll position
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
}

/**
 * Copy to Clipboard Functionality
 * Used in contact page
 */
function initCopyToClipboard() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailEl = document.getElementById('emailText');
  const hint = document.getElementById('copyHint');
  
  if (!copyBtn || !emailEl) return;

  const messages = {
    pt: {
      copy: 'Copiar',
      copied: 'Copiado!',
      ready: 'Pronto. Agora é só colar no seu e-mail.',
      tip: 'Dica: cole no seu e-mail e mande uma mensagem rápida com a vaga.',
      manual: 'Não consegui copiar automaticamente. Copie manualmente o e-mail ali em cima.'
    },
    en: {
      copy: 'Copy',
      copied: 'Copied!',
      ready: 'Done. Now paste it into your email.',
      tip: 'Tip: paste it into your email and send a quick message about the role.',
      manual: 'I could not copy automatically. Please copy the email above manually.'
    }
  };

  const t = messages[getPageLanguage()];
  copyBtn.textContent = t.copy;
  
  copyBtn.addEventListener('click', async function() {
    const email = (emailEl.textContent || '').trim();
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      
      copyBtn.textContent = t.copied;
      if (hint) hint.textContent = t.ready;
      
      setTimeout(function() {
        copyBtn.textContent = t.copy;
        if (hint) hint.textContent = t.tip;
      }, 1400);
      
    } catch (err) {
      console.error(err);
      if (hint) hint.textContent = t.manual;
    }
  });
}

// Initialize copy functionality if on contact page
if (document.getElementById('copyEmailBtn')) {
  initCopyToClipboard();
}
