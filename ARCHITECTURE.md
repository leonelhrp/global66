# Arquitectura del Proyecto

Documentación técnica de la arquitectura de la plataforma Global66.

## Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────┐
│                    Cliente (Browser)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP Request
                     │
┌────────────────────▼────────────────────────────────────┐
│                    Nuxt Server                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              SSR Engine                          │  │
│  │  ┌─────────────────────────────────────────┐    │  │
│  │  │  asyncData() → Fetch → Render → HTML   │    │  │
│  │  └─────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Express API (/api/*)                   │  │
│  │   ├── GET  /rates                               │  │
│  │   ├── POST /subscribe                           │  │
│  │   └── GET  /health                              │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │   Google Sheets API   │
          └───────────────────────┘
```

## Flujo de Datos SSR

### 1. Request → Response Cycle

```
1. Browser → GET /precio/peso-chileno

2. Nuxt Router → Match route

3. asyncData() ejecuta en servidor
   ├── Fetch /api/rates?target=CLP
   ├── Map slug → currency data
   └── Return { rate, currency, name }

4. Vue renderiza componentes a HTML
   ├── CurrencyHero con datos
   ├── CurrencyBanner
   └── Layout (Navbar + Footer)

5. head() genera meta tags
   ├── <title>
   ├── <meta description>
   └── <meta og:*>

6. HTML completo → Cliente

7. JavaScript hydration
   └── App interactiva
```

### 2. asyncData vs mounted

```javascript
// ✅ SSR - Ejecuta en servidor Y cliente
async asyncData() {
  const data = await fetch('/api/rates')
  return { rates: data } // Disponible en template
}

// ❌ NO SSR - Solo cliente
mounted() {
  // Lógica client-side only
}
```

## Jerarquía de Componentes

```
layouts/default.vue
│
├── Navbar.vue
│   ├── Desktop Menu
│   │   ├── Productos (dropdown)
│   │   ├── Beneficios (dropdown)
│   │   └── Ayuda
│   ├── Mobile Menu (sidebar)
│   │   ├── Tabs: Personas/Empresas
│   │   ├── Accordion: Productos/Beneficios
│   │   └── Country Selector
│   └── Auth Buttons
│
├── <nuxt/> (página actual)
│   │
│   └── pages/precio/_slug.vue
│       │
│       ├── CurrencyHero.vue
│       │   ├── Props: currency, rate, name
│       │   ├── Left: Texto + CTA
│       │   └── Right: Banderas (USD ↔ Currency)
│       │
│       └── CurrencyBanner.vue
│           ├── Props: ninguno
│           ├── Left: Phone mockup
│           └── Right: Download badges
│
└── Footer.vue
    ├── Logo
    ├── 4 columnas de links
    └── Social icons
```

## Patrones de Diseño

### 1. Container Pattern (DRY)

```vue
<!-- ❌ Antes: Repetir en cada componente -->
<div class="max-w-7xl mx-auto px-4 sm:px-8">
  <h1>Contenido</h1>
</div>

<!-- ✅ Ahora: Componente reutilizable -->
<Container>
  <h1>Contenido</h1>
</Container>
```

### 2. Props-Down, Events-Up

```vue
<!-- Parent → Child (props) -->
<CurrencyHero
  :currency="currency"
  :rate="rate"
  :currency-name="currencyName"
/>

<!-- Child → Parent (events) -->
<Navbar @menu-toggle="handleMenuToggle" />
```

### 3. Slot Pattern (Layout)

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <Navbar />
    <nuxt /> <!-- Slot para páginas -->
    <Footer />
  </div>
</template>
```

## Routing

### Configuración Dinámica

```javascript
// pages/precio/_slug.vue
const currencyMap = {
  'peso-chileno': { code: 'CLP', name: 'Peso Chileno' },
  'sol-peruano': { code: 'PEN', name: 'Sol Peruano' },
  // ...
}

// /precio/peso-chileno → CLP
// /precio/sol-peruano → PEN
```

### SEO por Ruta

Cada ruta genera meta tags únicos:

```javascript
head() {
  return {
    title: `Precio del Dólar en ${this.currencyName}`,
    meta: [
      { name: 'description', content: `1 USD = ${this.rate} ${this.currency}` },
      { property: 'og:title', content: `Dólar ${this.currencyName}` }
    ]
  }
}
```

## Decisiones de Arquitectura

### 1. ¿Por qué SSR?

**Decisión**: Server-Side Rendering obligatorio

**Razones**:
- SEO crítico (Google indexa contenido completo)
- Meta tags dinámicos por divisa
- First Contentful Paint más rápido
- Crawlers ven contenido real, no loading spinners

### 2. ¿Por qué Nuxt 2 vs Nuxt 3?

**Decisión**: Nuxt 2.18.1

**Razones**:
- Estabilidad en producción
- Ecosistema maduro (TailwindCSS 2.x)
- Vue 2.7 tiene Composition API backport
- No necesitamos features de Nuxt 3

### 3. ¿Por qué Express middleware vs Nuxt API routes?

**Decisión**: Express montado en `/api/*`

**Razones**:
- Mayor control sobre middleware
- Logging personalizado
- Ecosistema Node.js completo
- Separación de concerns (frontend/backend)

### 4. ¿Por qué TailwindCSS vs CSS-in-JS?

**Decisión**: TailwindCSS utility-first

**Razones**:
- Desarrollo más rápido
- PurgeCSS elimina estilos no usados
- Menor bundle size que styled-components
- Design system consistente (colores, spacing)

### 5. ¿Por qué componentes vs páginas monolíticas?

**Decisión**: Component-based architecture

**Razones**:
- Reutilización (DRY)
- Testing unitario más fácil
- Separation of concerns
- Extensibilidad (agregar divisas)

### 6. ¿Por qué Mock API vs API externa?

**Decisión**: Rates mockeados en servidor

**Razones**:
- Sin dependencias externas
- Tests determinísticos
- Sin rate limits durante desarrollo
- Fácil swap a API real

## Organización de Archivos

### Por Feature, No por Tipo

```
✅ Correcto:
components/
├── currency/
│   ├── CurrencyHero.vue
│   └── __tests__/CurrencyHero.spec.ts
└── layout/
    ├── Navbar.vue
    └── __tests__/Navbar.spec.ts

❌ Incorrecto:
components/
├── CurrencyHero.vue
├── Navbar.vue
tests/
├── CurrencyHero.spec.ts
└── Navbar.spec.ts
```

### Convención de Nombres

- **Componentes**: PascalCase (`CurrencyHero.vue`)
- **Pages**: kebab-case (`_slug.vue`)
- **Tests**: `*.spec.ts`
- **Utils/Helpers**: camelCase (`formatCurrency.ts`)

## Testing Strategy

```
164 tests = 100% passing
├── Unit: Componentes individuales
├── Integration: asyncData + API
└── E2E: (futuro) Playwright
```

**Principio**: "Test behavior, not implementation"

```javascript
// ✅ Correcto: Test comportamiento
it('displays formatted rate', () => {
  expect(wrapper.text()).toContain('1 USD = 987,62 CLP')
})

// ❌ Incorrecto: Test implementación
it('calls formatNumber method', () => {
  expect(wrapper.vm.formatNumber).toHaveBeenCalled()
})
```

## Performance

### Code Splitting Automático

Nuxt genera chunks por ruta:

```
dist/
├── app.js           # Core Vue + Nuxt
├── commons.js       # Shared dependencies
├── pages/
│   ├── index.js     # Página home
│   └── precio/_slug.js  # Página dinámica
└── components/
    ├── currency/CurrencyHero.js
    └── layout/Navbar.js
```

### Lazy Loading

```vue
<!-- Componente carga solo cuando es necesario -->
<template>
  <client-only>
    <HeavyComponent />
  </client-only>
</template>
```

---

## Próximos Pasos

1. **Cache**: Redis para rates (TTL 1 min)
2. **API Real**: Integrar Fixer.io o similar
3. **ISR**: Incremental Static Regeneration
4. **Monitoring**: Sentry + Analytics
5. **WebP**: Optimizar imágenes
