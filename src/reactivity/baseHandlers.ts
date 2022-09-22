import { track, trigger } from "./effect"
import { ReactFlags, reactive, readonly } from "./reactive"
import { isObject } from "../shared/index"
import {extend} from "../shared"
const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
const shallowReactiveGet=createGetter(true,true)
function createGetter(isReaodonly = false,shallow=false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
   
    // todo 在这里进行依赖收集
    if (key == ReactFlags.IS_REACTIVER) {
      return !isReaodonly
    } else if (key == ReactFlags.IS_READONLY) {
      return isReaodonly
    }
    if(shallow) {
      return res
    }
    // 判断 res 是不是对象
    if (isObject(res)) {
      return isReaodonly ? readonly(res) : reactive(res)
    }

    if (!isReaodonly) {
      track(target, key)
    }
    return res
  }
}


function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    // todo 在这里触发依赖
    trigger(target, key)
    return res
  }

}


export const mutableHandler = {
  get,
  set
}

export const readonlyHandles = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} set 失败 因为target是readonly ${target}`);
    return true
  }
}

export const shallowReactiveHandles=extend({},readonlyHandles,{
  get:shallowReactiveGet
})