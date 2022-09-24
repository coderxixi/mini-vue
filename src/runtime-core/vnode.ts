import { ShapeFlages } from "../shared/ShapeFlages"
export function getShapeFlag(type) {
  return typeof type == 'string' ? ShapeFlages.element : ShapeFlages.statefule_component
}
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
  console.log('===返回vnode===', vnode);

  return vnode
}


