import { mount, Wrapper } from '@vue/test-utils'
import Navbar from '../Navbar.vue'

describe('Navbar', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = mount(Navbar as any, {
      propsData: {
        countryFlag: 'mock-flag.svg' // Provide mock value to avoid loading default
      },
      stubs: {
        NuxtLink: {
          template: '<a><slot /></a>',
          props: ['to']
        }
      },
      mocks: {
        $route: {
          path: '/'
        }
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the navbar component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the Global66 logo', () => {
    const logo = wrapper.find('img[alt="Global66"]')
    expect(logo.exists()).toBe(true)
  })

  it('has navigation tabs for PERSONAS and EMPRESAS', () => {
    const personasTab = wrapper.find('.text-global-green-alt')
    expect(personasTab.text()).toBe('PERSONAS')

    const empresasText = wrapper.html()
    expect(empresasText).toContain('EMPRESAS')
  })

  it('has navigation menu items', () => {
    const html = wrapper.html()
    expect(html).toContain('Productos')
    expect(html).toContain('Beneficios')
    expect(html).toContain('Ayuda')
  })

  it('displays country selector', () => {
    const countrySelector = wrapper.find('img[alt="country"]')
    expect(countrySelector.exists()).toBe(true)
    expect(countrySelector.attributes('src')).toBe('mock-flag.svg')
  })

  it('has auth buttons', () => {
    const html = wrapper.html()
    expect(html).toContain('Iniciar sesión')
    expect(html).toContain('Crear cuenta')
  })
})
