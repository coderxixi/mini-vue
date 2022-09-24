import {h} from "../../lib/mini-vue.esm.js"

export const Foo={
 render(){
  return h('div',{class:'foo'},`foo${this.foo}`)
 },
 setup(props){
    console.log("foo",props);
 }
}