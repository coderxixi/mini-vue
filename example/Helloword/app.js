import {h} from "../../lib/mini-vue.esm.js"
window.self=null;
export const App={
   render(){
    window.self=this;
      return h(
        'div',
        {id:'idApp',class:['red','hard']},
        //string类型
        // `你好 ${this.msg}`,
        //数组类型
        [h('p',{class:'red',onClick:()=>{
          console.log("点击事件");
        }},"hi 我是第个p"),h('p',{class:'blue',onClick:()=>{
          console.log('asdfasd',this);
        }},'hi,我是第二个p')],
        )
   },
   setup(){
    return {
      msg:'mini-vue-fhgfhgfhfh'
    }
   }
}