# GMJ Legal Partners — Sitio web

Sitio estático (HTML + CSS + JS, sin frameworks) enfocado en **recuperación de cuentas de Instagram por la vía legal**.

Jerarquía del contenido: **Instagram 80% · derecho digital 15% · marcas 5%**.

---

## ⚠️ Antes de publicar: no borres la carpeta `api/`

El sitio actual en Vercel tiene una función serverless en **`/api/google-reviews`** que trae las reseñas reales de Google (5.0 sobre 52 reseñas). **Ese archivo no está en este repo** y hay que conservarlo.

Cuando subas esta versión:

1. **Copiá la carpeta `api/` del proyecto actual** a este proyecto antes de desplegar.
2. Si no lo hacés, el carrusel no se rompe: muestra las reseñas curadas de `assets/js/reviews.js`, pero el resumen diría "11 reseñas" en vez de las 52 reales.

El resto de la configuración de Vercel (dominio, variables de entorno de la API de Google) queda igual.

### Cómo funcionan las reseñas (importante)

La API de Google Places **solo devuelve 5 reseñas de las 52**, y las elige Google. Hoy esas 5 son casi todas de marcas, así que las de recuperación de cuentas no aparecían nunca.

Por eso el carrusel **combina dos fuentes**:

1. Las que devuelve la API (en vivo, con su fecha relativa).
2. Una lista **curada de reseñas reales** copiadas del perfil, en `assets/js/reviews.js` — hoy 7 sobre recuperación de cuentas.

`main.js` las junta, elimina duplicados y muestra primero las de cuentas. El resumen ("5.0 · 52 reseñas") sigue viniendo del dato real de la API.

**Para sumar una reseña nueva:** copiala textual del perfil y agregala a `assets/js/reviews.js`. Poné las de cuentas en el primer bloque. No pongas fecha: Google las muestra en relativo ("hace 2 días") y, congelada en el archivo, envejece mal.

---

## Cómo editar el sitio

Las páginas `.html` de la raíz **se generan automáticamente**: no las edites a mano, porque se sobrescriben.

El contenido vive en:

| Qué querés cambiar | Archivo |
|---|---|
| Teléfono, email, links, rating, link de pago | `build/site.js` (objeto `SITE`) |
| Menú de navegación | `build/site.js` (`NAV`) |
| Lista de servicios | `build/site.js` (`SERVICES`) |
| Home | `build/pages/home.js` |
| Landing de Instagram | `build/pages/instagram.js` |
| Resto de servicios (textos y FAQs) | `build/pages/services.js` |
| Servicios / Estudio / Contacto | `build/pages/static.js` |
| Blog | `build/pages/blog.js` |
| Diseño (colores, tipografía, espaciados) | `assets/css/styles.css` |
| Videos de YouTube | `assets/js/videos.js` |
| Reseñas de respaldo | `assets/js/reviews.js` |

Después de cualquier cambio:

```bash
node build/build.js
```

Eso regenera las 18 páginas, el `sitemap.xml` y el `robots.txt`.

### Ver el sitio localmente

```bash
node build/serve.js
```

Y abrís http://localhost:4321

> Nota: en local, las reseñas salen del archivo de respaldo, porque `/api/google-reviews` solo existe en Vercel.

---

## Estructura

```
├── build/              ← el generador (no se publica)
│   ├── site.js         ← configuración, datos y plantillas
│   ├── build.js        ← genera las páginas
│   ├── serve.js        ← servidor local de previsualización
│   └── pages/          ← contenido de cada página
├── assets/
│   ├── css/styles.css  ← sistema de diseño
│   ├── js/             ← main, reviews, videos, contact
│   └── img/og-cover.jpg← imagen de vista previa en redes
├── *.html              ← generadas — no editar a mano
├── blog/               ← generadas — no editar a mano
├── sitemap.xml         ← generado
└── robots.txt          ← generado
```

---

## Decisiones de diseño

- **Dark-first navy + acento índigo/cyan.** Autoridad de estudio jurídico, pero con lenguaje visual digital. Todo el texto cumple contraste WCAG AA (el principal llega a 16.9:1).
- **Tipografía:** Sora (títulos) + Inter (texto). Reemplaza a Fraunces, que leía como estudio tradicional.
- **Un solo origen de verdad.** El sitio anterior repetía el header y el footer en 17 archivos; cambiar un teléfono obligaba a tocar 17 páginas. Ahora se cambia en un solo lugar.
- **Selector "¿Qué te pasó?"** en la home: el visitante se autoidentifica en segundos, que es como realmente llega la gente que perdió una cuenta.
- **Sección "vía legal vs. atajos":** es el principal diferenciador frente a los "gestores" que prometen milagros, y sostiene el precio.
- **Una sola acción principal: WhatsApp.** Como el formulario de contacto también termina abriendo WhatsApp, tener "Enviar consulta" al lado de "WhatsApp" era ofrecer el camino largo al mismo lugar. Ahora el botón es uno solo y el formulario queda como alternativa en texto, para quien prefiere escribir con calma o usar mail.
- **Las reseñas de recuperación de cuentas van primero** en el carrusel (`priorizar()` en `assets/js/main.js`), porque son las que le importan a quien llega buscando eso. Dentro de cada grupo se siguen rotando al azar, así la sección sigue siendo dinámica.
- **Los videos son solo de recuperación de cuentas.** El canal tiene 29 Shorts, 8 de ellos sobre marcas: esos quedan afuera a propósito para no diluir el posicionamiento. De los 21 restantes se muestran 3 al azar en cada carga.

