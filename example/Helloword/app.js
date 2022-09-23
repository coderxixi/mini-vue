import {h} from "../../lib/mini-vue.esm.js"

export const App={
   render(){
      return h('div',{color:'red'},'你好 mini-vue')
   },
   setup(){
    return {
      msg:'mini-vue'
    }
   }
}