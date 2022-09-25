import { createVNode } from "../vnode";



export function renderSlots(slots,nameSlot){
  const slot=slots[nameSlot];
  if(slot){
    return createVNode('div',{},slot)
  }
  
}