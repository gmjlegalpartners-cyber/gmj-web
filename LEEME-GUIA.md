# GMJ Legal Partners — Sitio nuevo (BORRADOR)

Esta carpeta (`borrador-sitio-nuevo`) es un **borrador completo y navegable**. **No reemplaza nada en producción** hasta que vos lo apruebes. Podés abrir `index.html` en el navegador para verlo.

---

## 1. Qué cambió respecto al sitio actual

El sitio actual era **una sola página** (one-page). Eso impedía rankear en Google por cada servicio. El nuevo sitio es **multi-página**, con una URL indexable por cada área:

- `index.html` — Home, enfocada en las dos áreas clave (marcas + recuperación de cuentas).
- `registro-de-marcas.html`
- `recuperar-cuenta-instagram.html`
- `recuperar-cuenta-facebook.html`
- `eliminar-resenas-falsas-google.html`
- `eliminar-contenido-ofensivo.html`
- `suplantacion-identidad-digital.html`
- `reputacion-online.html`
- `propiedad-intelectual.html`
- `contratos-y-asesoramiento.html`
- `servicios.html` — índice de servicios.
- `sobre-el-estudio.html` — estudio + socios.
- `contacto.html` — formulario que abre WhatsApp con la consulta lista.
- `blog/` — índice + 3 artículos.

Mejoras de SEO incluidas:

- **Datos estructurados (JSON-LD)** en todas las páginas: `LegalService`, `Service`, `BreadcrumbList`, `FAQPage` y `Article`. Esto ayuda a que aparezcas mejor en Google (incluso con preguntas desplegadas).
- **`sitemap.xml` y `robots.txt`** creados (antes estaban vacíos).
- **Canonical + Open Graph** en cada página (para Google y para que el link se vea bien al compartirlo en WhatsApp/redes).
- **Títulos y meta descripciones** optimizados por palabra clave en cada página.
- **Se quitó el `meta-keywords` sobrecargado** (Google lo ignora desde 2009 y daba señal de amateur).
- **Carrusel de reseñas de Google** en la home (lo que pediste).
- **Menú móvil**, botón flotante de WhatsApp y diseño responsive.

---

## 2. ⚠️ Antes de publicar: 3 cosas obligatorias

### a) Copiar las imágenes
Copiá estos 3 archivos (ya existen en tu sitio actual) **dentro de `borrador-sitio-nuevo/`**:
`logo.jpeg`, `FotoIvo.png`, `FotoNazareno.png`.
Mientras no estén, se verán rotas las imágenes en el borrador, pero el resto funciona.

### b) Cargar las reseñas REALES de Google
El carrusel hoy muestra **textos de ejemplo**. Abrí `assets/js/reviews.js` y reemplazá cada bloque por tus reseñas reales (nombre, estrellas, fecha y texto **tal cual** figuran en Google).
> Importante: no publiques testimonios inventados; deben ser reales y textuales.

**Opción manual (recomendada para empezar):** copiar y pegar 5–8 reseñas reales en ese archivo.

**Opción automática (avanzada):** usar la **Google Places API** (campo `reviews` del endpoint *Place Details*) para traer las reseñas automáticamente. Requiere una API key de Google Cloud y un pequeño backend o función serverless que las sirva, porque la key no debe quedar expuesta en el HTML. Si querés, lo armamos.

### c) Confirmar datos
Revisá teléfono, email y que el `placeid` de Google en los botones de reseñas sea el correcto.

---

## 3. Plan de contenidos (blog) sugerido

El blog es la herramienta #1 para captar tráfico orgánico. Ya dejé 3 artículos. Sugerencia de calendario (1–2 por mes), apuntando a búsquedas reales:

**Recuperación de cuentas / derecho digital**
- "Me suspendieron Instagram sin motivo: cómo apelar"
- "Cómo recuperar una cuenta de Instagram sin el email original"
- "Qué hacer si te están extorsionando con tu cuenta hackeada"
- "Cuenta de empresa de Facebook inhabilitada: pasos para recuperarla"
- "Cómo proteger tus redes para que no te hackeen (checklist)"

**Marcas / propiedad intelectual**
- "¿Conviene registrar marca denominativa o mixta?"
- "Errores comunes al registrar una marca (y cómo evitarlos)"
- "Qué clases de marca necesito según mi rubro"
- "Me llegó una oposición a mi marca: ¿y ahora qué?"
- "Cómo renovar una marca registrada en Argentina"

**Reputación online**
- "Difamación en redes: qué dice la ley argentina"
- "Cómo eliminar un video que me perjudica en YouTube"
- "Perfiles falsos: cómo denunciarlos y darlos de baja"

Consejo: cada artículo debe responder UNA pregunta concreta, enlazar a la página de servicio correspondiente y terminar con un llamado a la consulta.

---

## 4. Checklist de publicación

1. [ ] Copiar `logo.jpeg`, `FotoIvo.png`, `FotoNazareno.png` a la carpeta.
2. [ ] Cargar reseñas reales en `assets/js/reviews.js`.
3. [ ] (Opcional) Crear una imagen `assets/img/og-cover.jpg` (1200×630) para compartir en redes.
4. [ ] Revisar todos los textos legales y datos de contacto.
5. [ ] Subir los archivos al hosting reemplazando el sitio actual.
6. [ ] Dar de alta el sitio en **Google Search Console** y enviar el `sitemap.xml`.
7. [ ] Verificar/optimizar el **Perfil de Empresa en Google** (categorías, descripción, fotos) y pedir reseñas de forma constante.
8. [ ] Conectar el formulario a un backend/servicio (ej. Formspree, o tu email) si querés recibir consultas también por mail además de WhatsApp.

---

## 5. Próximos pasos opcionales (puedo ayudarte)

- Conectar el formulario a un servicio de email.
- Automatizar las reseñas reales con la Google Places API.
- Crear la imagen de portada para redes (Open Graph).
- Escribir más artículos del calendario.
- Optimizar y convertir las imágenes a WebP para que cargue más rápido.
