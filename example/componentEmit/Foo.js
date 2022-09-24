import {h} from "../../lib/mini-vue.esm.js"

export const Foo={
 render(){
  const btn=h('button',{
    onClick:this.emitAdd
  },'emitAdd')

  const Foo=h('p',{},'foo')
  return h('div',{class:'id'},[Foo,btn])
 },
 setup(props,{emit}){
  const emitAdd=()=>{
    console.log("emitAdd");
    emit('add',1,2)
  }
  console.log("foo",props);
  return {
    emitAdd
  }
   
 }
}