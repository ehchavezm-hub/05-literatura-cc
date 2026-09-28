# Biblioteca Literaria Global

Buscador de literatura, ensayos, reseñas y obras clásicas de fuentes de gran prestigio.

**Acceso web:** https://ehchavezm-hub.github.io/05-LITERATURA-cc/

## Secciones

- **Buscar** — búsqueda libre por autor, obra o tema con filtro de período
- **Novedades & Reseñas** — actualizadas cada 4 horas automáticamente
- **Ensayos & Crítica** — artículos académicos de revistas de filología
- **Obras & Libros** — catálogo clásico y contemporáneo

## Fuentes

**Nacional (Perú):** Casa de la Literatura Peruana, El Dominical, Libros & Artes, El Hablador  
**Internacional:** Babelia, The Guardian Books, Letras Libres, Crossref (revistas académicas)  
**Texto completo:** Project Gutenberg, Open Library, Google Books

## Desarrollo local

```bash
npm install
npm start          # http://localhost:3000
npm test           # pruebas unitarias
npm run actualizar # actualiza los JSON de datos
npm run css        # compila Tailwind
```

## Estructura

```
public/       → sitio estático (GitHub Pages)
servidor/     → lógica Node.js para el servidor local
herramientas/ → script de actualización de datos
pruebas/      → pruebas unitarias
.github/      → GitHub Actions (deploy + actualización cada 4 h)
```

## Activar GitHub Pages

1. Ir a **Settings → Pages** del repositorio
2. En *Source* seleccionar **GitHub Actions**
3. Ejecutar el workflow manualmente desde la pestaña **Actions**
