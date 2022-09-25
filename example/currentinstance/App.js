import { h ,getCurrentInstance} from "../../lib/mini-vue.esm.js";
import { Foo } from "./Foo.js"
export const App = {
  render() {
    // const app = h('div', {}, "App");
   
      
    return h('div',{},[h('p',{},'currentInstance demo'),h(Foo)])
      
    
  },
  setup() {
    const instance=getCurrentInstance();
    console.log("appinstance",instance);
    return {
      msg: 'mini-vue-fhgfhgfhfh'
    }
  }
}