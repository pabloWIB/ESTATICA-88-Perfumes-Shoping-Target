# Registro de cambios

Reorganización completa del proyecto, por fases. El estado de partida está
documentado en [auditoria.md](auditoria.md).

Fecha: 2026-07-31. Todos los cambios son locales: no se ejecutó ningún comando de git.

---

## Fase 1 — Auditoría

- Lectura completa de los 4 archivos de código y de los 27 archivos de imagen.
- Medición de dimensiones y peso reales de cada imagen con ImageMagick.
- Render del sitio original en Chrome a 1440×900 con la consola abierta para fijar
  el punto de partida: 0 errores de consola.
- Escrito `docs/auditoria.md` con el inventario en tablas.

## Fase 2 — Estructura destino

- Creado el árbol `assets/{css,js,img}` con `img/content` e `img/logo`.
- `CSS/` → `assets/css/`, dividido en `base.css`, `layout.css` y `components.css`.
- `JS/script.js` → `assets/js/main.js`.
- `IMG/` → `assets/img/`, con nombres semánticos en minúsculas y con guiones.
- Actualizadas todas las rutas de HTML y CSS. Ninguna ruta quedó rota:
  verificado con peticiones reales a los 14 archivos servidos, todas 200.
- No se creó `assets/js/modules/`: el JavaScript del proyecto son 20 líneas con una
  sola responsabilidad, y una carpeta de módulos para eso habría quedado vacía de
  contenido real.
- No se creó `assets/css/pages/` ni `assets/fonts/`: solo hay una página con estilos
  propios y las tipografías se sirven desde Google Fonts.

## Fase 3 — Higiene

Eliminados:

| Archivo | Motivo |
|---|---|
| `CSS/styles.scss` | Fuente Sass sin compilador declarado. El CSS se reescribió a mano. |
| `CSS/styles.css.map` | Artefacto de build versionado por error. |
| `CSS/normalize.css` | Sustituido por un reset moderno de 25 líneas dentro de `base.css`. |
| `IMG/FAVICON/` (24 archivos) | Iconos de WIB, marca ajena a este proyecto, sin referenciar desde ningún HTML. |
| `IMG/FAVICON/browserconfig.xml` | Apuntaba a tres rutas inexistentes y ningún HTML lo enlazaba. |
| `Lucas-Williams-Emotional.png` (raíz) | Reemplazado por `assets/img/logo/lucas-williams-emotional.png`, optimizado. |
| `IMG/photo.jpg`, `IMG/BACKGROUNDS/Background Mountains.jpg` | Sustituidos por sus versiones WebP redimensionadas. |

Antes de borrar cada imagen se comprobó con `grep` sobre HTML, CSS, JS, XML y TXT que
ningún archivo la referenciaba.

Otros cambios:

- Creado `.gitignore` para stack estático: sistema operativo, editores, logs, `.env`,
  `node_modules/` y `.vercel`.
- Normalizado el formato: indentación de 2 espacios, comillas dobles en HTML y JS,
  punto y coma en JS, salto de línea final en todos los archivos.
- **Credenciales: no había ninguna.** No se encontraron claves, tokens ni API keys.

## Fase 4 — Imágenes

| Imagen | Antes | Después | Reducción |
|---|---|---|---|
| Fondo del panel derecho | 5035×3339 JPEG, 1 688 KB | 1920×1273 WebP, 281 KB | −83 % |
| Retrato de la tarjeta | 2624×2624 JPEG, 468 KB | 400×400 WebP, 11 KB | −97,5 % |
| Marca | 1024×1024 PNG, 280 KB | 512×512 PNG, 94 KB | −66 % |

- Set de favicons regenerado recortando el corazón de la marca real:
  `favicon-32x32.png`, `icon-192.png` y `apple-touch-icon.png` (sobre fondo crema,
  porque iOS no respeta la transparencia).
- `social-card.jpg` (1200×630) generada capturando la propia página ya renderizada,
  no es una imagen inventada ni descargada.
- Añadidos `width`, `height`, `loading="lazy"` y `decoding="async"` al único `<img>`.
- `alt="PerfumesShopingTarget"` sustituido por una descripción real de la fotografía.

