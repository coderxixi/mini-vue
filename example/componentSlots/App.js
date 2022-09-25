import { h } from "../../lib/mini-vue.esm.js";
import { Foo } from "./Foo.js"
export const App = {
  render() {
    const app = h('div', {}, "App");
    const foo=h(Foo,{},{
      header:h("p",{class:'di'},'插槽header'),
      footer:h('p',{class:'footer'},'插槽footer')
       } 
    
      )
    return h(
      'div',
      { id: 'idApp', class: ['red', 'hard'] },
      [app, foo]
    )
  },
  setup() {
    return {
      msg: 'mini-vue-fhgfhgfhfh'
    }
  }
}