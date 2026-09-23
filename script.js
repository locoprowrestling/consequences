(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  var targets = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i += 1) targets[i].classList.add('is-visible');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var j = 0; j < entries.length; j += 1) {
      if (entries[j].isIntersecting) {
        entries[j].target.classList.add('is-visible');
        observer.unobserve(entries[j].target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.documentElement.classList.add('js-reveal');
  for (var k = 0; k < targets.length; k += 1) observer.observe(targets[k]);
}());

(function () {
  var carousel = document.getElementById('hero-carousel');
  var controls = document.querySelector('.carousel-controls');
  if (!carousel || !controls) return;

  var hero = carousel.closest('.hero');
  var slides = Array.prototype.slice.call(carousel.querySelectorAll('.hero-slide'));
  var buttons = Array.prototype.slice.call(controls.querySelectorAll('[data-slide]'));
  var toggle = controls.querySelector('.carousel-toggle');
  var announcement = document.getElementById('carousel-announcement');
  var motion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var index = 0;
  var paused = Boolean(motion && motion.matches);
  var focused = false;
  var timer = null;
  var touchStart = null;

  if (slides.length < 2 || slides.length !== buttons.length || !toggle) return;

  function updateToggle() {
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused ? 'Play photo carousel' : 'Pause photo carousel');
  }

  function schedule() {
    window.clearTimeout(timer);
    if (paused || focused || document.hidden) return;
    timer = window.setTimeout(function () { show(index + 1, false); }, 7000);
  }

  function show(next, manual) {
    index = (next + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === index);
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      buttons[i].setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
    if (manual) {
      paused = true;
      if (announcement) announcement.textContent = slides[index].dataset.person + ', photo ' + (index + 1) + ' of ' + slides.length;
      updateToggle();
    }
    schedule();
  }

  buttons.forEach(function (button, i) {
    button.addEventListener('click', function () { show(i, true); });
  });

  toggle.addEventListener('click', function () {
    paused = !paused;
    // An explicit Play request resumes even while this button retains focus.
    if (!paused) focused = false;
    updateToggle();
    schedule();
  });

  controls.addEventListener('keydown', function (event) {
    var next;
    if (event.key === 'ArrowRight') next = index + 1;
    else if (event.key === 'ArrowLeft') next = index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = slides.length - 1;
    else return;
    event.preventDefault();
    show(next, true);
    buttons[index].focus();
  });

  // The photo fills most of the hero, so a resting pointer must not stop autoplay.
  // Pause remains explicit; keyboard focus and hidden tabs still suspend rotation.
  hero.addEventListener('focusin', function () { focused = true; schedule(); });
  hero.addEventListener('focusout', function () {
    window.setTimeout(function () {
      focused = hero.contains(document.activeElement);
      schedule();
    }, 0);
  });
  document.addEventListener('visibilitychange', schedule);

  carousel.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
  });
  carousel.addEventListener('pointerup', function (event) {
    if (!touchStart || event.pointerType !== 'touch') return;
    var dx = event.clientX - touchStart.x;
    var dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1), true);
  });
  carousel.addEventListener('pointercancel', function () { touchStart = null; });

  if (motion && motion.addEventListener) {
    motion.addEventListener('change', function (event) {
      if (event.matches) { paused = true; updateToggle(); schedule(); }
    });
  }

  updateToggle();
  controls.hidden = false;
  schedule();
}());
