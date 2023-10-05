import { shallowMount } from '@vue/test-utils'
import InputButton from '@/components/InputButton.vue'

const baseClasses = [
  'cursor-pointer',
  'rounded-full',
  'px-4',
  'py-2',
  'text-sm',
  'font-semibold',
  'shadow',
  'active:shadow-inner'
]

describe('InputButton', () => {
  const buildWrapper = (options) => shallowMount(InputButton, options)

  it('displays a button with the base classes', () => {
    const wrapper = buildWrapper()

    expect(wrapper.vm.$el.tagName).toBe('BUTTON')

    expect(wrapper.classes()).toEqual(expect.arrayContaining(baseClasses))
  })

  describe('prop:variant', () => {
    describe.each([
      [undefined, 'default'],
      ['primary', 'primary'],
      ['danger', 'danger']
    ])('%s', (variant, variantClass) => {
      it(`applies the ${variant || 'default'} variant classes`, () => {
        const button = buildWrapper({ props: { variant } }).find('button')

        expect(button.classes()).toContain(variantClass)
      })
    })
  })

  describe('prop:href', () => {
    describe('with a link', () => {
      it('displays a link instead of a button', () => {
        const wrapper = buildWrapper({ props: { href: 'https://fake.com' } })

        expect(wrapper.vm.$el.tagName).toBe('A')

        expect(wrapper.find('a').attributes('href')).toBe('https://fake.com')
      })
    })
  })

  describe('slot:default', () => {
    describe('without content', () => {
      it('displays an empty button', () => {
        expect(buildWrapper().find('button').text()).toBe('')
      })
    })

    describe('with text', () => {
      it('displays a button with the text', () => {
        expect(
          buildWrapper({
            slots: {
              default: 'Some text'
            }
          })
            .find('button')
            .text()
        ).toBe('Some text')
      })
    })
  })

  describe('samples', () => {
    it('displays an "OK" primary button', () => {
      const button = buildWrapper({ props: { variant: 'primary' }, slots: { default: 'OK' } }).find(
        'button'
      )

      expect(button.text()).toBe('OK')

      expect(button.classes()).toEqual(expect.arrayContaining([...baseClasses, 'primary']))
    })

    it('displays a "Delete" danger button', () => {
      const button = buildWrapper({
        props: { variant: 'danger' },
        slots: { default: 'Delete' }
      }).find('button')

      expect(button.text()).toBe('Delete')

      expect(button.classes()).toEqual(expect.arrayContaining([...baseClasses, 'danger']))
    })

    it('displays a "Sign up" primary link', () => {
      const link = buildWrapper({
        props: { variant: 'primary', href: '/sign-up' },
        slots: { default: 'Sign up' }
      }).find('a')

      expect(link.attributes('href')).toBe('/sign-up')

      expect(link.text()).toBe('Sign up')

      expect(link.classes()).toEqual(expect.arrayContaining([...baseClasses, 'primary']))
    })
  })
})
