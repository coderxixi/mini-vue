import {createVNode} from "./vnode"
import {render} from "./render"
export function createApp(rootComponent){
  return {
    mount(rootComponent){
      //先转化虚拟节点(vnode) 

      const vnode=createVNode(rootComponent);

      render(vnode,rootComponent)
    }
  }

}

