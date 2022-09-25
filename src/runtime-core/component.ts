import {publicInstanceProxyHandlers} from "./componentPublicInstance";
import { shallowReactive } from "../reactivity/reactive"
import {initProps} from "./componentProps";
import {emit} from "./compoentEmit";
import {initSlots} from "./componentSlots";

//创建组件实例函数
export function createComponentInstance(vnode:any,parent) {
  console.log("parent",parent);
  
  console.log("===创建组件实例===", vnode);
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    el:null,
    props:{},
    slots:{},
    provides:parent?parent.provides:{},
    parent,
    emit:()=>{}
  }
  component.emit=emit.bind(null,component) as any
  console.log("===返回组件实例===", component);
  return component;
}
export function setupComponent(instance) {
  console.log("===初始化组件实例对象===", instance);
  // todo initProps
  initProps(instance,instance.vnode.props)
  // todo initSlots
  initSlots(instance,instance.vnode.children)
  // 拿到setup 中的返回值
  setupStatefulCompontent(instance)
}
function setupStatefulCompontent(instance: any) {
  const component = instance.vnode.type;
  instance.proxy = new Proxy({_:instance}, publicInstanceProxyHandlers)
  const { setup } = component;
  //判断是否用了setup 
  if (setup) {
    setCurrentInstance(instance)
    // 拿到setup中返回的值
    const setupResult = setup(shallowReactive(instance.props),{
      emit:instance.emit
    });
    setCurrentInstance(null)
   
    //对setup中的返回值进行处理
    handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance: any, setupResult: any) {
  // todo type object
  if (typeof setupResult == "object") {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
  // todo type function
}



function finishComponentSetup(instance: any) {
  console.log("====finishComponentSetup=====");

  const component = instance.type;
  instance.render = component.render;
}

//返回当前组件实例对象
let currentInstance=null
export function getCurrentInstance(){
return currentInstance
}


function setCurrentInstance(instance){
  currentInstance=instance
}

