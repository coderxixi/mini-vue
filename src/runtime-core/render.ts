
import { createComponentInstance, setupComponent } from "./component"
import { isObject } from "../shared/index"
export function render(vnode, rootContainer) {
  console.log('===render执行挂载逻辑===');
  //执行挂载逻辑
  path(vnode, rootContainer)
}
//挂载逻辑
function path(vnode, rootContainer) {
  //判断是不是DOM元素是DOM元素就处理DOM是组件就处理组件
  console.log('===path根据type类型的不同来处理不同类型的vnode===');

  let { type } = vnode
  if (typeof type == "string") {
    //todo 处理 element 类型
    processElement(vnode, rootContainer)
  } else if (isObject(type)) {
    //todo 处理 component 类型
    processComponent(vnode, rootContainer)
  }
}
//处理DOM类型函数
function processElement(vnode: any, rootContainer: any) {
  // todo分为初始化过程和更新逻辑
  console.log("=== processElement  处理element 类型===");
  //初始化逻辑
  mountElement(vnode, rootContainer)

}
//挂载DOM
function mountElement(vnode: any, rootContainer: any) {
  let { type, props, children } = vnode;
  //todo children分两种情况 一种是string类型 一种是数组类型
  let el = document.createElement(type);
  if (Array.isArray(children)) {
    //因为children里面每一个都是虚拟节点还需要调用path函数
    mountChildren(children,el)
  } else {
    el.textContent = children;
  }
  //处理props
  for (const key in props) {
    //拿到props中的属性值
    const val = props[key]
    //设置DOM元素的属性
    el.setAttribute(key, val)
  }
  rootContainer.appendChild(el)
  console.log("divType", el, vnode, rootContainer);

}
//处理children
function mountChildren(children,el){
  children.forEach(v => {
    path(v, el)
  })
}
//处理组件函数
function processComponent(vnode: any, rootContainer: any) {
  console.log("===processComponent  处理组件类型函数我是组件对象====", vnode);
  mountComponent(vnode, rootContainer)
}
//挂载组件
function mountComponent(vnode: any, rootContainer: any) {
  //拿到组件实例
  const instance = createComponentInstance(vnode);
  console.log("===拿到组件实例对象===", instance);

  //传入件实例 初始化组件
  setupComponent(instance);
  setupRenderEffect(instance, rootContainer)
}
//调用render函数
function setupRenderEffect(instance: any, rootContainer: any) {

  const {proxy}=instance
  //拿到虚拟节点树
  const subTree = instance.render.call(proxy);
  //将虚拟节点转成真实的DOM元素
  path(subTree, rootContainer)
}





