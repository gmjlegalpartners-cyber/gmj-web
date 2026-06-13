/* =========================================================
   Función serverless (Vercel) — Reseñas reales de Google
   ---------------------------------------------------------
   Trae las reseñas de la ficha de Google del estudio usando
   la Places API (New) y las devuelve normalizadas al frente.

   Variables de entorno en Vercel:
     - GOOGLE_MAPS_API_KEY  (obligatoria) API key de Google Cloud
     - GOOGLE_PLACE_ID      (recomendada) Place ID de la ficha
     - GOOGLE_PLACE_QUERY   (opcional) búsqueda por nombre si no
                            hay Place ID definido.

   Tope de Google: 5 reseñas por consulta. Cachea 6 horas.
   Endpoint: https://tu-dominio/api/google-reviews
   ========================================================= */

let cache = { data: null, ts: 0 };
const TTL_MS = 1000 * 60 * 60 * 6; // 6 horas

function normalizeReviews(reviews) {
  return (reviews || [])
    .map((rv) => ({
      name: (rv.authorAttribution && rv.authorAttribution.displayName) || "Cliente",
      rating: rv.rating || 5,
      date: rv.relativePublishTimeDescription || "",
      text: ((rv.text && rv.text.text) || (rv.originalText && rv.originalText.text) || "").trim()
    }))
    .filter((rv) => rv.text.length > 0);
}

export default async function handler(req, res) {
  try {
    const now = Date.now();

    if (cache.data && now - cache.ts < TTL_MS) {
      res.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");
      return res.status(200).json(cache.data);
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Falta la variable GOOGLE_MAPS_API_KEY en Vercel." });
    }

    const placeId = process.env.GOOGLE_PLACE_ID;
    const query = process.env.GOOGLE_PLACE_QUERY || "GMJ Abogados registro de marcas";

    let place = null;

    if (placeId) {
      const r = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`,
        { headers: { "X-Goog-Api-Key": apiKey, "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews" } }
      );
      if (!r.ok) {
        const detail = await r.text();
        return res.status(502).json({ error: "Error de Google Places API (Place Details)", status: r.status, detail });
      }
      place = await r.json();
    } else {
      const r = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "places.id,places.displayName,places.rating,places.userRatingCount,places.reviews"
        },
        body: JSON.stringify({ textQuery: query, languageCode: "es", regionCode: "AR" })
      });
      if (!r.ok) {
        const detail = await r.text();
        return res.status(502).json({ error: "Error de Google Places API (Text Search)", status: r.status, detail });
      }
      const data = await r.json();
      place = (data.places || []).slice().sort((a, b) => (b.userRatingCount || 0) - (a.userRatingCount || 0))[0] || null;
    }

    if (!place) {
      return res.status(404).json({ error: "No se encontró la ficha de Google." });
    }

    const payload = {
      reviews: normalizeReviews(place.reviews),
      rating: place.rating || null,
      total: place.userRatingCount || null,
      name: (place.displayName && place.displayName.text) || null,
      updatedAt: new Date().toISOString()
    };

    cache = { data: payload, ts: now };
    res.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
