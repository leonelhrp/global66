<template>
  <nav class="bg-global-blue w-full relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-8">
      <div class="flex items-center h-20 xl:h-[100px] py-3 xl:py-0">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="inline-block">
            <img
              src="~/assets/images/logo.svg"
              alt="Global66"
              class="h-7 w-auto"
            />
          </a>
        </div>

        <!-- Personas/Empresas Tabs -->
        <div class="ml-7 hidden h-full pl-4 xl:flex">
          <div class="flex h-full gap-4">
            <a href="/" class="relative flex flex-grow flex-col items-center justify-center font-semibold text-white">
              <span class="text-sm text-global-green-alt">PERSONAS</span>
              <div class="absolute bottom-5 left-0 w-full h-1 bg-global-green-alt"></div>
            </a>
            <a href="/empresas" class="relative flex flex-grow flex-col items-center justify-center font-semibold text-white hover:text-white/80 transition-colors">
              <span class="text-sm">EMPRESAS</span>
            </a>
          </div>
        </div>

        <!-- Center Navigation -->
        <div class="ml-auto mr-4 hidden items-center gap-6 border-r border-global-border pr-6 xl:flex">
          <!-- Productos Dropdown -->
          <button class="flex items-center gap-2 font-semibold text-white hover:opacity-80 transition-opacity">
            <span class="text-sm">Productos</span>
            <img src="~/assets/images/caret-white.svg" alt="caret" />
          </button>

          <!-- Beneficios Dropdown -->
          <button class="flex items-center gap-2 font-semibold text-white hover:opacity-80 transition-opacity">
            <span class="text-sm">Beneficios</span>
            <img src="~/assets/images/caret-white.svg" alt="caret" />
          </button>

          <!-- Ayuda -->
          <a href="https://ayuda.global66.com/" target="_blank" class="font-semibold text-white hover:opacity-80 transition-opacity">
            <span class="text-sm">Ayuda</span>
          </a>

          <!-- Country Selector -->
          <button class="flex items-center gap-2">
            <img
              :src="countryFlag"
              alt="country"
              class="w-8 h-8 rounded-full object-cover"
            />
            <img src="~/assets/images/caret-white.svg" alt="caret" />
          </button>
        </div>

        <!-- Auth Buttons Desktop -->
        <div class="ml-auto xl:ml-4 flex items-center gap-5">
          <a
            href="https://transferencias.global66.com/signIn"
            target="_blank"
            class="hidden md:flex font-semibold text-white hover:opacity-80 transition-opacity text-sm"
          >
            Iniciar sesión
          </a>
          <a
            href="https://transferencias.global66.com/signUp"
            target="_blank"
            class="hidden xl:inline-flex items-center justify-center px-6 py-2.5 font-semibold text-global-blue-dark bg-white hover:bg-gray-50 rounded-full text-sm transition-colors"
          >
            Crear cuenta
          </a>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = true"
            class="xl:hidden p-2"
            aria-label="Abrir menú"
          >
            <img
              src="~/assets/images/burger-menu-icon-white.svg"
              width="25"
              height="18"
              alt="Menu"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-50"
        @click="mobileMenuOpen = false"
      ></div>
    </transition>

    <!-- Mobile Menu Sidebar -->
    <transition name="slide">
      <div
        v-if="mobileMenuOpen"
        class="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[60] overflow-y-auto shadow-2xl"
      >
        <!-- Menu Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <img
            src="~/assets/images/global-icon.svg"
            alt="Global66"
            class="w-12 h-12"
          />
          <button
            @click="mobileMenuOpen = false"
            class="p-2 text-gray-600 hover:text-gray-800"
            aria-label="Cerrar menú"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Personas/Empresas Tabs -->
        <div class="flex border-b border-gray-200">
          <button
            @click="activeTab = 'personas'"
            :class="[
              'flex-1 py-4 text-sm font-semibold transition-colors',
              activeTab === 'personas'
                ? 'text-global-blue-dark border-b-2 border-global-blue-dark'
                : 'text-gray-600'
            ]"
          >
            PERSONAS
          </button>
          <button
            @click="activeTab = 'empresas'"
            :class="[
              'flex-1 py-4 text-sm font-semibold transition-colors',
              activeTab === 'empresas'
                ? 'text-global-blue-dark border-b-2 border-global-blue-dark'
                : 'text-gray-600'
            ]"
          >
            EMPRESAS
          </button>
        </div>

        <!-- Menu Items -->
        <div class="py-4">
          <!-- Productos -->
          <div class="border-b border-gray-200">
            <button
              @click="toggleSection('productos')"
              class="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              <span>Productos</span>
              <svg
                :class="['w-5 h-5 transition-transform', openSections.productos ? 'rotate-180' : '']"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Beneficios -->
          <div class="border-b border-gray-200">
            <button
              @click="toggleSection('beneficios')"
              class="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              <span>Beneficios</span>
              <svg
                :class="['w-5 h-5 transition-transform', openSections.beneficios ? 'rotate-180' : '']"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Ayuda -->
          <div class="border-b border-gray-200">
            <a
              href="https://ayuda.global66.com/"
              target="_blank"
              class="block px-6 py-4 font-medium text-gray-900 hover:bg-gray-50"
            >
              Ayuda
            </a>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="px-6 py-4">
          <a
            href="https://transferencias.global66.com/signUp"
            target="_blank"
            class="block w-full text-center py-4 px-6 bg-global-blue text-white font-semibold rounded-full hover:bg-global-blue-dark transition-colors"
          >
            Crea Tu Cuenta Global
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  props: {
    countryFlag: {
      type: String,
      default: () => require('~/assets/images/cl.svg')
    }
  },

  data() {
    return {
      mobileMenuOpen: false,
      activeTab: 'personas',
      openSections: {
        productos: false,
        beneficios: false
      }
    }
  },

  methods: {
    toggleSection(section) {
      this.openSections[section] = !this.openSections[section]
    }
  },

  watch: {
    mobileMenuOpen(isOpen) {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },

  beforeDestroy() {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Slide transition for sidebar */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
