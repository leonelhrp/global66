import { mount, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import CurrencyBanner from '../CurrencyBanner.vue'

describe('CurrencyBanner', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(CurrencyBanner as any)
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  describe('rendering', () => {
    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders the heading', () => {
      const heading = wrapper.find('h2')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toContain('Sé Global')
      expect(heading.text()).toContain('paga como local')
    })

    it('renders description text', () => {
      const description = wrapper.find('p')
      expect(description.text()).toContain('Tu Cuenta Global')
    })

    it('renders store badges', () => {
      const badges = wrapper.findAll('a')
      expect(badges.length).toBeGreaterThanOrEqual(2)
    })

    it('renders phone mockup', () => {
      const mockup = wrapper.find('img[alt="App mockups"]')
      expect(mockup.exists()).toBe(true)
      expect(mockup.attributes('src')).toContain('banner-img')
    })
  })

  describe('structure', () => {
    it('has white background', () => {
      const section = wrapper.find('section')
      expect(section.classes()).toContain('bg-white')
    })

    it('uses flex layout', () => {
      const container = wrapper.find('.flex')
      expect(container.exists()).toBe(true)
    })

    it('has rounded container', () => {
      const container = wrapper.find('.rounded-2xl')
      expect(container.exists()).toBe(true)
    })
  })

  describe('content', () => {
    it('displays correct heading text', () => {
      expect(wrapper.text()).toContain('Sé Global,')
      expect(wrapper.text()).toContain('paga como local')
    })

    it('displays correct description', () => {
      expect(wrapper.text()).toContain('Tu Cuenta Global para pagar, convertir, enviar dinero y más.')
    })
  })

  describe('images', () => {
    it('has Google Play badge', () => {
      const playStore = wrapper.find('img[alt="Google Play"]')
      expect(playStore.exists()).toBe(true)
    })

    it('has App Store badge', () => {
      const appStore = wrapper.find('img[alt="App Store"]')
      expect(appStore.exists()).toBe(true)
    })

    it('all images have alt text', () => {
      const images = wrapper.findAll('img')
      images.wrappers.forEach((img: Wrapper<Vue>) => {
        expect(img.attributes('alt')).toBeDefined()
      })
    })
  })

  describe('responsive design', () => {
    it('has responsive text classes', () => {
      const heading = wrapper.find('h2')
      expect(heading.classes().some((c: string) => c.includes('text-'))).toBe(true)
    })

    it('has responsive padding', () => {
      const section = wrapper.find('section')
      expect(section.classes().some((c: string) => c.includes('py-'))).toBe(true)
    })

    it('has flex-wrap for badges', () => {
      const badgeContainer = wrapper.find('.flex.flex-wrap')
      expect(badgeContainer.exists()).toBe(true)
    })
  })

  describe('styling', () => {
    it('applies hover effects to links', () => {
      const links = wrapper.findAll('a')
      links.wrappers.forEach((link: Wrapper<Vue>) => {
        expect(link.classes()).toContain('hover:opacity-80')
      })
    })

    it('has correct background color for container', () => {
      const container = wrapper.find('.bg-global-light')
      expect(container.exists()).toBe(true)
    })

    it('has correct text colors', () => {
      const darkText = wrapper.find('.text-global-dark')
      const blueText = wrapper.find('.text-global-blue-dark')
      const grayText = wrapper.find('.text-global-gray')

      expect(darkText.exists()).toBe(true)
      expect(blueText.exists()).toBe(true)
      expect(grayText.exists()).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('has proper link elements', () => {
      const links = wrapper.findAll('a')
      links.wrappers.forEach((link: Wrapper<Vue>) => {
        expect(link.attributes('href')).toBeDefined()
      })
    })

    it('has semantic heading', () => {
      const h2 = wrapper.find('h2')
      expect(h2.exists()).toBe(true)
    })

    it('images have descriptive alt text', () => {
      const playStore = wrapper.find('img[alt="Google Play"]')
      const appStore = wrapper.find('img[alt="App Store"]')
      const mockup = wrapper.find('img[alt="App mockups"]')

      expect(playStore.exists()).toBe(true)
      expect(appStore.exists()).toBe(true)
      expect(mockup.exists()).toBe(true)
    })
  })
})