## Fase 5 — HTML, SEO y accesibilidad

- **Eliminado el bloque JSON-LD de «Persianas JP»**: datos estructurados de otra
  empresa, con teléfono, dirección y perfiles sociales que no son de este sitio.
- `<html lang="es">` → `lang="en"`; todo el contenido está en inglés.
- Añadido `<main>`. El contenido ya no vive dentro de un `<header>` suelto.
- Jerarquía de encabezados corregida: era `h3 → h2 → h1 → h4`, ahora es `h1` en el
  masthead y `h2` en el panel derecho. Las etiquetas que no eran encabezados
  (`EDITORIAL`, `LANDSCAPE STYLE`, `PURPOSE ARTIST`) pasaron a `<p class="tag">`.
- `<head>` completo y real: `title` y `description` únicos por página dentro de rango,
  canonical, Open Graph, Twitter Card, favicons y `theme-color`.
- Texto de la página escrito en caja normal con `text-transform: uppercase` en CSS,
  en lugar de mayúsculas en el marcado.
- **Contraste**: el texto crema sobre el cielo de la fotografía daba ~1,8:1. Se añadió
  un velo plano del 46 % bajo el contenido. Medido sobre el render real: el píxel más
  claro de la zona con texto queda en 5,2:1, por encima del mínimo de 4,5:1.
- Corregida la copia `Articles and inspire young creators.`, que no era una frase
  gramatical, a `Articles that inspire young creators.`
- Creados `robots.txt` y `sitemap.xml` con la URL real del sitio.
- Creado `404.html` con `noindex`, enlace real de vuelta y estados de foco visibles.

## Fase 6 — CSS y sistema de diseño

- Reescrito el CSS. El original dependía de selectores posicionales de hasta 8 niveles
  (`aside > :nth-child(2) > :nth-child(1) > …`), lo que ataba el diseño al orden exacto
  de los `<div>`. Ahora todo son clases con nombre.
- Variables en `:root`: paleta, escala de espaciado, escala tipográfica, radios,
  grosores de línea y duraciones. La paleta se derivó de los dos colores que el sitio
  ya usaba, no se inventó ninguno.
- Escala de espaciado 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96. Desaparecen `12.5px`,
  `.45rem` y `1.75rem`.
- Dos familias tipográficas. Se eliminó la carga de **Montserrat**, que se descargaba
  en los dos `@import` y ninguna regla usaba, y la petición duplicada de Libre Caslon.
- Eliminados: `* { transition: .3s }` global, el bloque vacío `h1 {}`, la clase
  `.libre-caslon-text-regular` sin usar, la regla `.displayNome-footer` cuyo selector
  no existe en ningún HTML, las declaraciones duplicadas y el código comentado muerto.
- `!important` solo en el bloque de `prefers-reduced-motion`, donde debe ganar.
- Orden dentro de cada archivo: variables → reset → base → layout → componentes →
  media queries.

## Fase 7 — Responsive

- Invertido a **mobile-first**: el original tenía un único `@media (max-width: 900px)`.
- Breakpoints en 480 / 768 / 1024 / 1440 con `min-width`.
- Verificado sin scroll horizontal en 360, 768, 1024 y 1440 px, comprobando
  `document.documentElement.scrollWidth > window.innerWidth` en el navegador real.
- **Corregido un recorte silencioso**: `.panel` tenía `overflow: hidden` y altura fija
  en escritorio, así que en viewports bajos (por ejemplo 1200×630) el último bloque se
  cortaba sin que apareciera barra de scroll. Ahora el recorte vive solo en
  `.panel__bg`, que es lo único que debe recortarse, y el panel crece y la página hace
  scroll cuando el contenido no cabe.
- No hay menú móvil que probar: el sitio no tiene navegación. No se inventó uno.

## Fase 8 — UX / UI

- **Eliminados los 6 enlaces falsos.** Eran `<a>` sin `href`, con `cursor: pointer` y
  animación de hover, que aparentaban navegación hacia páginas que no existen:
  `CONCEPTIONS`, `NAVIGATION`, `ARTISTS`, `OUR MISSION`, `EDITORIAL STORIES 2023` y
  `CONTACT NOW`.
