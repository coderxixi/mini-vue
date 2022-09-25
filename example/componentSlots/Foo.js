import {h,renderSlots} from "../../lib/mini-vue.esm.js"

export const Foo={
 render(){
  const foo=h('p',{},'fosdfsdfdso')
  console.log("this.$slots",this.$slots);
  renderSlots()
  return h('div',{class:'id'},[foo,renderSlots(this.$slots)])
 },
 setup(props,{emit}){
  return {
   
  }
   
 }
}