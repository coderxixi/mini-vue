
import {createComponentInstance,setupComponent} from "./component"

export function render(vnode,rootComponent){
  path(vnode,rootComponent)
}
//挂载逻辑
function path(vnode,rootComponent){
     //处理组件逻辑
     processComponent(vnode,rootComponent)
     //判断是不是DOM元素
}
//处理组件函数
function processComponent(vnode: any, rootComponent: any) {
    mountComponent(vnode,rootComponent)
}

//挂载组件
function mountComponent(vnode: any,rootComponent:any){
   //拿到组件实例
  const instance= createComponentInstance(vnode);
  //传入件实例 初始化组件
  setupComponent(instance);
  setupRenderEffect(instance,rootComponent)
}
//调用render函数
function setupRenderEffect(instance: any,rootComponent:any) {
  //拿到虚拟节点树
  const subTree=instance.render();
  //将虚拟节点转成真实的DOM元素
  path(subTree,rootComponent)
}

