import { trackEffects, triggerEffect, isTracking } from "./effect";
import { hasChage, isObject } from "../shared";
import { reactive } from "./reactive"
class RefImpl {
  private _value: any;
  public dep;
  private _rawValue: any;
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