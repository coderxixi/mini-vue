import { createVNode } from "../vnode";



export function renderSlots(slots,nameSlot,props){
  const slot=slots[nameSlot];
  if(slot){
    if(typeof slot =="function"){
      return createVNode('div',{},slot(props))
    }
   
  }
  
}