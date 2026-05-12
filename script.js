// The Connate — site-wide interactivity.
// All capabilities are feature-detected; the page works without JS.

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initMobileNav();
    initScrollReveal();
    initHeaderScrollState();
    initStickyCta();
  });

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.main-nav ul');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.contains('is-open');
      setOpen(!isOpen);
    });

    // Close the drawer when any nav link is clicked.
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    targets.forEach(function (el) { io.observe(el); });
  }

  function initHeaderScrollState() {
    const header = document.querySelector('header.site-header');
    if (!header) return;

    let ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  function initStickyCta() {
    const sticky = document.querySelector('.sticky-cta');
    if (!sticky) return;
    if (document.body.hasAttribute('data-no-sticky-cta')) return;

    const trigger = document.querySelector('.hero') || document.querySelector('.page-header');
    if (!trigger || !('IntersectionObserver' in window)) {
      // Without a trigger or IO, keep the sticky CTA hidden; CSS controls visibility.
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Show the sticky CTA once the trigger has scrolled out of view.
        sticky.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    io.observe(trigger);
  }
})();