## Qué se corrigió del sitio anterior

- La sección de videos **nunca podía renderizar**: `main.js` cargaba antes que `videos.js`, así que los datos no existían cuando el script los buscaba.
- **`og-cover.jpg` daba 404**: al compartir el sitio por WhatsApp o Instagram no aparecía ninguna imagen. Ahora existe.
- El post **"Oposición de marca en el INPI" faltaba en el `sitemap.xml`** (estaba enlazado pero no indexable vía sitemap).
- La home y la página de Instagram tenían **el mismo `<title>`**, compitiendo entre sí en Google.
- Títulos y descripciones **excedían el largo** que muestra Google y se cortaban.

## Google Ads: cómo anunciar sin que te suspendan

Lo más importante que hay que entender: **Google trata distinto las palabras clave y el texto del anuncio.**

- **Palabras clave: sin restricción.** Google no investiga el uso de marcas ajenas como keyword. Podés pujar tranquilo por "recuperar cuenta instagram", "instagram bloqueado", etc. Ahí está la demanda y no hay que resignarla.
- **Texto del anuncio: restringido.** Si Meta reclama, Google restringe el uso de "Instagram" en los títulos y descripciones, y **la restricción se aplica a todo el dominio**, no a un anuncio suelto.

**Conclusión práctica:** pujá por las keywords con "Instagram", pero **escribí los anuncios sin nombrar la marca**. Se capta la misma búsqueda sin exponerse:

- ✅ "Abogados en Derecho Digital" · "¿Te suspendieron la cuenta?" · "Recuperá tu cuenta por vía legal" · "Cuentas bloqueadas: acción legal"
- ❌ "Recuperamos tu Instagram" · "Expertos en Instagram"

Ojo con estos detalles, que también cuentan como texto del anuncio:
- **Desactivá la inserción dinámica de palabras clave (DKI)**: te mete "Instagram" en el título automáticamente y te expone sin que te des cuenta.
- **Sitelinks, callouts y extensiones** cuentan igual que el título.
- **Si usás extensión de ubicación**, aparece el nombre de tu ficha de Google — ver el punto de abajo.

### Lo que ya está resuelto en el sitio

- **Aviso de no afiliación en el pie de las 18 páginas.** Es la defensa principal frente a la política de *Misrepresentation* (Google prohíbe dar a entender que te respalda otra marca). Aclara que somos independientes, que no hay relación con Meta ni Google, que las marcas son de sus dueños y **que no garantizamos resultados**.
- **Sacamos los logos de Instagram y Facebook de las tarjetas de servicio.** Eran marca ajena usada como ícono propio y reforzaban la idea de afiliación. Se reemplazaron por íconos neutrales. Los logos del pie **sí** se mantienen: enlazan a nuestros propios perfiles, que es uso permitido y estándar.
- **La página de reseñas falsas aclara que no manipulamos reseñas.** Google prohíbe expresamente los servicios que manipulan reseñas (*Enabling dishonest behavior*). El texto deja explícito que solo se impugna lo que viola las políticas o la ley, y que **las críticas genuinas no se tocan**.
- **El texto ya dice que no usamos hackers ni "contactos internos".** Además de ser cierto, nos separa de la categoría que Google sí prohíbe (servicios de hacking).

## Pendiente / a revisar por el estudio

- **⚠️ El nombre de la ficha de Google es un riesgo.** Hoy es "GMJ Abogados - Recuperación de Cuentas de Instagram y Marcas". Las normas de Perfil de Empresa exigen que el nombre sea **el nombre real del negocio**, sin descriptores ni palabras clave agregadas. Eso se considera *name stuffing* y puede provocar la **suspensión de la ficha**: te llevaría puestas las 52 reseñas y el 5.0, que son el activo de confianza más valioso que tienen. Además, si usás extensión de ubicación en Ads, ese nombre aparece en el anuncio y te mete "Instagram" en el texto por la ventana de atrás. Conviene evaluar dejarlo como "GMJ Legal Partners" o "GMJ Abogados".

- **Queda una cita legal en el blog de marcas** (`blog/oposicion-de-marca-inpi-argentina.html` menciona la Ley 27.444). Las citas se sacaron de todo lo de recuperación de cuentas para no darle el mapa a la competencia. Esta quedó porque es de marcas —otro público, y ahí la precisión suma autoridad—, pero si querés el mismo criterio en todo el sitio, se saca y listo.
- **La lista curada de reseñas hay que mantenerla a mano.** Es el precio de esquivar el límite de 5 de la API. Cuando un cliente de recuperación de cuentas deje una reseña nueva, copiala a `assets/js/reviews.js`. El link directo para pedirla está en la home y en `SITE.writeReview`.
- La reseña de "Lucas Gomez Mele" **ya está filtrada** del carrusel (`GMJ_REVIEWS_EXCLUIR` en `assets/js/reviews.js`). Sigue existiendo en el perfil de Google; solo no se destaca acá. Para excluir otra, agregá el nombre a esa lista: se filtra tanto de la lista curada como de lo que devuelva la API.

- **Revisar el contenido jurídico** de la sección "Marco legal" en `recuperar-cuenta-instagram.html` (arts. 153 bis, 168 y 172 CP, Ley 26.388, Ley 25.326) y del blog. Está redactado en términos generales y orientativos, pero la palabra final es de ustedes.
- Las **fotos de los socios** se reutilizaron del sitio anterior.
- Si el estudio deja de ofrecer algún servicio, se saca de `SERVICES` en `build/site.js`.
