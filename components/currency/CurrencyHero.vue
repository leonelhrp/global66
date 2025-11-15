<template>
  <section class="bg-global-blue relative overflow-hidden pt-20 pb-32 lg:pb-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-8">
      <div class="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-20">
        <!-- Left Content - Text -->
        <div class="w-full lg:w-1/2 text-center lg:text-left z-10 lg:mt-16">
          <h1 class="text-white text-3xl lg:text-4xl xl:text-5xl font-medium mb-6">
            Valor del Dólar hoy
            <br />
            <span class="font-extrabold">1 USD = {{ formattedRate }} {{ currency }}</span>
          </h1>
          <p class="text-white text-lg lg:text-xl font-medium max-w-xl">
            {{ formattedDate }}
          </p>
        </div>

        <!-- Right Content - Flags -->
        <div class="relative flex w-full justify-center md:w-10/12 lg:w-6/12">
          <div>
            <div class="flex justify-center">
              <!-- Green Arrow -->
              <img
                src="~/assets/images/hero-arrow.svg"
                alt="flag"
                loading="lazy"
                class="absolute z-20 -ml-10"
                style="top: -19px; filter: drop-shadow(2px 4px 4px rgba(89, 110, 200, .25));"
              />

              <!-- Flags Container -->
              <div class="flex justify-center items-center relative z-10" style="margin-bottom: -42px;">
                <!-- US Flag (From) -->
                <div class="relative inline-flex justify-center">
                  <div
                    class="rounded-full inline-block p-6 relative z-[1]"
                    style="background: linear-gradient(180deg, rgba(157, 176, 255, .5) 2%, rgba(63, 94, 223, .5) 100%); backdrop-filter: blur(30px);"
                  >
                    <div
                      class="rounded-full inline-block p-2"
                      style="background: rgba(220, 226, 249, .4);"
                    >
                      <img
                        src="~/assets/images/usa.svg"
                        alt="flag"
                        width="150"
                        height="150"
                        loading="lazy"
                        class="rounded-full w-[150px]"
                      />
                    </div>
                  </div>
                </div>

                <!-- Target Currency Flag (To) -->
                <div class="relative inline-flex justify-center" style="left: -55px; margin-right: -45px;">
                  <div
                    class="rounded-full inline-block p-6 relative z-[1]"
                    style="background: linear-gradient(180deg, rgba(124, 223, 197, .4) 2%, rgba(133, 201, 229, .4) 100%); backdrop-filter: blur(10px);"
                  >
                    <div
                      class="rounded-full inline-block p-2"
                      style="background: rgba(224, 254, 251, .4);"
                    >
                      <img
                        :src="currencyFlag"
                        :alt="currency"
                        width="165"
                        height="165"
                        loading="lazy"
                        class="rounded-full w-[165px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Stand -->
              <img
                src="~/assets/images/stand.svg"
                width="503"
                height="198"
                alt="stand"
                loading="lazy"
                class="pt-4 lg:pt-0 absolute stand-position z-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrencyHero',

  props: {
    currency: {
      type: String,
      required: true,
      default: 'CLP'
    },
    currencyName: {
      type: String,
      default: 'Peso Chileno'
    },
    currencyFlag: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    timestamp: {
      type: String,
      required: true
    }
  },

  computed: {
    formattedRate() {
      return this.rate ? this.rate.toFixed(2) : 'N/A'
    },

    formattedDate() {
      const date = new Date(this.timestamp)
      const dayName = date.toLocaleDateString('es-CL', { weekday: 'long' })
      const day = date.getDate()
      const month = date.toLocaleDateString('es-CL', { month: 'long' })
      const hours = date.getUTCHours().toString().padStart(2, '0')
      const minutes = date.getUTCMinutes().toString().padStart(2, '0')
      return `¿Cuánto está el precio del dólar hoy ${dayName} ${day} de ${month} a las ${hours}:${minutes} UTC?`
    }
  }
}
</script>

<style scoped>
.stand-position {
  top: 190px;
  transform: scale(1.25);
}

@media (min-width: 1024px) {
  .stand-position {
    top: 190px;
    transform: scale(1.1);
  }
}
</style>
