
import {mutableHandler,readonlyHandles} from "./baseHandlers"
export function reactive(raw) {
 return  createActiveObject(raw, mutableHandler)
}
export function readonly(raw) {
  return createActiveObject(raw,readonlyHandles)
}


function createActiveObject(raw:any,baseHandlers:any){
   return new Proxy(raw, baseHandlers)
}