/* =========================================================
   Formulario de contacto
   Arma el mensaje y abre WhatsApp con la consulta ya redactada.
   No se envía nada a un servidor: el usuario controla el envío.
   ========================================================= */
(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  var WA = '5491173721488';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var get = function (id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    var nombre = get('nombre');
    var email = get('email');
    var telefono = get('telefono');
    var tipo = get('tipo');
    var mensaje = get('mensaje');

    /* Validación mínima, con foco en el primer campo que falta */
    var missing = null;
    if (!nombre) missing = 'nombre';
    else if (!email) missing = 'email';
    else if (!mensaje) missing = 'mensaje';

    if (missing) {
      var el = document.getElementById(missing);
      if (el) {
        el.focus();
        el.reportValidity && el.reportValidity();
      }
      return;
    }

    var partes = [
      'Hola GMJ, soy ' + nombre + '.',
      'Tipo de consulta: ' + tipo + '.',
      mensaje,
      'Mi email: ' + email,
    ];
    if (telefono) partes.push('Mi teléfono: ' + telefono);

    var msg = partes.join(' ');
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
})();
