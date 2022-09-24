export function emit(instance, event,...arg) {
  console.log("emit", event);
  //拿到组件的props 判断组件的props是否有和event 相同的key
  const { props } = instance;
  console.log('props', props);
  //将函数名转成驼峰式命名
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const toHandlerKey = (str: string) => {
    return str ? `on${capitalize(str)}` : ''
  }
  const handlerName = toHandlerKey(event)
  console.log("handlerName",handlerName);
  
  //TPP 开发思想 先写一个特定的行为 再重构通用的行为
  const handler = props[handlerName];
  handler && handler(...arg)
}