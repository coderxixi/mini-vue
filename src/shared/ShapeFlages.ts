export const enum ShapeFlages {
  element=1,//vnode节点是DOM元素类型 0001
  statefule_component=1 << 1,//vnode节点是组件类型 0010
  text_chilren=1 << 2,//vnode节点 chilren 的类型是string 100
  array_children=1 << 3,//vnode节点是 chilren 的类型是array 10000
}