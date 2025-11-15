import { mount } from '@vue/test-utils'
import Vue from 'vue'
import DefaultLayout from '../default.vue'

// Mock Nuxt component
const NuxtMock = Vue.extend({
  name: 'Nuxt',
  template: '<div class="nuxt-content"></div>'
})

const NavbarMock = Vue.extend({
  name: 'Navbar',
  template: '<nav>Navbar</nav>'
})

const FooterMock = Vue.extend({
  name: 'Footer',
  template: '<footer>Footer</footer>'
})

describe('DefaultLayout', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DefaultLayout as any, {
      stubs: {
        Nuxt: NuxtMock,
        Navbar: NavbarMock,
        Footer: FooterMock
      }
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  describe('rendering', () => {
    it('renders the layout', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders Navbar component', () => {
      const navbar = wrapper.findComponent({ name: 'Navbar' })
      expect(navbar.exists()).toBe(true)
    })

    it('renders Nuxt component', () => {
      const nuxt = wrapper.findComponent({ name: 'Nuxt' })
      expect(nuxt.exists()).toBe(true)
    })

    it('renders Footer component', () => {
      const footer = wrapper.findComponent({ name: 'Footer' })
      expect(footer.exists()).toBe(true)
    })
  })

  describe('structure', () => {
    it('has correct root classes', () => {
      expect(wrapper.classes()).toContain('bg-white')
      expect(wrapper.classes()).toContain('min-h-screen')
      expect(wrapper.classes()).toContain('relative')
    })

    it('has all three main sections', () => {
      const navbar = wrapper.findComponent({ name: 'Navbar' })
      const nuxt = wrapper.findComponent({ name: 'Nuxt' })
      const footer = wrapper.findComponent({ name: 'Footer' })

      expect(navbar.exists()).toBe(true)
      expect(nuxt.exists()).toBe(true)
      expect(footer.exists()).toBe(true)
    })
  })

  describe('components', () => {
    it('has Navbar registered', () => {
      expect(wrapper.vm.$options.components?.Navbar).toBeDefined()
    })

    it('has Footer registered', () => {
      expect(wrapper.vm.$options.components?.Footer).toBeDefined()
    })

    it('has DefaultLayout name', () => {
      expect(wrapper.vm.$options.name).toBe('DefaultLayout')
    })
  })
})
