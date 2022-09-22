import { trackEffects, triggerEffect, isTracking } from "./effect";
import { hasChage, isObject } from "../shared";
import { reactive } from "./reactive"
class RefImpl {
  private _value: any;
  public dep;
  private _rawValue: any;
  public __v_isRef=true;
  constructor(value) {
    this._rawValue = value
    //判断value是不是对象 
    this._value = isObject(value) ? reactive(value) : value;
    this.dep = new Set()
  }
  get value() {
    if (isTracking()) {
      trackEffects(this.dep)
    }
    return this._value
  }
  set value(newValue) {
    // 一定要先去修改了
    if (hasChage(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = isObject(newValue) ? reactive(newValue) : newValue
      triggerEffect(this.dep)
    }
  }
}
export function ref(value) {
  return new RefImpl(value)
}
export function isRef(ref){
  return !!ref.__v_isRef;
}

export function unRef(ref){
  return isRef(ref)?ref.value:ref
}

export function proxyRefs(infoRef){
   return new Proxy(infoRef,{
    get(target,key){
     return  unRef(Reflect.get(target,key)) 
    },
    set(target,key,value){
      if(isRef(target[key])&&!isRef(value)){
       return target[key].value=value

      }else{
        return Reflect.set(target,key,value)
      }
    }
   })
}