//创建组件实例函数
export function createComponentInstance(vnode: any) {
  console.log("===创建组件实例===", vnode);
  const component = {
    vnode,
    type: vnode.type
  }
  console.log("===返回组件实例===",component);
  return component
}
export function setupComponent(instance) {
  console.log("===初始化组件实例对象===",instance);
   // todo initProps
  // todo initSlots
  // 拿到setup 中的返回值
  setupStatefulCompontent(instance)
}
function setupStatefulCompontent(instance: any) {
  const component = instance.vnode.type;
  const { setup } = component;
  //判断是否用了setup 
  if (setup) {
    // 拿到setup中返回的值
    const setupResult = setup();
    //对setup中的返回值进行处理
    handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance: any, setupResult: any) {
  // todo type object
  if (typeof setupResult == "object") {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
  // todo type function
}



function finishComponentSetup(instance: any) {
  console.log("====finishComponentSetup=====");
  
  const component = instance.type
  instance.render = component.render
}
