import { mount, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import Footer from '../Footer.vue'

describe('Footer', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Footer as any)
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

    it('renders as a footer element', () => {
      const footer = wrapper.find('footer')
      expect(footer.exists()).toBe(true)
    })

    it('renders the CTA section', () => {
      const heading = wrapper.find('h3')
      expect(heading.text()).toContain('Fácil, rápido y económico')
    })

    it('renders download app button', () => {
      const buttons = wrapper.findAll('a')
      const downloadButton = buttons.wrappers.find((btn: Wrapper<Vue>) =>
        btn.text().includes('Descarga la App')
      )
      expect(downloadButton).toBeDefined()
    })

    it('renders logo icon', () => {
      const logo = wrapper.find('img[alt="Logo"]')
      expect(logo.exists()).toBe(true)
      expect(logo.attributes('src')).toContain('global-icon')
    })
  })

  describe('columns', () => {
    it('renders Features column', () => {
      const text = wrapper.text()
      expect(text).toContain('FEATURES')
    })

    it('renders Company column', () => {
      const text = wrapper.text()
      expect(text).toContain('EMPRESA')
    })

    it('renders Help column', () => {
      const text = wrapper.text()
      expect(text).toContain('AYUDA')
    })

    it('renders Links column', () => {
      const text = wrapper.text()
      expect(text).toContain('LINKS DE INTERÉS')
    })

    it('has flex layout for columns', () => {
      const flex = wrapper.find('.flex.flex-col')
      expect(flex.exists()).toBe(true)
    })
  })

  describe('links', () => {
    it('renders multiple links', () => {
      const links = wrapper.findAll('a')
      expect(links.length).toBeGreaterThan(5)
    })

    it('renders Features links', () => {
      const text = wrapper.text()
      expect(text).toContain('Invita y gana')
      expect(text).toContain('Precio dólar hoy')
      expect(text).toContain('Conversor de monedas')
    })

    it('renders Company links', () => {
      const text = wrapper.text()
      expect(text).toContain('Trabaja con nosotros')
    })

    it('renders Help links', () => {
      const text = wrapper.text()
      expect(text).toContain('Blog')
      expect(text).toContain('Preguntas frecuentes')
      expect(text).toContain('Centro de ayuda')
    })

    it('renders Interest links', () => {
      const text = wrapper.text()
      expect(text).toContain('Tarifario tarjeta')
      expect(text).toContain('Estados financieros')
    })

    it('all links have href attribute', () => {
      const links = wrapper.findAll('a')
      links.wrappers.forEach((link: Wrapper<Vue>) => {
        expect(link.attributes('href')).toBeDefined()
      })
    })

    it('links have hover effects', () => {
      const links = wrapper.findAll('a')
      const linkWithHover = links.wrappers.find((link: Wrapper<Vue>) =>
        link.classes().includes('hover:underline')
      )
      expect(linkWithHover).toBeDefined()
    })
  })

  describe('structure', () => {
    it('has blue background', () => {
      const footer = wrapper.find('footer')
      expect(footer.classes()).toContain('bg-global-blue')
    })

    it('has top CTA section', () => {
      const ctaSection = wrapper.find('.divide-y')
      expect(ctaSection.exists()).toBe(true)
    })

    it('has links flex section', () => {
      const flexSection = wrapper.find('.flex.flex-col')
      expect(flexSection.exists()).toBe(true)
    })

    it('has proper spacing', () => {
      const sections = wrapper.findAll('.py-8')
      expect(sections.length).toBeGreaterThan(0)
    })
  })

  describe('styling', () => {
    it('has white text', () => {
      const whiteText = wrapper.findAll('.text-white')
      expect(whiteText.length).toBeGreaterThan(0)
    })

    it('CTA button has proper styling', () => {
      const buttons = wrapper.findAll('a')
      const ctaButton = buttons.wrappers.find((btn: Wrapper<Vue>) =>
        btn.text().includes('Descarga la App')
      )
      expect(ctaButton).toBeDefined()
      expect(ctaButton?.classes()).toContain('bg-white')
      expect(ctaButton?.classes()).toContain('text-global-blue-dark')
      expect(ctaButton?.classes()).toContain('font-semibold')
      expect(ctaButton?.classes()).toContain('rounded-full')
    })

    it('has divider classes', () => {
      const dividers = wrapper.findAll('.divide-y')
      expect(dividers.length).toBeGreaterThan(0)
    })

    it('column headers are bold', () => {
      const headers = wrapper.findAll('h4')
      headers.wrappers.forEach((header: Wrapper<Vue>) => {
        expect(header.classes()).toContain('font-bold')
      })
    })
  })

  describe('responsive design', () => {
    it('has responsive flex classes', () => {
      const flex = wrapper.find('.flex.flex-col')
      expect(flex.exists()).toBe(true)
      expect(flex.classes().some((c: string) => c.includes('lg:flex-row'))).toBe(true)
    })

    it('has responsive text sizes', () => {
      const heading = wrapper.find('h3')
      expect(heading.classes().some((c: string) => c.includes('text-'))).toBe(true)
    })

    it('has responsive padding', () => {
      const footer = wrapper.find('footer')
      const container = footer.find('.px-4')
      expect(container.exists()).toBe(true)
    })

    it('CTA section is responsive flex', () => {
      const cta = wrapper.find('.flex.flex-col')
      expect(cta.exists()).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('has semantic footer element', () => {
      expect(wrapper.element.tagName.toLowerCase()).toBe('footer')
    })

    it('has semantic headings', () => {
      const h3 = wrapper.find('h3')
      const h4 = wrapper.find('h4')

      expect(h3.exists()).toBe(true)
      expect(h4.exists()).toBe(true)
    })

    it('logo has alt text', () => {
      const logo = wrapper.find('img')
      expect(logo.attributes('alt')).toBeDefined()
    })

    it('links have descriptive text', () => {
      const links = wrapper.findAll('a')
      links.wrappers.forEach((link: Wrapper<Vue>) => {
        expect(link.text().trim().length).toBeGreaterThan(0)
      })
    })

    it('button has clear label', () => {
      const buttons = wrapper.findAll('a')
      const downloadButton = buttons.wrappers.find((btn: Wrapper<Vue>) =>
        btn.text().includes('Descarga la App')
      )
      expect(downloadButton).toBeDefined()
      expect(downloadButton?.text()).toContain('Descarga la App')
    })
  })

  describe('content', () => {
    it('displays correct CTA text', () => {
      const h3 = wrapper.find('h3')
      expect(h3.text()).toBe('Fácil, rápido y económico')
    })

    it('has all column headers in uppercase', () => {
      const headers = wrapper.findAll('h4')
      headers.wrappers.forEach((header: Wrapper<Vue>) => {
        const text = header.text()
        expect(text).toBe(text.toUpperCase())
      })
    })

    it('renders organized link lists', () => {
      const lists = wrapper.findAll('ul')
      expect(lists.length).toBe(4)
    })
  })
})
