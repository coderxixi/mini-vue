import { ShapeFlages } from "../shared/ShapeFlages"
export function getShapeFlag(type) {
  return typeof type == 'string' ? ShapeFlages.element : ShapeFlages.statefule_component
} 

export const Fragment=Symbol('Fragment');
export const Text=Symbol('Text')
export function createVNode(type, props?, children?) {
  console.log("====createVNode创建vnode===");
  const vnode = {
    type,
    props,
    children,
    ShapeFlage: getShapeFlag(type),
    el: null
  }
  if (typeof children == "string") {
    vnode.ShapeFlage = vnode.ShapeFlage| ShapeFlages.text_chilren
  } else if (Array.isArray(children)) {
    vnode.ShapeFlage = vnode.ShapeFlage | ShapeFlages.array_children
  }
//children 是一个函数式组件
  if(vnode.ShapeFlage&ShapeFlages.statefule_component){
    if(typeof children=="object"){
      vnode.ShapeFlage==ShapeFlages.slot_children
    }
  }
  console.log('===返回vnode===', vnode);

  return vnode
}

export function createTextVnode(text){
  return createVNode(Text,{},text)
}


