# Conectar las reseñas reales de Google (automático)

El sitio ya está preparado: el carrusel intenta traer las reseñas **reales** desde una función serverless (`/api/google-reviews`) y, si no están disponibles, usa las del archivo `assets/js/reviews.js` como respaldo. Las muestra en **orden aleatorio** y cada tarjeta enlaza a tu ficha de Google.

Solo falta que generes una **API key de Google** y la cargues en Vercel. Yo no necesito tu usuario ni contraseña.

---

## Resumen de costo
- Google da un **tope gratuito mensual**. Con el caché de 6 horas que ya tiene la función, el sitio consulta a Google muy pocas veces por mes, **muy por debajo del tope → costo $0**.
- Google igualmente te exige **activar la facturación con una tarjeta** en el proyecto (no te cobran si no superás el tope, cosa que no va a pasar).
- Para evitar sustos, en el paso 4 te dejo cómo ponerle un **tope de presupuesto y alertas**.

---

## Paso 1 — Crear el proyecto y la API key
1. Entrá a https://console.cloud.google.com/ con la cuenta de Google del estudio.
2. Creá un proyecto nuevo (ej. "GMJ Web").
3. Activá la facturación (menú **Billing** → asociar una tarjeta).
4. Andá a **APIs y servicios → Biblioteca**, buscá **"Places API (New)"** y tocá **Habilitar**.
5. Andá a **APIs y servicios → Credenciales → Crear credenciales → Clave de API**. Copiá la clave.

## Paso 2 — Restringir la API key (importante por seguridad)
En la clave recién creada:
- **Restricción de API:** limitala solo a **Places API (New)**.
- (La clave vive en el servidor de Vercel, no en el navegador, así que no se expone.)

## Paso 3 — Cargar la clave en Vercel
1. En tu proyecto de Vercel: **Settings → Environment Variables**.
2. Agregá:
   - `GOOGLE_MAPS_API_KEY` = (la clave que copiaste)
   - `GOOGLE_PLACE_ID` = `ChIJ15sz_y6o4osRy7QSwBskBtg`  *(ya es el de tu ficha; podés omitirla)*
3. Hacé un **redeploy** del proyecto para que tome las variables.

> Importante: la carpeta `api/` (con `google-reviews.js`) tiene que estar en el proyecto que despliega Vercel. Si el sitio público se sube a Vercel, el endpoint queda automáticamente en `https://tu-dominio/api/google-reviews`.

## Paso 4 — (Recomendado) Tope de presupuesto y alertas
En **Billing → Budgets & alerts** creá un presupuesto de, por ejemplo, **US$1** con alertas al 50% y 100%. Así te avisan ante cualquier consumo inesperado.

---

## Cómo verificar que funciona
- Entrá a `https://tu-dominio/api/google-reviews`: deberías ver un JSON con tus reseñas.
- En la home, el carrusel debería mostrar las reseñas reales (máx. 5, que es el límite de Google).

## Cosas para tener en cuenta
- **Google devuelve hasta 5 reseñas** por consulta (es un límite de Google, no del sitio).
- Si querés mostrar **más de 5**, lo mejor es el modo manual: pegar reseñas reales en `assets/js/reviews.js`. Incluso podés combinar: las 5 de la API y, si falla, el archivo como respaldo.
- El caché actualiza las reseñas cada ~6 horas (configurable en `api/google-reviews.js`, constante `TTL_MS`).
