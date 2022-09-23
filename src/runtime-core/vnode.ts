export function createVNode(type,props?,children?){
  console.log("====createVNode创建vnode===");
  
  const vnode={
    type,
    props,
    children
  }
  console.log('===返回vnode===',vnode);
  
  return vnode
}