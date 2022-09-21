import { track, trigger } from "./effect"

const get=createGetter();
const set =createSetter();
const readonlyGet=createGetter(true)
function createGetter(isReaodonly=false){
  return function get(target,key){
     const res = Reflect.get(target, key);
     // todo 在这里进行依赖收集
     if(!isReaodonly){
        track(target, key)
     }
     return res
  }
}


 function createSetter(){
  return function set(target,key,value){
     const res = Reflect.set(target, key, value);
     // todo 在这里触发依赖
     trigger(target, key)
     return res
  }
  
}


export const mutableHandler={
  get,
  set
}

export const readonlyHandles={
  get:readonlyGet,
  set(target,key,value){
    console.warn(`key:${key} set 失败 因为target是readonly ${target}`);
    return true
  }
}