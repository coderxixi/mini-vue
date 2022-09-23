
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, rootContainer) {
  console.log('===render执行挂载逻辑===');
  //执行挂载逻辑
  path(vnode,rootContainer)
}
//挂载逻辑
function path(vnode, rootContainer) {
  //判断是不是DOM元素是DOM元素就处理DOM是组件就处理组件
console.log('===path根据type类型的不同来处理不同类型的vnode===');

  let { type } = vnode
  if (typeof type == "string") {
    //todo 处理 element 类型
    processElement(vnode, rootContainer)
  } else if (typeof type ==="object") {
    //todo 处理 component 类型
    processComponent(vnode, rootContainer)
  }
}
//处理DOM类型函数
function processElement(vnode: any, rootContainer: any) {
  console.log("=== processElement  处理element 类型===");
  
  mountElement(vnode,rootContainer)
  
}
//挂载DOM
function mountElement(vnode:any,rootContainer:any) {
  let {type,props,children}=vnode;
  let divType=document.createElement(type);
  divType.innerHTML=children
  rootContainer.appendChild(divType)
  console.log("divType",divType,vnode,rootContainer);
  
}
//处理组件函数
function processComponent(vnode: any, rootContainer: any) {
  console.log("===processComponent  处理组件类型函数我是组件对象====",vnode);
  mountComponent(vnode, rootContainer)
}
//挂载组件
function mountComponent(vnode: any, rootContainer: any) {
  //拿到组件实例
  const instance = createComponentInstance(vnode);
  console.log("===拿到组件实例对象===",instance);
  
  //传入件实例 初始化组件
  setupComponent(instance);
  setupRenderEffect(instance, rootContainer)
}
//调用render函数
function setupRenderEffect(instance: any, rootContainer: any) {
  //拿到虚拟节点树
  const subTree = instance.render();
  //将虚拟节点转成真实的DOM元素
  path(subTree, rootContainer)
}





