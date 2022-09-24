import { h } from "../../lib/mini-vue.esm.js";
import { Foo } from "./Foo.js"
export const App = {
  render() {
    return h(
      'div',
      { id: 'idApp', class: ['red', 'hard'] },
      //string类型
      // `你好 ${this.msg}`,
      //数组类型
     [h(Foo,{
      onAdd:(a,b)=>{
         console.log("onAddsdfsfsdf",a,b);
      }
     },'dsfsdf')] 
    )
  },
  setup() {
    return {
      msg: 'mini-vue-fhgfhgfhfh'
    }
  }
}