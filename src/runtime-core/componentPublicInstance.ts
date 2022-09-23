
const publicProperiesMap={
  $el:(i)=>i.vnode.el
}



export const publicInstanceProxyHandlers={
  get({_:instance}, key) {
    const { setupState } = instance
    if (key in setupState) {
      return setupState[key]
    }
    const publieGetter=publicProperiesMap[key];
    if(publieGetter){
     return publieGetter(instance)
    }
  },
}