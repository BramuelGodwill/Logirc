/* ============================================
   LOGIRC LTD — APP.JS
   ============================================ */

$(document).ready(function () {

  /* =========================================
     HERO SLIDER
     ========================================= */
  $('.hero-carousel').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    dots: true,
    nav: true,
    navText: [
      "<i class='bx bx-chevron-left'></i>",
      "<i class='bx bx-chevron-right'></i>"
    ],
    animateOut: 'fadeOut',
    animateIn: 'fadeIn'
  });

  /* =========================================
     PORTFOLIO SLIDER
     ========================================= */
  $('.portfolio-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 700,
    dots: false,
    nav: true,
    navText: [
      "<i class='bx bx-left-arrow-alt'></i>",
      "<i class='bx bx-right-arrow-alt'></i>"
    ],
    responsive: {
      0: { items: 1, margin: 12 },
      576: { items: 1, margin: 16 },
      768: { items: 2, margin: 20 },
      992: { items: 3, margin: 24 }
    }
  });

  /* =========================================
     REVIEWS SLIDER
     ========================================= */
  $('.reviews-carousel').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 700,
    dots: false,
    nav: true,
    navText: [
      "<i class='bx bx-left-arrow-alt'></i>",
      "<i class='bx bx-right-arrow-alt'></i>"
    ],
    margin: 20
  });

  /* =========================================
     NAVBAR SCROLL CLASS
     ========================================= */
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }
  });

  /* =========================================
     SMOOTH SCROLL
     ========================================= */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this).attr('href');
    if (target.length > 1 && $(target).length) {
      e.preventDefault();
      var offset = $(target).offset().top - 70;
      $('html, body').animate({ scrollTop: offset }, 600, 'swing');

      // Close mobile nav if open
      var navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show')) {
        $(navCollapse).collapse('hide');
      }
    }
  });

  /* =========================================
     ACTIVE NAV LINK ON SCROLL
     ========================================= */
  $(window).on('scroll', function () {
    var scrollPos = $(window).scrollTop() + 80;
    $('.nav-link[href^="#"]').each(function () {
      var section = $($(this).attr('href'));
      if (section.length) {
        if (
          scrollPos >= section.offset().top &&
          scrollPos < section.offset().top + section.outerHeight()
        ) {
          $('.nav-link').removeClass('active');
          $(this).addClass('active');
        }
      }
    });
  });

  /* =========================================
     CONTACT FORM SUBMISSION
     ========================================= */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    var submitBtn = $(this).find('button[type="submit"]');
    var originalText = submitBtn.html();

    // Loading state
    submitBtn.html('<i class="bx bx-loader-alt bx-spin"></i> Sending...').prop('disabled', true);

    // Simulate send delay
    setTimeout(function () {
      // Hide modal
      var modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
      if (modal) modal.hide();

      // Reset form
      $('#contactForm')[0].reset();
      submitBtn.html(originalText).prop('disabled', false);

      // Show success toast / alert
      showToast('Message sent! We\'ll get back to you shortly.', 'success');
    }, 1500);
  });

  /* =========================================
     TOAST NOTIFICATION
     ========================================= */
  function showToast(message, type) {
    var toastHtml = `
      <div id="logirc-toast" style="
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        background: ${type === 'success' ? '#e8b84b' : '#dc3545'};
        color: ${type === 'success' ? '#0a0a0a' : '#fff'};
        padding: 14px 24px;
        border-radius: 12px;
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      ">
        <i class='bx bx-check-circle' style="font-size:1.3rem;"></i>
        ${message}
      </div>
    `;

    $('body').append(toastHtml);

    setTimeout(function () {
      $('#logirc-toast').css({ transform: 'translateY(0)', opacity: '1' });
    }, 50);

    setTimeout(function () {
      $('#logirc-toast').css({ transform: 'translateY(20px)', opacity: '0' });
      setTimeout(function () { $('#logirc-toast').remove(); }, 400);
    }, 4000);
  }

  /* =========================================
     SCROLL REVEAL ANIMATION
     ========================================= */
  function revealOnScroll() {
    var scrollTop = $(window).scrollTop() + $(window).height() - 80;
    $('.service-card, .blog-card, .team-card, .pricing-card, .info-box').each(function () {
      if ($(this).offset().top < scrollTop) {
        $(this).css({
          opacity: '1',
          transform: 'translateY(0)'
        });
      }
    });
  }

  // Initial CSS for animated elements
  $('.service-card, .blog-card, .team-card, .pricing-card, .info-box').css({
    opacity: '0',
    transform: 'translateY(30px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease'
  });

  $(window).on('scroll', revealOnScroll);
  revealOnScroll(); // Run once on load

});
