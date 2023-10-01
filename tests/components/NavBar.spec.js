import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'
import AppLogo from '@/components/AppLogo.vue'
import MockRouterLink from '@tests/mocks/RouterLink.vue'

const baseClasses = [
  'rounded-lg',
  'border',
  'border-gray-100',
  'bg-white',
  'px-5',
  'py-4',
  'shadow-md'
]

describe('NavBar', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallowMount(NavBar, {
      global: {
        stubs: {
          RouterLink: MockRouterLink
        }
      }
    })
  })

  it('displays a header element', () => {
    expect(wrapper.vm.$el.tagName).toBe('HEADER')
  })

  it('applies the base classes', () => {
    expect(wrapper.classes()).toEqual(expect.arrayContaining(baseClasses))
  })

  it('displays the AppLogo with a link to home', () => {
    const link = wrapper.findComponent(MockRouterLink)

    expect(link.vm.$props.to).toEqual({ name: 'home' })

    expect(link.findComponent(AppLogo).exists()).toBeTruthy()
  })

  describe('slot:default', () => {
    it('displays the content', () => {
      const wrapper = shallowMount(NavBar, {
        global: {
          stubs: {
            RouterLink: MockRouterLink
          }
        },

        slots: {
          default: '<div data-test="some-content">Content</div>'
        }
      })

      expect(wrapper.find('[data-test="some-content"]').exists()).toBeTruthy()
    })
  })
})
