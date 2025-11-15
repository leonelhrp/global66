<template>
  <section class="bg-white py-12 sm:py-16 lg:py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-8">
      <div class="bg-global-light rounded-2xl lg:rounded-3xl py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Left Content -->
          <div class="order-2 lg:order-1">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-4 sm:mb-6">
              <span class="text-global-dark font-medium">Sé Global,</span><br />
              <span class="text-global-blue-dark font-bold">paga como local</span>
            </h2>
            <p class="text-global-gray text-base sm:text-lg lg:text-xl font-medium leading-relaxed mb-6 lg:mb-8">
              Tu Cuenta Global para pagar, convertir, enviar dinero y más.
            </p>
            <div class="flex flex-wrap gap-3">
              <a href="#" class="inline-block hover:opacity-80 transition-opacity">
                <img
                  src="~/assets/images/playstore.svg"
                  alt="Google Play"
                  class="h-8 sm:h-10 w-auto"
                />
              </a>
              <a href="#" class="inline-block hover:opacity-80 transition-opacity">
                <img
                  src="~/assets/images/app-store.svg"
                  alt="App Store"
                  class="h-8 sm:h-10 w-auto"
                />
              </a>
            </div>
          </div>

          <!-- Right - Phone Mockups -->
          <div class="order-1 lg:order-2">
            <img
              src="~/assets/images/banner-img.png"
              alt="App mockups"
              class="w-full h-auto max-w-md mx-auto lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrencyBanner'
}
</script>
