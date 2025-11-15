<template>
  <div class="bg-white min-h-screen relative">
    <!-- Navbar -->
    <Navbar />

    <!-- Page Content -->
    <Nuxt />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
/**
 * Layout por defecto de la aplicación
 *
 * Incluye:
 * - Navbar (navegación principal)
 * - <Nuxt /> (contenido dinámico de cada página)
 * - Footer (pie de página)
 *
 * Este layout se aplica automáticamente a todas las páginas
 * a menos que especifiquen un layout diferente
 */

import Navbar from '~/components/layout/Navbar.vue'
import Footer from '~/components/layout/Footer.vue'

export default {
  name: 'DefaultLayout',

  components: {
    Navbar,
    Footer
  }
}
</script>
