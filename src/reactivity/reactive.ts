
import {mutableHandler,readonlyHandles} from "./baseHandlers"

export const enum ReactFlags {
  IS_REACTIVER="__v_isReactive",
  IS_READONLY="__v_isReadonly"
}

export function reactive(raw) {
 return  createActiveObject(raw, mutableHandler)
}
export function readonly(raw) {
  return createActiveObject(raw,readonlyHandles)
}
export function isReactive(value){
  return  !!value[ReactFlags.IS_REACTIVER]
} 
export function isReadonly(value){
   return !!value[ReactFlags.IS_READONLY]
}
function createActiveObject(raw:any,baseHandlers:any){
   return new Proxy(raw, baseHandlers)
}