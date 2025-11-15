<template>
  <div></div>
</template>

<script>
/**
 * Página de redirección
 * Redirige automáticamente a /precio/peso-chileno como ruta por defecto
 */

export default {
  name: 'HomePage',

  /**
   * Middleware para redirigir
   * Se ejecuta antes de renderizar la página
   */
  asyncData({ redirect }) {
    return redirect(301, '/precio/peso-chileno')
  }
}
</script>
