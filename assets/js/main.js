/* =============================================================
   GMJ Legal Partners — JS del sitio
   Sin dependencias. Todo degrada con elegancia si algo falla.
   ============================================================= */
(function () {
  'use strict';

  /* ---------- Año del footer ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Header: sombra al hacer scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menú mobile ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    /* Un único lugar que cambia el estado: así aria-expanded y aria-label
       nunca quedan desincronizados (un lector de pantalla anunciaría mal). */
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };

    toggle.addEventListener('click', function () {
      setMenu(!links.classList.contains('open'));
    });

    /* Cerrar al navegar */
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });

    /* Cerrar con Escape y devolver el foco al botón */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Animación de entrada ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reveals.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('in');
    });
  }

  /* =============================================================
     Carrusel de reseñas de Google
     1) Intenta las reseñas REALES desde /api/google-reviews
     2) Si el endpoint no está o falla (ej. abriendo el sitio
        localmente), usa los datos de assets/js/reviews.js
     ============================================================= */
  var track = document.getElementById('reviewsTrack');
  if (track) {
    var reviewsUrl = window.GMJ_REVIEWS_URL || 'https://www.google.com/maps';
    var sumEl = document.getElementById('reviewsSummary');

    var initials = function (n) {
      return n
        .split(' ')
        .map(function (w) {
          return w[0] || '';
        })
        .slice(0, 2)
        .join('')
        .toUpperCase();
    };

    var escapeHtml = function (s) {
      var d = document.createElement('div');
      d.textContent = s == null ? '' : String(s);
      return d.innerHTML;
    };

    var shuffle = function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i];
        a[i] = a[j];
        a[j] = t;
      }
      return a;
    };

    /* Las reseñas que hablan de recuperación de cuentas van primero: son las
       que le importan a quien llega buscando eso. El resto va después.
       Dentro de cada grupo se sigue rotando al azar en cada carga. */
    var TEMA_CUENTAS = /(instagram|facebook|cuenta|cuentas|perfil|hacke|bloque|suspend|recuper|robar|robada|meta)/i;

    var priorizar = function (list) {
      var relevantes = [];
      var resto = [];
      list.forEach(function (r) {
        (TEMA_CUENTAS.test(r.text || '') ? relevantes : resto).push(r);
      });
      return shuffle(relevantes).concat(shuffle(resto));
    };

    /* La API de Google Places devuelve como máximo 5 reseñas y las elige ella,
       así que las de recuperación de cuentas pueden no venir nunca. Combinamos
       lo que devuelve la API con la lista curada de assets/js/reviews.js
       (reseñas reales del perfil) y sacamos los duplicados. */
    var clave = function (r) {
      return (
        String(r.name || '').toLowerCase().replace(/\s+/g, ' ').trim() +
        '|' +
        String(r.text || '').toLowerCase().replace(/[^a-záéíóúñ0-9]/gi, '').slice(0, 40)
      );
    };

    /* Nombres que no queremos destacar en el carrusel, vengan de la API
       o de la lista curada (ver assets/js/reviews.js) */
    var excluidos = (window.GMJ_REVIEWS_EXCLUIR || []).map(function (n) {
      return String(n).toLowerCase().replace(/\s+/g, ' ').trim();
    });
    var estaExcluida = function (r) {
      var n = String(r.name || '').toLowerCase().replace(/\s+/g, ' ').trim();
      return excluidos.indexOf(n) !== -1;
    };

    var combinar = function (apiList, curadas) {
      var vistas = {};
      var out = [];
      apiList.concat(curadas).forEach(function (r) {
        if (!r || !r.text) return;
        if (estaExcluida(r)) return;
        var k = clave(r);
        if (vistas[k]) return;
        vistas[k] = true;
        out.push(r);
      });
      return out;
    };

    function render(list, meta) {
      var data = priorizar(list);
      if (!data.length) return;

      if (sumEl) {
        var avg =
          meta && meta.rating
            ? Number(meta.rating).toFixed(1)
            : (
                data.reduce(function (s, r) {
                  return s + r.rating;
                }, 0) / data.length
              ).toFixed(1);
        var count = meta && meta.total ? meta.total : data.length;
        sumEl.innerHTML =
          '<span class="big">' + avg + '</span>' +
          '<span class="stars" aria-hidden="true">★★★★★</span>' +
          '<span class="muted">Basado en ' + count + ' reseñas verificadas en Google</span>';
      }

      track.innerHTML = data
        .map(function (r) {
          var rating = Math.max(0, Math.min(5, r.rating | 0));
          var stars = '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating);
          var name = escapeHtml(r.name);
          return (
            '<a class="review" href="' + reviewsUrl + '" target="_blank" rel="noopener" aria-label="Ver reseña de ' + name + ' en Google">' +
              '<div class="stars" aria-label="' + rating + ' de 5 estrellas">' + stars + '</div>' +
              '<p class="text">“' + escapeHtml(r.text) + '”</p>' +
              '<div class="who">' +
                '<span class="avatar" aria-hidden="true">' + escapeHtml(initials(r.name)) + '</span>' +
                '<span><span class="name">' + name + '</span><br><span class="src">Reseña de Google' + (r.date ? ' · ' + escapeHtml(r.date) : '') + '</span></span>' +
                '<span class="gicon" aria-hidden="true"><b>G</b><b>o</b><b>o</b><b>g</b><b>l</b><b>e</b></span>' +
              '</div>' +
            '</a>'
          );
        })
        .join('');

      var step = function () {
        var c = track.querySelector('.review');
        return c ? c.offsetWidth + 18 : 360;
      };
      var prev = document.getElementById('revPrev');
      var next = document.getElementById('revNext');
      if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
      if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });

      /* Auto-avance, que se detiene apenas el usuario interactúa */
      if (!reduce) {
        var auto = setInterval(function () {
          if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            track.scrollBy({ left: step(), behavior: 'smooth' });
          }
        }, 5000);
        ['mouseenter', 'touchstart', 'pointerdown', 'focusin'].forEach(function (ev) {
          track.addEventListener(ev, function () { clearInterval(auto); }, { passive: true });
        });
      }
    }

    var curadas = window.GMJ_REVIEWS || [];
    fetch('/api/google-reviews', { headers: { Accept: 'application/json' } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (json) {
        if (json && json.reviews && json.reviews.length) {
          /* La meta (5.0 sobre 52) viene de la API: es el dato real del perfil */
          render(combinar(json.reviews, curadas), json);
        } else {
          render(combinar([], curadas), null);
        }
      })
      .catch(function () { render(curadas, null); });
  }

  /* =============================================================
     Shorts de YouTube — 3 al azar, con carga diferida
     ============================================================= */
  var grid = document.getElementById('videoGrid');
  if (grid && window.GMJ_SHORTS && window.GMJ_SHORTS.length) {
    var pick = window.GMJ_SHORTS.slice();
    for (var i = pick.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = pick[i]; pick[i] = pick[j]; pick[j] = t;
    }
    grid.innerHTML = pick
      .slice(0, 3)
      .map(function (v) {
        return (
          '<article class="video-card">' +
            '<div class="frame">' +
              '<iframe src="https://www.youtube-nocookie.com/embed/' + v.id + '" title="' + v.title.replace(/"/g, '&quot;') + '" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
            '</div>' +
            '<div class="title">' + v.title + '</div>' +
          '</article>'
        );
      })
      .join('');
  }
})();
