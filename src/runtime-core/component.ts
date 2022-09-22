//创建组件实例函数
export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type
  }

  return component
}

export function setupComponent(instance) {
  // todo initProps

  // todo initSlots

  // 拿到setup 中的返回值
  setupStatefulCompontent(instance)
}

function setupStatefulCompontent(instance: any) {

  const component = instance.vnode.type;
  const { setup } = component;
  if (setup) {
    const setupResult = setup();

    //处理setup中的返回值
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
  const component = instance.type

  if (!component.render) {
    instance.render = component.render
  }
}

