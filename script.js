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

  for (var k = 0; k < targets.length; k += 1) observer.observe(targets[k]);
}());
