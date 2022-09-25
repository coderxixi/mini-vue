import { h, renderSlots } from "../../lib/mini-vue.esm.js"

export const Foo = {
  render() {
    const foo = h('p', {}, 'fosdfsdfdso')
    console.log("this.$slots", this.$slots);
   
    return h('div', { class: 'id' }, [renderSlots(this.$slots, 'header'), foo, renderSlots(this.$slots, 'footer')])
  },
  setup(props, { emit }) {
    return {

    }

  }
}