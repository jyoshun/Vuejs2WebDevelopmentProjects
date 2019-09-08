import BaseButton from './BaseButton.vue'
import { shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

describe('BaseButton', () => {
  test('click event', () => {
    const wrapper = shallow(BaseButton)
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  test('snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(BaseButton, {
      // prop值
      propsData: {
        icon: 'add',
        disabled: true,
        badge: 3,
      },
      // 插槽内容
      slots: {
        default: '<span>Add Item</span>',
      },
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
