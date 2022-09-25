
const publicProperiesMap={
  $el:(i)=>i.vnode.el,
  $slots:(i)=>i.slots
}

import {hasOwn} from "../shared/index"

export const publicInstanceProxyHandlers={
  get({_:instance}, key) {
    const { setupState ,props} = instance
    //判断访问的key 是不是在steup中的返回值
    if(hasOwn(setupState,key)){
      return setupState[key]
    }else if(hasOwn(props,key)){
         //判断访问的 key 是不是在props中
      return  props[key]
    }
 
    const publieGetter=publicProperiesMap[key];
    if(publieGetter){
     return publieGetter(instance)
    }
  },
}