- De esa lista se conservaron tres como **etiquetas tipográficas estáticas**
  (`Artists`, `Our mission`, `Editorial stories`), sin `href`, sin cursor y sin estado
  de hover: son marcas de composición, no navegación, y nada invita a hacer clic.
  Se eliminaron `NAVIGATION` (no navegaba a nada) y `CONTACT NOW` (prometía un
  contacto que el proyecto no tiene).
- Eliminado el año fijo `2023`, que además contradecía al año en vivo del masthead.
- El subrayado de `Join our journey` y `Giving emotional feelings` se mantiene como
  énfasis tipográfico en `<em>`, sin cursor de enlace ni hover.
- Estados completos (hover, focus-visible, active) en el único elemento interactivo del
  proyecto, el enlace de vuelta del 404, con área táctil de 44 px y transición de 180 ms.
- Ancho de línea del texto limitado a 64 caracteres.
- Retirado el zoom al pasar el ratón sobre la fotografía: animación gratuita sobre un
  elemento no interactivo. Se conserva el zoom de entrada.

## Fase 9 — JavaScript

- **Eliminado jQuery 3.6.0**: 30 KB desde CDN, sin `defer`, para dos `addClass`.
- La animación de entrada pasó a CSS puro con `animation-delay` escalonado. Efecto
  secundario deseable: si el JavaScript falla, la página se lee igual. Antes el
  contenido dependía de que jQuery cargara.
- `main.js` queda en 20 líneas, en una IIFE, con `const`, sin `var`, sin globales, y
  comprobando que el elemento existe antes de escribir en él.
- El año se imprime también en el HTML como valor de partida, así que la etiqueta
  nunca aparece vacía.
- Consola limpia: 0 errores y 0 avisos en `index.html` y en `404.html`, verificado por
  CDP capturando `Runtime.exceptionThrown`, `console.error/warning` y `Log.entryAdded`.

## Fase 10 — Rendimiento

- Los dos `@import` de Google Fonts, que bloquean el render, sustituidos por un `<link>`
  con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com` y `display=swap`.
- Script con `defer`.
- Peso de la primera carga: **313 KB** (HTML + 3 CSS + JS + fondo + retrato + favicon),
  frente a los ~2,2 MB de imágenes que cargaba antes. Objetivo de 1 MB cumplido.
- Cero librerías.

## Fase 11 — QA

Verificado en Chrome sin interfaz, controlado por CDP, en `index.html` y `404.html`:

- Cada `<link>`, `<script>` e `<img>` responde 200. Comprobados los 14 archivos.
- 0 errores y 0 avisos de consola, y 0 peticiones fallidas.
- Sin scroll horizontal en 360, 768, 1024 y 1440 px.
- Ninguna imagen rota (`naturalWidth > 0` en todas).
- Ningún elemento sobresale del ancho del viewport en ninguno de los cuatro anchos.
- El sitio carga igual abriendo `index.html` con `file://` y servido con `npx serve`.
- Rutas desconocidas sirven `404.html`, verificado con `npx serve`.
- Sin credenciales, sin `Lorem ipsum`, sin `TODO` y sin texto de la plantilla original.

## Fase 12 — Documentación

- `README.md` reescrito en inglés técnico: descripción, stack, árbol comentado,
  ejecución local, deploy y autor. Se rehízo entero porque la reorganización cambió
  todas las rutas y el comando de estilos.
- Eliminada del README la sección «Known issues», que describía un problema —el PNG
  suelto en la raíz— que ya no existe.
- Escrito este registro.

## Fase 13 — Deploy

- Sin rutas absolutas de máquina en ningún archivo.
- Todas las rutas internas relativas y en minúsculas. `404.html` usa rutas
  relativas a la raíz a propósito, porque el host lo sirve desde URLs arbitrarias.
- No se creó `vercel.json`, `_redirects` ni `.htaccess`: no se indicó destino de
  hosting y el sitio no los necesita.
- No se ejecutó ningún despliegue.
