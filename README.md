# Biblioteca Literaria Global

Buscador de literatura, ensayos, reseñas y obras clásicas de fuentes de gran prestigio.

**Acceso web:** https://ehchavezm-hub.github.io/05-LITERATURA-cc/

## Secciones

- **🔍 Buscar Todo** — búsqueda libre por autor, obra o tema con filtro de período
- **📘 Obras y Textos** — novelas, poesía y clásicos de 25+ editoriales internacionales
- **📝 Críticas y Reseñas** — reseñas y análisis de 90+ diarios de 30 países + revistas académicas
- **✍️ Autores** — 1 000+ autores galardonados (Nobel, Cervantes, Booker, Goncourt, Pulitzer…)

## Fuentes

### Críticas y Reseñas (90+ diarios de todo el mundo)

**Perú:** Casa de la Literatura Peruana · El Dominical (El Comercio) · La República Cultura · Peru21 · Andina  
**Argentina:** La Nación · Clarín · Infobae · Página 12 · Télam  
**México:** La Jornada · El Universal · Letras Libres · Milenio · Proceso  
**Colombia:** El Tiempo · El Espectador · Semana · El Colombiano · El Heraldo  
**Chile:** La Tercera · El Mostrador · El Desconcierto · Emol  
**Venezuela:** El Nacional · TalCual  
**Ecuador:** El Comercio · El Universo  
**Brasil:** Folha de São Paulo · O Globo · UOL  
**Cuba:** Granma · Juventud Rebelde  
**Uruguay:** El País · El Observador  
**Costa Rica:** La Nación  
**Rep. Dominicana:** Listín Diario  

**EE. UU.:** NYT Books · The Guardian Books · Publishers Weekly · Literary Hub · The Atlantic  
**España:** Babelia (El País) · El Mundo · ABC Cultural · La Vanguardia · El Confidencial  
**Francia:** Le Monde Livres · Le Figaro · France Culture · L'Obs · Franceinfo  
**Alemania:** Zeit Literatur · Spiegel · FAZ · taz · Deutschlandfunk  
**Italia:** Corriere della Sera · La Repubblica · La Stampa · Il Sole 24 Ore · Internazionale  
**Portugal:** Público · Observador  
**Reino Unido:** The Guardian · The Independent · The Telegraph · BBC Culture · Financial Times  
**Canadá:** CBC Books · Globe and Mail  
**India:** The Hindu · Indian Express · The Wire · Hindustan Times · Scroll  
**Japón:** The Japan Times · NHK World  
**China:** Global Times · South China Morning Post  
**Australia:** SMH · The Age · ABC Arts  
**Sudáfrica:** Mail & Guardian · Daily Maverick · Times Live  
**Nigeria:** The Guardian Nigeria · Punch  
**Egipto:** Al-Ahram Weekly  

**Revistas académicas:** DOAJ (Directory of Open Access Journals) · Crossref · SciELO  

### Obras y Textos (25+ editoriales internacionales)

**Iberoamérica:** Alfaguara · Anagrama · Fondo de Cultura Económica · Seix Barral · Tusquets · Planeta · Acantilado · Eterna Cadencia · Sudamericana · Peisa (Perú)  
**Europa:** Gallimard · Seuil · Einaudi · Mondadori · Bloomsbury · Faber & Faber · Suhrkamp  
**Anglosajón:** Penguin Random House · HarperCollins · Knopf · Farrar Straus & Giroux  
**Asia/África:** Penguin India · Cassava Republic · Companhia das Letras  

**Texto completo gratuito:** Project Gutenberg · Open Library · Google Books

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
  js/         → módulos cliente: guardian.js, doaj.js, crossref.js, libros.js…
  datos/      → JSON pre-construidos (actualizados cada 4 h por GitHub Actions)
servidor/     → lógica Node.js para el servidor local
  fuentes/    → diarios.js (90+ RSS), editoriales.js (100+ publishers)
herramientas/ → script de actualización de datos
.github/      → GitHub Actions (deploy + actualización cada 4 h)
```

## Activar GitHub Pages

1. Ir a **Settings → Pages** del repositorio
2. En *Source* seleccionar **GitHub Actions**
3. Ejecutar el workflow manualmente desde la pestaña **Actions**
