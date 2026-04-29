/* ============================================
   DATA CREEK System — Scroll Animations Module
   ============================================ */

(function () {
  'use strict';

  // Reveal elements on scroll
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    var windowHeight = window.innerHeight;

    reveals.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;
      var revealPoint = 120;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  // Run on scroll and on page load
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  // Contact form handling
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(contactForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      // Placeholder: replace with actual form submission logic
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
})();
