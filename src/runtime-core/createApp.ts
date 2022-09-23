import {createVNode} from "./vnode"
import {render} from "./render"
export function createApp(rootComponent){
  console.log("===createAPP===");
  
  return {
    mount(rootContainer){
      console.log("=====mount====");
      
      //先转化虚拟节点(vnode) 
      const vnode=createVNode(rootComponent);
      //渲染vnode
      render(vnode,rootContainer)
    }
  }

}

