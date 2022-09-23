import {h} from "../../lib/mini-vue.esm.js"

export const App={
   render(){
      return h(
        'div',
        {id:'idApp',class:['red','hard']},
        //string类型
        // '你好 mini-vue'
        //数组类型
        [h('p',{class:'red'},"hi 我是第个p"),h('p',{class:'blue'},'hi,我是第二个p')],
        )
   },
   setup(){
    return {
      msg:'mini-vue'
    }
   }
}