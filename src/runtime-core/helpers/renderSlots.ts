import { createVNode } from "../vnode";
import {Fragment} from "../vnode"


export function renderSlots(slots,nameSlot,props){
  const slot=slots[nameSlot];
  if(slot){
    if(typeof slot =="function"){
      return createVNode(Fragment,{},slot(props))
    }
   
  }
  
}