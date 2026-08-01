# Auditoría inicial — Lucas Williams · Emotional

Estado del proyecto **antes** de la reorganización. Documento de trabajo interno.

Fecha de la auditoría: 2026-07-31
Método: lectura completa de los 4 archivos de código, inspección de las 27 imágenes
con ImageMagick y render real en Chrome (1440×900) con consola abierta.

---

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real |
|---|---|---|---|
| `index.html` | `WONDERFUL STORIES — ` (acaba en guion vacío) | `Lucas Williams` | Portada editorial a dos paneles. Única página del sitio. |

No existe `404.html`. No existe ninguna segunda página.

## 2. Archivos CSS y JS

| Archivo | Tamaño | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/normalize.css` | 2.3 KB | Sí | Normalize minificado en 1 línea + `*{transition:.3s}` global + bloque comentado muerto. |
| `CSS/styles.css` | 12.2 KB | Sí | Compilado desde Sass. Termina en `sourceMappingURL=styles.css.map`. |
| `CSS/styles.scss` | 15.3 KB | No | Fuente Sass. Requiere un compilador que el proyecto no declara en ningún sitio. |
| `CSS/styles.css.map` | 3.7 KB | No | Artefacto de build. No debería estar versionado. |
| `JS/script.js` | 340 B | Sí | 18 líneas. Depende de jQuery para dos `addClass`. |

## 3. Imágenes

| Ruta | Peso | Dimensiones | Formato | ¿Se usa? |
|---|---|---|---|---|
| `IMG/BACKGROUNDS/Background Mountains.jpg` | 1 688 KB | 5035×3339 | JPEG | Sí, como `background-image` del panel derecho. |
| `IMG/photo.jpg` | 468 KB | 2624×2624 | JPEG | Sí, se muestra en un círculo de **110 px**. |
| `Lucas-Williams-Emotional.png` | 280 KB | 1024×1024 | PNG | Sí, como favicon declarado `sizes="16x16"`. |
| `IMG/FAVICON/` — 23 PNG + `favicon.ico` | ~120 KB | 16×16 … 310×310 | PNG/ICO | **No.** Solo `favicon-32x32.png` aparece en `twitter:image`. |
| `IMG/FAVICON/browserconfig.xml` | 246 B | — | XML | **No.** Ningún HTML lo enlaza. |

El set de 24 iconos de `IMG/FAVICON/` **no es la marca de este proyecto**: son iconos
de WIB (círculo azul con las siglas). La marca real del sitio es el corazón de
`Lucas-Williams-Emotional.png`.

Peso total de imágenes: **2 436 KB**. Peso de la primera carga: **2 156 KB**
(fondo + retrato + favicon), muy por encima del objetivo de 1 MB.

## 4. Dependencias externas

| Dependencia | Origen | Uso real |
|---|---|---|
| jQuery 3.6.0 | `code.jquery.com`, sin `defer` | Dos `setTimeout` + `addClass`. Nada más. |
| Google Fonts (import 1) | `@import` en CSS | Libre Caslon Text + **Montserrat**. |
| Google Fonts (import 2) | `@import` en CSS | Archivo + Libre Caslon Text + **Montserrat** (duplicado). |

Los dos `@import` bloquean el render y descargan **Montserrat, que ninguna regla usa**.
Libre Caslon Text se pide dos veces. No hay `preconnect`.

## 5. Enlaces, rutas e imágenes rotas

| Tipo | Referencia | Estado |
|---|---|---|
| Meta | `msapplication-TileImage` → `/ms-icon-144x144.png` | **Roto.** El archivo está en `IMG/FAVICON/`, no en la raíz. |
| Meta | `browserconfig.xml` → `/ms-icon-70x70.png`, `-150x150`, `-310x310` | **Rotos.** Mismo motivo. |
| Enlace | `<a>CONCEPTIONS</a>` | Sin `href`. No lleva a ningún sitio. |
| Enlace | `NAVIGATION`, `ARTISTS`, `OUR MISSION`, `EDITORIAL STORIES 2023`, `CONTACT NOW` | 5 `<a>` sin `href`, con `cursor: pointer` y animación de hover. Aparentan ser navegación y no lo son. |

No hay `<link>` ni `<script>` apuntando a archivos inexistentes. Consola: **0 errores**.

## 6. Contenido heredado de otra plantilla

Lo más grave del proyecto.

| Ubicación | Contenido | Problema |
|---|---|---|
| `index.html` líneas 19-44 | Bloque JSON-LD completo de **«Persianas JP»** | Datos de negocio de **otro proyecto**: teléfono `+34-123-456-789`, dirección `Carrer Sabaters 13`, localidad `Ciudad`, CP `00000`, y perfiles de Facebook y Twitter que no son de este sitio. Se publicaría como datos estructurados verificables por Google. |
| `index.html` línea 126 | `alt="PerfumesShopingTarget"` | Texto alternativo de una tienda de perfumes. No describe la foto. |
| `CSS/styles.scss` línea 480 | `.displayNome-footer { display: none }` | La clase no existe en ningún HTML. Nombre en portugués/italiano de otra plantilla. |
| `index.html` | `EDITORIAL STORIES 2023` | Año fijo obsoleto, mientras el mismo sitio calcula el año en vivo tres líneas más arriba. |

## 7. Metadatos vacíos

`description`, `og:title`, `og:description`, `og:site_name`, `twitter:title` y
`twitter:description` existen con `content=""`. No hay `og:url`, `og:image` ni
`<link rel="canonical">`. El `<title>` termina en `— ` sin completar.

## 8. HTML: semántica y accesibilidad

- Todo el contenido vive dentro de `<header>`. No hay `<main>`.
- Orden de encabezados: `h3` → `h2` → `h1` → `h4`. Salta niveles y el `h1` llega tercero.
- `<html lang="es">` pero **todo el texto está en inglés**.
- Ningún elemento interactivo real, por lo que no hay foco visible que probar; los 6
  `<a>` sin `href` tampoco son alcanzables con teclado.
- `<div>` vacíos usados como reglas gráficas, sin marcar como decorativos.

## 9. CSS: problemas estructurales

- **Selectores posicionales hasta 8 niveles**: `aside > :nth-child(2) > :nth-child(1) > :nth-child(3) > :nth-child(2) > :nth-child(1) > :nth-child(2)`.
  Toda la hoja depende del orden exacto de los `<div>`; mover un elemento rompe el diseño.
- **Cero variables CSS.** Los colores `#EFEFE2`, `#efefe2` y `black` se repiten ~20 veces
  con dos capitalizaciones distintas.
