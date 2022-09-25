// 
import {h,provide,inject} from "../../lib/mini-vue.esm.js";
export const Provider={
  name:'provider',
  setup(){
    provide('foo','fooval');
    provide('bar','barval');
    
  },
  render(){
    return h('div',{},[('p',{},'provider'),h(ProviderTwo)])
  }
}

export const ProviderTwo={
  name:'providerTwo',
  setup(){
    provide('foo','fooTwoVale')
     const foo=inject('foo');

     return {
      foo
     }

  },
  render(){
    return h('div',{class:'ProviderTwo'},[h('p',{},'providerTwo:'+this.foo),h(Consumer)])
  }
}

const Consumer={
  name:'Consumer',
  setup(){
   const foo=inject('foo');
   const bar=inject('bar');
   return {
    foo,
    bar
   }
  },
  render(){
    return h('div',{},`Consumer:-${this.foo}-${this.bar}`)
  }
}