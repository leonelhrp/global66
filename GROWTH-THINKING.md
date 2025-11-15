# Growth Thinking - Global66 Currency Pages

## 1. ¿Qué metas técnicas y de negocio monitorearías en /precio/*?

### Métricas de Negocio
- **CTR al CTA principal** ("Crear cuenta"): objetivo ≥8% - mide conversión directa
- **Scroll depth 75%**: objetivo ≥40% - indica engagement con contenido completo
- **Tiempo en página**: objetivo ≥45s - refleja lectura y consideración
- **Bounce rate**: objetivo ≤55% - valida relevancia del contenido vs expectativa

**Segmentación**: Todas estas métricas por divisa (CLP, PEN, ARS, COP) para identificar mercados con mejor/peor performance

### Métricas Técnicas/SEO
- **Core Web Vitals**: LCP ≤2.5s, FID ≤100ms, CLS ≤0.1 (ranking factors de Google)
- **Posicionamiento orgánico** por keyword específica ("precio dólar chile", "precio dólar perú")
- **CTR en SERP**: porcentaje de usuarios que hacen clic desde resultados de Google
- **Impresiones y clicks** en Search Console, segmentado por divisa
- **TTFB**: ≤600ms - crítico para SSR y experiencia de usuario

**Herramientas**: Google Analytics (eventos personalizados), Search Console, Lighthouse CI, Hotjar, Clarity

---

## 2. Caída del 20% orgánico en "precio dólar" para CLP: ¿cómo la investigarías y qué acciones tomarías en 72h?

### Horas 0-8: Diagnóstico Urgente

**Search Console (2h)**
- Comparar últimos 7 días vs 14 días anteriores
- Verificar si cayeron impresiones (problema de indexación), clicks (problema de CTR) o posición promedio (problema de ranking)

**Verificación técnica (2h)**
- Confirmar indexación: `site:global66.com/precio/peso-chileno` en Google
- Inspeccionar URL en Search Console
- Verificar que SSR funciona correctamente (view-source debe mostrar contenido)
- Revisar robots.txt, sitemap.xml, canonical tags

**Análisis de competencia (2h)**
- Verificar si competidores (Banco Central de Chile, DolarHoy, XE.com) mejoraron posiciones
- Revisar si perdimos backlinks importantes

**Cambios recientes (2h)**
- Git log: revisar deploys de última semana
- Verificar cambios en Core Web Vitals

### Horas 8-48: Acciones Correctivas

**Si cayó el ranking**:
- Enriquecer contenido con contexto adicional relevante (no spam)
- Agregar sección FAQ con keywords long-tail
- Mejorar internal linking desde páginas de alta autoridad

**Si es problema técnico**:
- Optimizar title/meta description (si CTR cayó pero posición se mantuvo)
- Implementar/mejorar Schema.org markup (FinancialProduct)
- Corregir issues de Core Web Vitals

**Si es desindexación**:
- Corregir robots.txt/sitemap
- Forzar re-crawl en Search Console

### Horas 48-72: Monitoreo y Documentación
- Monitorear Search Console cada 12h
- Preparar contenido adicional de respaldo
- Documentar aprendizajes para prevenir futuras caídas

---

## 3. 3 mejoras de velocidad aplicables a esta página sin sacrificar SEO

### 1. Optimización de Imágenes y Lazy Loading
- Convertir imágenes a WebP/AVIF con fallback a PNG/JPG
- Implementar `loading="lazy"` en imágenes below-the-fold
- `<link rel="preload">` solo para hero image (banderas)
- **Impacto SEO**: ✅ Mejora LCP significativamente sin afectar crawleability

### 2. Edge Caching con ISR (Incremental Static Regeneration)
- Cachear páginas /precio/* en CDN con revalidación cada 10 minutos
- Mantener SSR para primera carga (SEO)
- Servir desde edge posteriormente (velocidad)
- Implementar estrategia stale-while-revalidate
- **Impacto SEO**: ✅ TTFB dramáticamente mejor, contenido sigue fresco y crawleable

### 3. Optimización de Assets y Code Splitting
- Minificar CSS/JS con Terser y cssnano
- Comprimir con Brotli (mejor ratio que Gzip)
- `font-display: swap` para web fonts
- Code splitting por ruta para reducir bundle inicial
- **Impacto SEO**: ✅ Mejora todos los Core Web Vitals sin afectar contenido indexable

---

## 4. 2 hipótesis para mejorar conversión del hero (y cómo A/B testearlas)

### Hipótesis 1: Calculadora Interactiva en Hero

**Problema identificado**: Los usuarios que buscan "precio dólar" generalmente quieren convertir montos específicos, no solo ver la tasa. Reducir esta fricción debería aumentar engagement y conversión.

**Variantes**:
- **A (Control)**: Hero actual con tasa estática "1 USD = 987,62 CLP"
- **B (Tratamiento)**: Hero con input "Quiero convertir [___] USD a CLP" + resultado en tiempo real

**Cómo A/B testear**:
- **Herramienta**: Google Optimize o VWO
- **Split**: 50/50 del tráfico orgánico
- **Duración**: 2 semanas o hasta significancia estadística (mínimo 1,000 conversiones por variante)
- **Métrica primaria**: CTR a CTA "Crear cuenta"
- **Métricas secundarias**: tiempo en página, scroll depth, interacciones con calculadora

### Hipótesis 2: Social Proof Dinámico

**Problema identificado**: Falta de credibilidad y urgencia en la página. Los usuarios no saben si la tasa es confiable ni cuántas personas la usan.

**Variantes**:
- **A (Control)**: Hero sin social proof
- **B (Tratamiento)**: Badge visible "1,247 personas consultaron esta tasa hoy" + micro-animación de contador

**Cómo A/B testear**:
- **Herramienta**: Google Optimize o VWO
- **Split**: 50/50 del tráfico orgánico
- **Duración**: 2 semanas
- **Métrica primaria**: CTR en CTA principal
- **Métricas secundarias**: bounce rate, scroll depth, confianza percibida

**Validación adicional**:
- Heatmaps (Hotjar) para ver si usuarios interactúan con el nuevo elemento
- Session recordings para detectar patrones inesperados

---

## 5. ¿Cuánto tiempo te tomó realizar este requerimiento y qué aceleraste con IA?

### Tiempo Total: ~16 horas

### Lo que Aceleré con IA (Claude Code)

**Altamente acelerado**:
- **Setup inicial**: Configuración completa de Nuxt 2 + TailwindCSS + SSR
- **Boilerplate**: Estructura de componentes, API endpoints, rutas dinámicas
- **Google Sheets integration**: Código completo con autenticación y error handling
- **Testing**: Generación de suite completa de tests con edge cases
- **Debugging**: Identificación rápida de issues (Vue reserved attributes, SSR hydration problems)

**Moderadamente acelerado**:
- **Componentes UI**: IA generó estructura base, luego ajustes manuales de diseño/spacing
- **SEO implementation**: Meta tags dinámicos, structured data, canonical URLs
- **Documentación**: README, guía de setup (GOOGLE_SHEETS_SETUP.md)

**Trabajo 100% manual (IA no ayudó)**:
- **Validación visual**: Testing responsive, ajustes finos de animaciones
- **Decisiones de arquitectura**: Organización de proyecto, estrategia de testing
- **Growth thinking**: Análisis estratégico y recomendaciones de negocio

**Mayor valor agregado de IA**: Debugging rápido, generación de tests exhaustivos, eliminación de trabajo repetitivo, permitiendo enfocarme en decisiones de diseño y arquitectura que realmente agregan valor.