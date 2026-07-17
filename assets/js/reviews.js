/* =========================================================
   RESEÑAS DE GOOGLE
   ---------------------------------------------------------
   El perfil de Google del estudio tiene 52 reseñas, pero la API
   de Google Places SOLO DEVUELVE 5, y las elige Google. Hoy esas
   5 son casi todas de marcas, así que las de recuperación de
   cuentas —que son las que le importan a quien llega al sitio—
   nunca aparecían.

   Por eso este archivo NO es solo un respaldo: es una lista
   CURADA de reseñas reales copiadas del perfil de Google.
   main.js las combina con las que devuelve la API, elimina
   duplicados y muestra primero las que hablan de cuentas.

   ⚠️ Todas las reseñas de acá abajo son REALES y están copiadas
   textualmente del perfil. No agregues testimonios inventados.

   Sobre las fechas: se omiten a propósito. Google las muestra
   en relativo ("hace 2 días") y, congeladas en un archivo,
   envejecen mal y mienten. Las tarjetas quedan como
   "Reseña de Google", sin fecha.

   Para sumar una reseña nueva: copiala textual del perfil
   (https://search.google.com/local/reviews?placeid=ChIJ15sz_y6o4osRy7QSwBskBtg)
   ========================================================= */

/* -----------------------------------------------------------
   Reseñas a NO mostrar en el carrusel.
   Se filtran por nombre, sin importar de dónde vengan: tanto de
   la lista de abajo como de las que devuelve la API de Google
   (que las elige Google y pueden cambiar solas).
   La reseña sigue existiendo en el perfil; solo no se destaca acá.
   ----------------------------------------------------------- */
window.GMJ_REVIEWS_EXCLUIR = [
  'Lucas Gomez Mele', // comparte apellido con un socio: mejor no destacarla
];

/* Enlace al perfil real de Google (cada tarjeta lleva acá) */
window.GMJ_REVIEWS_URL =
  'https://www.google.com/maps/place/GMJ+Abogados+-+REGISTRO+DE+MARCAS/@-38.45155,-63.5989957,4z/data=!3m1!4b1!4m6!3m5!1s0x8ae2a82eff339bd7:0xd806241bc212b4cb!8m2!3d-38.45155!4d-63.5989957!16s%2Fg%2F11xvdwn103?entry=ttu';

window.GMJ_REVIEWS = [
  /* ---------- Recuperación de cuentas (se muestran primero) ---------- */
  {
    name: 'priscila aguirres',
    rating: 5,
    text: 'Excelente atención y profesionalismo. Lograron recuperar nuestras cuentas de trabajo y nos acompañaron durante todo el proceso con mucha claridad y compromiso. Los recomiendo totalmente a cualquier persona o empresa que tenga problemas con cuentas suspendidas o bloqueadas. Muchas gracias 🙌',
  },
  {
    name: 'Evelyn Schuler',
    rating: 5,
    text: 'Super recomendables. Muy responsables y atentos durante todo el proceso. Gracias a su trabajo pude recuperar la página de Instagram de mi emprendimiento, algo que parecía muy difícil de resolver. Siempre estuvieron disponibles para responder mis dudas y acompañarme en cada paso. Los recomiendo totalmente!',
  },
  {
    name: 'iphone quilsur',
    rating: 5,
    text: 'Me recuperaron mi cuenta de Instagram de tienda de telefonía celular. Atentos en todo momento sin dejar pasar ninguna duda de parte mía. Un genio Ivo y su socio. Gracias! 🙌🏽',
  },
  {
    name: 'Familia Bozo',
    rating: 5,
    text: 'Mi cuenta de Instagram fue suspendida de un día para el otro. Nazareno tomó el caso y en el proceso lograron destrabar la situación. Hoy ya la tengo activa de nuevo. Muy conforme.',
  },
  {
    name: 'Nazareth Trujillo',
    rating: 5,
    text: 'Me recuperaron la cuenta de Facebook de mi negocio que había sido bloqueada injustamente. Nazareno gestiono mediación con Meta y lograron una solución. Muy recomendables!!!',
  },
  {
    name: 'Elias Estelles',
    rating: 5,
    text: 'Excelente asesoramiento legal. Registré mi marca sin problemas y además me ayudaron con una cuenta de Instagram bloqueada. Los chicos se encargaron de todo.',
  },

  /* ---------- Generales y de marcas (van después) ---------- */
  {
    name: 'Beto Camacho',
    rating: 5,
    text: 'Excelentes profesionales. Me explicaron todo con claridad, respondieron cada duda y me dieron mucha tranquilidad durante el proceso. Se nota que trabajan con responsabilidad. Los recomiendo totalmente, confiaría en ellos nuevamente.',
  },
  {
    name: 'Carlos Bouvet',
    rating: 5,
    text: 'La verdad, un lujo. Desde el primer contacto fueron prácticos, rápidos y muy profesionales. Me explicaron todo de forma clara y el proceso fue súper ágil. Da tranquilidad trabajar con gente así. Más que recomendados.',
  },
  {
    name: 'Claudio Fernandez',
    rating: 5,
    text: 'Desde el primer contacto me asesoraron de manera muy profesional, contacto permanente despejando cada duda que se planteaba. Hice el tramite de registrar mi marca de forma segura y sencilla. Muy recomendable profesionalme, excelente trato.',
  },
  {
    name: 'Rocío Laballós',
    rating: 5,
    text: 'Atentos, profesionales y con buena onda desde el minuto uno. Te explican todo con paciencia, no te marean con palabras raras de abogado y encima resuelven rápido. Asi da gusto meterse en el mundo de las marcas. Ya estoy pensando qué otra idea registrar solo para volver a atenderme con ellos',
  },
];
