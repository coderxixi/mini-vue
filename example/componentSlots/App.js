import { h ,createTextVnode} from "../../lib/mini-vue.esm.js";
import { Foo } from "./Foo.js"
export const App = {
  render() {
    // const app = h('div', {}, "App");
    const foo=h(Foo,{},{
      header:({age})=> h("p",{class:'di'},"你好啊"),
      footer:({age})=> h('p',{class:'footer'},"你好啊")
       } 
    
      )
    return h(
      'div',
      { id: 'idApp', class: ['red', 'hard'] },
      [foo,createTextVnode('kjhjkghjkhgjka')]
    )
  },
  setup() {
    return {
      msg: 'mini-vue-fhgfhgfhfh'
    }
  }
}