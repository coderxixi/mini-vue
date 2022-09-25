export function initSlots(instance: any, children: any) {
  // children 是对象类型
  normalizeObjectSlots(instance,children)
}
function normalizeObjectSlots(instance,children){
  const slots={}
  for (const key in children) {
    const value = children[key];
    slots[key]=normalizeSlotValue(value)
}
  return instance.slots=slots

}

function normalizeSlotValue(value){
  return Array.isArray[value] ?value:[value]
}
