import { h, getCurrentInstance} from "../../lib/mini-vue.esm.js"

export const Foo = {
  render() {
    const foo = h('p', {}, 'fosdfsdfdso')
    console.log("this.$slots", this.$slots);
   
    return h('div', { class: 'id' },'foo')
  },
  setup(props, { emit }) {
    const instance=getCurrentInstance();
    console.log('fooinstance',instance);
    return {

    }

  }
}