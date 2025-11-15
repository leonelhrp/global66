# Global66 - Plataforma de Cambio de Divisas

Plataforma web para visualizar tipos de cambio en tiempo real para Latinoamérica. Proyecto de prueba técnica para Lead Web Frontend en Global66.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [API Endpoints](#api-endpoints)
- [Características Principales](#características-principales)
- [Testing](#testing)
- [Google Sheets Integration](#google-sheets-integration)
- [SEO y Performance](#seo-y-performance)
- [Documentación Adicional](#documentación-adicional)

## 🛠 Stack Tecnológico

- **Framework**: Nuxt 2.18.1 con SSR
- **Frontend**: Vue 2.7 + TailwindCSS 2.2.19
- **Backend**: Express.js 4.18.2
- **Testing**: Vitest + Vue Test Utils
- **Integración**: Google Sheets API
- **Node**: ≥ 14.x (Recomendado: 18.x)

## 📦 Instalación

### Requisitos Previos

- Node.js 14.x o superior
- npm 6.x o superior

### Pasos

1. **Clonar e instalar**
   ```bash
   git clone <repository-url>
   cd global66-nuxt
   npm install
   ```

2. **Configurar variables de entorno** (Opcional)
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales de Google Sheets
   ```

3. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

4. **Verificar**
   - http://localhost:3000 → Redirige a `/precio/peso-chileno`
   - http://localhost:3000/precio/peso-chileno → Tipo de cambio USD/CLP

> **Nota**: La app funciona perfectamente sin Google Sheets. Las suscripciones se guardarán solo en los logs de consola.

## 📁 Estructura del Proyecto

```
global66-nuxt/
├── api/
│   ├── index.ts                    # Express API endpoints
│   └── __tests__/
│       └── index.spec.ts           # API tests (41 tests)
├── components/
│   ├── common/
│   │   ├── Container.vue           # Container wrapper reutilizable
│   │   └── __tests__/
│   │       └── Container.spec.ts   # Container tests (23 tests)
│   ├── currency/
│   │   ├── CurrencyHero.vue        # Hero con banderas y tipo de cambio
│   │   ├── CurrencyBanner.vue      # Banner de descarga de app
│   │   └── __tests__/
│   │       ├── CurrencyHero.spec.ts    # (37 tests)
│   │       └── CurrencyBanner.spec.ts  # (22 tests)
│   └── layout/
│       ├── Navbar.vue              # Navbar con menú móvil
│       ├── Footer.vue              # Footer con enlaces
│       └── __tests__/
│           ├── Navbar.spec.ts      # (7 tests)
│           └── Footer.spec.ts      # (37 tests)
├── layouts/
│   ├── default.vue                 # Layout principal
│   └── __tests__/
│       └── default.spec.ts         # (9 tests)
├── pages/
│   ├── index.vue                   # Redirige a /precio/peso-chileno
│   ├── precio/
│   │   └── _slug.vue               # Páginas dinámicas de divisas
│   └── __tests__/
│       ├── index.spec.ts           # (2 tests)
│       └── precio/
│           └── _slug.spec.ts       # (10 tests)
├── assets/
│   ├── css/
│   │   └── main.css                # Estilos globales + Tailwind
│   └── images/                     # SVGs, banderas, logos
├── static/
│   └── favicon.ico                 # Favicon
├── nuxt.config.js                  # Configuración Nuxt
├── tailwind.config.js              # Colores y configuración
├── vitest.config.ts                # Configuración de tests
└── package.json

Total: 164 tests pasando ✅
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor desarrollo (http://localhost:3000)

# Producción
npm run build            # Build para producción
npm start                # Servidor producción

# Testing
npm test                 # Ejecutar todos los tests (164 tests)
npm run test:watch       # Tests en modo watch

# Generación estática
npm run generate         # Genera sitio estático
```

## 🔌 API Endpoints

### GET `/api/rates`

Obtiene tipos de cambio actuales.

**Query Parameters:**
- `base` (opcional, default: `USD`) - Moneda base
- `target` (opcional) - Moneda objetivo específica

**Ejemplo:**
```bash
curl "http://localhost:3000/api/rates?base=USD&target=CLP"
```

**Response:**
```json
{
  "base": "USD",
  "rates": {
    "CLP": 987.62,
    "PEN": 3.81,
    "ARS": 1025.5,
    "BRL": 5.42
  },
  "target": "CLP",
  "asOf": "2024-11-15T00:00:00.000Z",
  "success": true
}
```

### POST `/api/subscribe`

Registra suscripciones de usuarios.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "currency": "CLP"
}
```

**Response:**
```json
{
  "success": true,
  "message": "¡Gracias por suscribirte!",
  "data": {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "subscribedAt": "2024-11-15T00:00:00.000Z",
    "savedToSheets": false
  }
}
```

### GET `/api/health`

Health check del servidor.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-11-15T00:00:00.000Z",
  "uptime": 123.456
}
```

## ✨ Características Principales

### 🎨 Frontend

- **SSR Completo**: Todas las páginas con Server-Side Rendering
- **Rutas Dinámicas**: Sistema de divisas extensible via `/precio/:slug`
- **Responsive Design**: Mobile-first con Tailwind breakpoints
- **Mobile Menu**: Menú hamburguesa funcional con navegación completa
- **Accesibilidad**: ARIA labels y navegación por teclado

### 🔧 Backend

- **Express API**: 3 endpoints REST (/rates, /subscribe, /health)
- **Google Sheets**: Integración opcional para almacenar suscripciones
- **Validación**: Email validation y manejo de errores robusto
- **Logging**: Logs detallados de requests y errores

### 🎨 Design System

Colores definidos en `tailwind.config.js`:

```javascript
{
  'global-blue': '#1f49b6',       // Navbar, hero
  'global-blue-dark': '#102a97',  // Textos oscuros
  'global-green': '#00c48c',      // CTAs, acentos
  'global-green-alt': '#01d196',  // Variante verde
  'global-light': '#f5f7fe',      // Fondos claros
  'global-dark': '#221c1c',       // Textos
  'global-gray': '#565656',       // Textos secundarios
  'global-border': '#9ba9d0'      // Bordes
}
```

## 🧪 Testing

```bash
npm test
```

**Cobertura:**
- ✅ **164 tests pasando** al 100%
- ✅ API endpoints (41 tests)
- ✅ Componentes de layout (44 tests)
- ✅ Componentes de currency (59 tests)
- ✅ Pages y layouts (20 tests)

**Stack de testing:**
- Vitest 2.1.9
- @vue/test-utils
- happy-dom (environment)

## 📊 Google Sheets Integration

### Configuración

1. **Copiar ejemplo de variables**
   ```bash
   cp .env.example .env
   ```

2. **Seguir guía completa**

   Ver [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) para instrucciones detalladas.

3. **Variables necesarias**
   ```bash
   GOOGLE_SHEET_ID=your_spreadsheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

### Funcionamiento

- **Con credenciales**: Suscripciones → Google Sheets automáticamente
- **Sin credenciales**: Suscripciones → Logs de consola únicamente
- **Auto-creación**: La primera suscripción crea la hoja automáticamente
- **Columnas**: Timestamp, Name, Email, Currency

## 🚀 SEO y Performance

### SEO Implementado

- ✅ **SSR**: Renderizado del servidor para crawlers
- ✅ **Meta Tags Dinámicos**: Title, description, OG tags por divisa
- ✅ **Canonical URLs**: Evita contenido duplicado
- ✅ **Hreflang**: Localización (es-CL, es)
- ✅ **Schema.org Ready**: Estructura preparada para rich snippets
- ✅ **Localización**: Números (987,62) y fechas en español

### Performance

- ✅ **Code Splitting**: Automático con Nuxt
- ✅ **Lazy Loading**: Imágenes y componentes
- ✅ **Purge CSS**: Solo clases usadas en producción
- ✅ **API Local**: Sin latencia de servicios externos
- ✅ **Optimización de assets**: Imágenes comprimidas

### Lighthouse Targets

```bash
npm run build && npm start
# Ejecutar Lighthouse en Chrome DevTools
```

### Google Sheets no funciona

1. Verificar que las variables de entorno estén correctas
2. Verificar que la Service Account tenga permisos en el Sheet
3. Ver logs de consola para errores específicos
4. Consultar [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

## 🎯 Rutas de la Aplicación

```
/                           → 301 Redirect to /precio/peso-chileno
/precio/peso-chileno        → USD to CLP (Chile)
/precio/sol-peruano         → USD to PEN (Perú)
/precio/peso-argentino      → USD to ARS (Argentina)
/precio/peso-colombiano     → USD to COP (Colombia)
/precio/real-brasileno      → USD to BRL (Brasil)
```

Todas con SSR, meta tags dinámicos y tipos de cambio actualizados.

## 🔄 Agregando Nuevas Divisas

Editar `pages/precio/_slug.vue`:

```javascript
const currencyMap = {
  'peso-chileno': {
    code: 'CLP',
    name: 'Peso Chileno',
    flag: require('~/assets/images/cl.svg')
  },
  'tu-nueva-divisa': {
    code: 'XXX',
    name: 'Tu Divisa',
    flag: require('~/assets/images/tu-bandera.svg')
  }
}
```

## 📚 Documentación Adicional

- **[GROWTH-THINKING.md](./GROWTH-THINKING.md)** - Estrategia de growth, métricas, plan de crisis, optimizaciones de velocidad y A/B testing
- **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** - Guía completa para configurar la integración con Google Sheets
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Documentación de arquitectura del proyecto

---

Desarrollado como prueba técnica para Lead Web Frontend - Global66