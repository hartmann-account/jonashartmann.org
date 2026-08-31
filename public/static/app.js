(function () {
  // Menue auf kleinen Schirmen auf- und zuklappen.
  var toggle = document.getElementById('menu-toggle');
  var overlay = document.getElementById('menu-overlay');
  var sidebar = document.getElementById('sidebar');

  if (toggle && overlay && sidebar) {
    function open() {
      sidebar.classList.remove('translate-x-full');
      sidebar.classList.add('translate-x-0');
      overlay.classList.remove('hidden');
    }
    function close() {
      sidebar.classList.add('translate-x-full');
      sidebar.classList.remove('translate-x-0');
      overlay.classList.add('hidden');
    }
    toggle.addEventListener('click', function () {
      if (sidebar.classList.contains('translate-x-full')) open(); else close();
    });
    overlay.addEventListener('click', close);
  }

  // Lade-Indikator: bei interner Navigation den Balken starten.
  function navStart() {
    var b = document.getElementById('nav-progress');
    if (b) b.classList.add('active');
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#') return;
    if (/^https?:/i.test(href) && a.host !== location.host) return;
    navStart();
  });
  window.addEventListener('pageshow', function () {
    var b = document.getElementById('nav-progress');
    if (b) b.classList.remove('active');
  });
})();
