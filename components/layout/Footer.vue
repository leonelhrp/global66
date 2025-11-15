<template>
  <footer class="bg-global-blue py-0">
    <div class="lg:max-w-7xl md:max-w-4xl sm:max-w-2xl mx-auto px-4 sm:px-8">
      <div class="divide-y divide-white/20">
        <!-- Top Section with CTA -->
        <div class="flex flex-col justify-between space-y-5 py-8 text-center lg:flex-row lg:space-y-0 lg:text-left">
          <div class="flex flex-col items-center space-x-0 space-y-4 text-center lg:flex-row lg:space-x-6 lg:space-y-0 lg:text-left">
            <img
              src="~/assets/images/global-icon.svg"
              alt="Logo"
              class="w-12"
            />
            <h3 class="text-white text-2xl lg:text-3xl font-bold">
              Fácil, rápido y económico
            </h3>
          </div>
          <div>
            <a
              href="#"
              class="inline-flex items-center justify-center bg-white text-global-blue-dark font-semibold text-base py-4 px-8 md:py-5 md:px-8 rounded-full border-2 border-white hover:bg-gray-100 transition-colors"
            >
              Descarga la App
            </a>
          </div>
        </div>

        <!-- Links Grid -->
        <div class="flex flex-col justify-between space-y-4 py-8 lg:flex-row lg:space-y-0">
          <!-- Features Column -->
          <div class="space-y-4 text-center lg:text-left">
            <h4 class="text-white font-bold text-sm lg:text-base">FEATURES</h4>
            <ul class="space-y-2 text-base font-medium">
              <li><a href="#" class="text-white hover:underline">Invita y gana</a></li>
              <li><a href="#" class="text-white hover:underline">Club de fundadores</a></li>
              <li><a href="#" class="text-white hover:underline">¿Qué nos respalda?</a></li>
              <li><a href="#" class="text-white hover:underline">Glosario</a></li>
              <li><a href="#" class="text-white hover:underline">Conversor de monedas</a></li>
              <li><a href="#" class="text-white hover:underline">Alertas de tipo de cambio</a></li>
              <li><a href="#" class="text-white hover:underline">Códigos SWIFT</a></li>
              <li><a href="#" class="text-white hover:underline">Precio dólar hoy</a></li>
              <li><a href="#" class="text-white hover:underline">Precio euro hoy</a></li>
              <li><a href="#" class="text-white hover:underline">Comprar dólares</a></li>
              <li><a href="#" class="text-white hover:underline">Conviértete en afiliado</a></li>
            </ul>
          </div>

          <!-- Company Column -->
          <div class="space-y-4 text-center lg:text-left">
            <h4 class="text-white font-bold text-sm lg:text-base">EMPRESA</h4>
            <ul class="space-y-2 text-base font-medium">
              <li><a href="#" class="text-white hover:underline">Trabaja con nosotros</a></li>
            </ul>
          </div>

          <!-- Help Column -->
          <div class="space-y-4 text-center lg:text-left">
            <h4 class="text-white font-bold text-sm lg:text-base">AYUDA</h4>
            <ul class="space-y-2 text-base font-medium">
              <li><a href="#" class="text-white hover:underline">Blog</a></li>
              <li><a href="#" class="text-white hover:underline">Reclamo por compras</a></li>
              <li><a href="#" class="text-white hover:underline">Preguntas frecuentes</a></li>
              <li><a href="#" class="text-white hover:underline">Centro de ayuda</a></li>
            </ul>
          </div>

          <!-- Links Column -->
          <div class="space-y-4 text-center lg:text-left">
            <h4 class="text-white font-bold text-sm lg:text-base">LINKS DE INTERÉS</h4>
            <ul class="space-y-2 text-base font-medium">
              <li><a href="#" class="text-white hover:underline">Tarifario tarjeta</a></li>
              <li><a href="#" class="text-white hover:underline">Tarifario servicios especiales</a></li>
              <li><a href="#" class="text-white hover:underline">T&C tarjeta</a></li>
              <li><a href="#" class="text-white hover:underline">Acreencias</a></li>
              <li><a href="#" class="text-white hover:underline">Información Ley 21.234</a></li>
              <li><a href="#" class="text-white hover:underline">Estados financieros</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