- **Sin escala de espaciado.** Valores sueltos: `12.5px`, `.45rem`, `1.75rem`, `.25rem`.
- `* { transition: .3s }` aplicado a **todos** los elementos del documento.
- Reglas duplicadas dentro del mismo bloque: `display: flex` dos veces,
  `justify-content` dos veces con valores contrarios, `transition` dos veces,
  `font-size: 50px` pisado por `font-size: 65px`.
- Bloque vacío: `h1 { }`.
- Clase `.libre-caslon-text-regular` declarada y nunca usada.
- Responsive **desktop-first**: un único `@media (max-width: 900px)`. No hay
  breakpoints intermedios.

## 10. JavaScript

- `var` en las 4 declaraciones, todas globales.
- `var year = document.getElementById('year').textContent = year;` — reasigna la misma
  variable sobre sí misma; funciona por accidente.
- jQuery 3.6.0 (30 KB) cargado sin `defer` para dos `addClass`.
- No comprueba que `#year` exista antes de escribir en él.

## 11. Archivos basura y de configuración

| Archivo | Estado |
|---|---|
| `.gitignore` | **No existe.** |
| `robots.txt` | **No existe.** |
| `sitemap.xml` | **No existe.** |
| `CSS/styles.css.map` | Artefacto de build versionado. |
| `Background Mountains.jpg` | Espacio y mayúsculas en el nombre. |
| `CSS/`, `IMG/`, `JS/` | Carpetas en mayúsculas. |

No se encontraron `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni copias `_v2`.

## 12. Credenciales

Revisión completa de los 4 archivos de código: **no hay claves de API, tokens ni
credenciales**. El único dato sensible es el teléfono y la dirección inventados del
bloque JSON-LD ajeno, que se elimina.

---

## Resumen en 5 líneas

1. Es una portada editorial de una sola página: dos paneles a pantalla completa, uno
   tipográfico sobre crema y otro con foto de montaña, con una animación de entrada escalonada.
2. El diseño está terminado y funciona sin errores de consola; lo que está sin terminar
   es todo lo que rodea al diseño.
3. **Lo más grave:** el `<head>` publica datos estructurados de otra empresa —«Persianas JP»,
   con teléfono y dirección— que Google leería como los datos reales de este sitio.
4. Le siguen 2.1 MB de imágenes en la primera carga (un fondo de 5035 px y un retrato de
   2624 px que se ve a 110 px) y seis enlaces que aparentan navegación sin llevar a ningún sitio.
5. El CSS depende por completo de `:nth-child` posicional hasta 8 niveles, así que cualquier
   cambio de marcado rompe el diseño: es el motivo real de que el proyecto no sea mantenible.
