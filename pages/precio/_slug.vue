<template>
  <div>
    <!-- Hero Section -->
    <CurrencyHero
      :currency="currency"
      :currency-name="currencyName"
      :currency-flag="getFlagImage()"
      :rate="rate"
      :timestamp="timestamp"
    />

    <!-- Currency Banner -->
    <CurrencyBanner />
  </div>
</template>

<script>
/**
 * Página dinámica de tipos de cambio
 *
 * Esta página muestra el tipo de cambio para una divisa específica
 * basándose en el slug de la URL (ej: /precio/peso-chileno)
 *
 * asyncData se ejecuta en el servidor antes de renderizar la página,
 * permitiendo SSR completo con datos dinámicos
 *
 * Nota: Navbar y Footer se encuentran en layouts/default.vue
 */

import CurrencyHero from '~/components/currency/CurrencyHero.vue'
import CurrencyBanner from '~/components/currency/CurrencyBanner.vue'

export default {
  name: 'PrecioPage',

  components: {
    CurrencyHero,
    CurrencyBanner
  },

  /**
   * asyncData se ejecuta en el servidor (SSR)
   * Obtiene los datos necesarios antes de renderizar
   */
  async asyncData({ params, error }) {
    // Diccionario de slugs a códigos de divisa
    const currencyMap = {
      'peso-chileno': { code: 'CLP', name: 'Peso Chileno', flag: 'chile' },
      'sol-peruano': { code: 'PEN', name: 'Sol Peruano', flag: 'peru' },
      'peso-argentino': { code: 'ARS', name: 'Peso Argentino', flag: 'argentina' },
      'peso-colombiano': { code: 'COP', name: 'Peso Colombiano', flag: 'colombia' },
      'peso-ecuatoriano': { code: 'ECS', name: 'Peso Ecuatoriano', flag: 'ecuador' },
      'peso-mexicano': { code: 'MXN', name: 'Peso Mexicano', flag: 'mexico' },
    }

    // Obtener el slug de la URL
    const slug = params.slug

    // Validar que el slug exists
    if (!currencyMap[slug]) {
      return error({
        statusCode: 404,
        message: 'Divisa no encontrada'
      })
    }

    const currencyInfo = currencyMap[slug]
    const targetCurrency = currencyInfo.code

    try {
      // Hacer fetch a nuestra API para obtener los tipos de cambio
      // En SSR, necesitamos la URL completa
      const baseURL = process.server ? `http://localhost:${process.env.PORT || 3000}` : ''

      const response = await fetch(`${baseURL}/api/rates?base=USD&target=${targetCurrency}`)

      if (!response.ok) {
        throw new Error('Error al obtener tipos de cambio')
      }

      const data = await response.json()

      // Obtener el rate específico
      const rate = data.rates[targetCurrency]

      return {
        currency: targetCurrency,
        currencyName: currencyInfo.name,
        currencyFlag: currencyInfo.flag,
        rate,
        timestamp: data.asOf
      }
    } catch (err) {
      console.error('Error fetching rates:', err)

      // En caso de error, retornar datos mock para no romper la página
      return {
        currency: targetCurrency,
        currencyName: currencyInfo.name,
        currencyFlag: currencyInfo.flag,
        rate: 987.62, // Valor por defecto
        timestamp: new Date().toISOString(),
        fetchError: true
      }
    }
  },

  methods: {
    getFlagImage() {
      const flagMap = {
        chile: require('~/assets/images/cl.svg'),
        peru: require('~/assets/images/pe.svg'),
        argentina: require('~/assets/images/ar.svg'),
        colombia: require('~/assets/images/co.svg'),
        ecuador: require('~/assets/images/ec.svg'),
        mexico: require('~/assets/images/mx.svg'),
      }
      return flagMap[this.currencyFlag] || flagMap.chile
    }
  },

  head() {
    const slug = this.$route.params.slug
    const baseUrl = process.env.BASE_URL || 'https://global66.com'

    return {
      title: `Dólar a ${this.currencyName}: 1 USD = ${this.rate ? this.rate.toFixed(2) : 'N/A'} ${this.currency}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Tipo de cambio del dólar a ${this.currencyName} hoy: 1 USD = ${this.rate ? this.rate.toFixed(2) : 'N/A'} ${this.currency}. Actualizado el ${new Date(this.timestamp).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}. Envía dinero con Global66 al mejor precio.`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Dólar a ${this.currencyName}: 1 USD = ${this.rate ? this.rate.toFixed(2) : 'N/A'} ${this.currency}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Conoce el tipo de cambio actual del dólar a ${this.currencyName} y envía dinero con Global66.`
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${baseUrl}/precio/${slug}`
        },
        {
          rel: 'alternate',
          hreflang: 'es-CL',
          href: `${baseUrl}/precio/${slug}`
        },
        {
          rel: 'alternate',
          hreflang: 'es',
          href: `${baseUrl}/precio/${slug}`
        }
      ]
    }
  }
}
</script>
