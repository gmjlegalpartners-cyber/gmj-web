/* =========================================================
   GMJ LEGAL PARTNERS — JS principal
   - Menú móvil
   - Carrusel de reseñas de Google (datos en reviews.js)
   - Año dinámico en footer
   ========================================================= */
(function(){
  "use strict";

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      links.classList.toggle('open');
      var open = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function(e){
      if(e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  /* ---- Año dinámico ---- */
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  /* ---- Carrusel de reseñas ---- */
  var track = document.getElementById('reviewsTrack');
  if(track){
    var reviewsUrl = window.GMJ_REVIEWS_URL || 'https://www.google.com/maps';
    var sumEl = document.getElementById('reviewsSummary');
    var initials = function(n){return n.split(' ').map(function(w){return w[0]||'';}).slice(0,2).join('').toUpperCase();};

    function shuffle(arr){
      var a = arr.slice();
      for(var i = a.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    function render(list, meta){
      var data = shuffle(list);
      if(!data.length) return;

      if(sumEl){
        var avg = meta && meta.rating ? Number(meta.rating).toFixed(1)
                : (data.reduce(function(s,r){return s + r.rating;},0)/data.length).toFixed(1);
        var count = meta && meta.total ? meta.total : data.length;
        sumEl.innerHTML =
          '<span class="big">'+avg+'</span>' +
          '<span class="stars" aria-hidden="true">★★★★★</span>' +
          '<span class="muted">Basado en '+count+' reseñas verificadas en Google</span>';
      }

      track.innerHTML = data.map(function(r){
        var stars = '★★★★★'.slice(0, r.rating) + '☆☆☆☆☆'.slice(0, 5 - r.rating);
        return ''+
          '<a class="review" href="'+reviewsUrl+'" target="_blank" rel="noopener" aria-label="Ver reseña de '+r.name+' en Google">'+
            '<div class="stars" aria-label="'+r.rating+' de 5 estrellas">'+stars+'</div>'+
            '<p class="text">“'+r.text+'”</p>'+
            '<div class="who">'+
              '<span class="avatar" aria-hidden="true">'+initials(r.name)+'</span>'+
              '<span><span class="name">'+r.name+'</span><br><span class="src">Reseña de Google'+(r.date?' · '+r.date:'')+'</span></span>'+
              '<span class="gicon" aria-hidden="true"><b>G</b><b>o</b><b>o</b><b>g</b><b>l</b><b>e</b></span>'+
            '</div>'+
          '</a>';
      }).join('');

      var prev = document.getElementById('revPrev');
      var next = document.getElementById('revNext');
      var step = function(){var c = track.querySelector('.review'); return c ? c.offsetWidth + 22 : 360;};
      if(prev) prev.addEventListener('click', function(){track.scrollBy({left:-step(),behavior:'smooth'});});
      if(next) next.addEventListener('click', function(){track.scrollBy({left: step(),behavior:'smooth'});});

      var auto = setInterval(function(){
        if(track.scrollLeft + track.clientWidth >= track.scrollWidth - 5){
          track.scrollTo({left:0,behavior:'smooth'});
        }else{
          track.scrollBy({left:step(),behavior:'smooth'});
        }
      }, 5000);
      ['mouseenter','touchstart','pointerdown'].forEach(function(ev){
        track.addEventListener(ev, function(){clearInterval(auto);}, {passive:true});
      });
    }

    // 1) Intentar reseñas REALES desde la función serverless (/api/google-reviews)
    // 2) Si no hay endpoint o falla (ej. abriendo el sitio localmente), usar el archivo
    var fallback = window.GMJ_REVIEWS || [];
    fetch('/api/google-reviews', {headers:{'Accept':'application/json'}})
      .then(function(res){ return res.ok ? res.json() : null; })
      .then(function(json){
        if(json && json.reviews && json.reviews.length){
          render(json.reviews, json);
        }else{
          render(fallback);
        }
      })
      .catch(function(){ render(fallback); });
  }

  /* ---- Shorts de YouTube (recuperación de cuentas), 3 al azar por carga ---- */
  var shortsGrid = document.getElementById('shortsGrid');
  if(shortsGrid && window.GMJ_SHORTS && window.GMJ_SHORTS.length){
    var vids = window.GMJ_SHORTS.slice();
    for(var i = vids.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var t = vids[i]; vids[i] = vids[j]; vids[j] = t;
    }
    var pick = vids.slice(0, 3);
    shortsGrid.innerHTML = pick.map(function(v){
      return ''+
        '<div class="card" style="padding:0;overflow:hidden">'+
          '<div style="aspect-ratio:9/16;background:#000">'+
            '<iframe width="100%" height="100%" style="border:0;display:block" '+
            'src="https://www.youtube.com/embed/'+v.id+'" title="'+(v.title||'Short de YouTube').replace(/"/g,'&quot;')+'" '+
            'loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
          '</div>'+
          '<div style="padding:18px"><h3 style="font-size:1.05rem;margin:0">'+(v.title||'')+'</h3></div>'+
        '</div>';
    }).join('');
  }
})();
