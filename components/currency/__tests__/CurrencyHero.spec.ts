import { mount, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import CurrencyHero from '../CurrencyHero.vue'

describe('CurrencyHero', () => {
  const defaultProps = {
    currency: 'CLP',
    currencyName: 'Peso Chileno',
    currencyFlag: '/images/cl.svg',
    rate: 850.5,
    timestamp: '2024-03-15T14:30:00Z'
  }

  let wrapper: any

  beforeEach(() => {
    wrapper = mount(CurrencyHero as any, {
      propsData: defaultProps
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  describe('props', () => {
    it('accepts required props', () => {
      expect(wrapper.props('currency')).toBe('CLP')
      expect(wrapper.props('currencyFlag')).toBe('/images/cl.svg')
      expect(wrapper.props('rate')).toBe(850.5)
      expect(wrapper.props('timestamp')).toBe('2024-03-15T14:30:00Z')
    })

    it('has default for currencyName', () => {
      const wrapperNoName = mount(CurrencyHero as any, {
        propsData: {
          currency: 'CLP',
          currencyFlag: '/images/cl.svg',
          rate: 850,
          timestamp: '2024-03-15T14:30:00Z'
        }
      })
      expect(wrapperNoName.props('currencyName')).toBe('Peso Chileno')
      wrapperNoName.destroy()
    })

    it('has default for currency', () => {
      expect(wrapper.vm.$options.props.currency.default).toBe('CLP')
    })
  })

  describe('computed properties', () => {
    describe('formattedRate', () => {
      it('formats rate with 2 decimals', () => {
        expect(wrapper.vm.formattedRate).toBe('850.50')
      })

      it('handles integer rate', async () => {
        await wrapper.setProps({ rate: 1000 })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.formattedRate).toBe('1000.00')
      })

      it('rounds to 2 decimals', async () => {
        await wrapper.setProps({ rate: 123.456789 })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.formattedRate).toBe('123.46')
      })

      it('handles zero rate', async () => {
        await wrapper.setProps({ rate: 0 })
        await wrapper.vm.$nextTick()
        // The component treats 0 as falsy, so it returns 'N/A'
        expect(wrapper.vm.formattedRate).toBe('N/A')
      })

      it('returns N/A for null rate', async () => {
        await wrapper.setProps({ rate: null })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.formattedRate).toBe('N/A')
      })

      it('returns N/A for undefined rate', async () => {
        await wrapper.setProps({ rate: undefined })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.formattedRate).toBe('N/A')
      })
    })

    describe('formattedDate', () => {
      it('formats date correctly', () => {
        const result = wrapper.vm.formattedDate
        expect(result).toContain('dólar hoy')
        expect(result).toContain('de')
        expect(result).toContain('las')
        expect(result).toContain('UTC')
      })

      it('includes weekday', () => {
        const result = wrapper.vm.formattedDate.toLowerCase()
        const weekdays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
        const hasWeekday = weekdays.some((day) => result.includes(day))
        expect(hasWeekday).toBe(true)
      })

      it('includes month name', () => {
        const result = wrapper.vm.formattedDate.toLowerCase()
        expect(result).toContain('marzo')
      })

      it('includes day number', () => {
        const result = wrapper.vm.formattedDate
        expect(result).toContain('15')
      })

      it('includes time in UTC', () => {
        const result = wrapper.vm.formattedDate
        expect(result).toMatch(/\d{2}:\d{2}/)
        expect(result).toContain('UTC')
      })

      it('pads hours and minutes with zeros', async () => {
        await wrapper.setProps({ timestamp: '2024-03-15T05:05:00Z' })
        await wrapper.vm.$nextTick()
        const result = wrapper.vm.formattedDate
        expect(result).toContain('05:05')
      })
    })
  })

  describe('rendering', () => {
    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('displays formatted rate in heading', () => {
      const heading = wrapper.find('h1')
      expect(heading.text()).toContain('850.50')
      expect(heading.text()).toContain('CLP')
    })

    it('displays formatted date', () => {
      expect(wrapper.html()).toContain('dólar hoy')
    })

    it('renders US flag', () => {
      const images = wrapper.findAll('img')
      const usFlag = images.wrappers.find((img: Wrapper<Vue>) =>
        img.attributes('src')?.includes('usa')
      )
      expect(usFlag).toBeDefined()
    })

    it('renders currency flag with correct src', () => {
      const currencyFlags = wrapper.findAll('img[alt="CLP"]')
      expect(currencyFlags.length).toBeGreaterThan(0)
    })

    it('renders arrow image', () => {
      const arrows = wrapper.findAll('img[alt="flag"]')
      const arrow = arrows.wrappers.find((img: Wrapper<Vue>) =>
        img.attributes('src')?.includes('arrow')
      )
      expect(arrow).toBeDefined()
    })

    it('renders stand image', () => {
      const stand = wrapper.find('img[alt="stand"]')
      expect(stand.exists()).toBe(true)
      expect(stand.attributes('src')).toContain('stand')
    })
  })

  describe('structure', () => {
    it('has blue background section', () => {
      const section = wrapper.find('section')
      expect(section.classes()).toContain('bg-global-blue')
    })

    it('has responsive flex layout', () => {
      const flexContainer = wrapper.find('.flex.flex-col')
      expect(flexContainer.exists()).toBe(true)
    })

    it('has relative positioning for flag container', () => {
      const flagContainer = wrapper.find('.relative.flex')
      expect(flagContainer.exists()).toBe(true)
    })
  })

  describe('styling', () => {
    it('has white text in heading', () => {
      const heading = wrapper.find('h1')
      expect(heading.classes()).toContain('text-white')
    })

    it('has proper text sizes', () => {
      const heading = wrapper.find('h1')
      expect(heading.classes()).toContain('text-3xl')
    })

    it('has extrabold font weight for rate', () => {
      const rateSpan = wrapper.find('.font-extrabold')
      expect(rateSpan.exists()).toBe(true)
    })
  })

  describe('reactivity', () => {
    it('updates formatted rate when rate prop changes', async () => {
      expect(wrapper.vm.formattedRate).toBe('850.50')

      await wrapper.setProps({ rate: 900.25 })
      expect(wrapper.vm.formattedRate).toBe('900.25')
    })

    it('updates displayed rate in template when prop changes', async () => {
      await wrapper.setProps({ rate: 999.99 })
      const heading = wrapper.find('h1')
      expect(heading.text()).toContain('999.99')
    })

    it('updates currency display when currency prop changes', async () => {
      await wrapper.setProps({ currency: 'ARS' })
      const heading = wrapper.find('h1')
      expect(heading.text()).toContain('ARS')
    })
  })

  describe('accessibility', () => {
    it('has alt text for all images', () => {
      const images = wrapper.findAll('img')
      images.wrappers.forEach((img: Wrapper<Vue>) => {
        expect(img.attributes('alt')).toBeDefined()
        expect(img.attributes('alt')).not.toBe('')
      })
    })

    it('has loading="lazy" for images', () => {
      const images = wrapper.findAll('img')
      images.wrappers.forEach((img: Wrapper<Vue>) => {
        expect(img.attributes('loading')).toBe('lazy')
      })
    })

    it('has semantic heading structure', () => {
      const h1 = wrapper.find('h1')
      expect(h1.exists()).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('handles very large rates', async () => {
      await wrapper.setProps({ rate: 999999.99 })
      expect(wrapper.vm.formattedRate).toBe('999999.99')
    })

    it('handles very small rates', async () => {
      await wrapper.setProps({ rate: 0.01 })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.formattedRate).toBe('0.01')
    })

    it('handles different timestamps', async () => {
      await wrapper.setProps({ timestamp: '2024-12-31T23:59:59Z' })
      const result = wrapper.vm.formattedDate
      expect(result).toBeDefined()
      expect(result).toContain('UTC')
    })
  })
})
