import { ShapeFlages } from "../shared/ShapeFlages"

export function initSlots(instance: any, children: any) {
  console.log("initSlots",instance,children);
  
  // children 是对象类型
  const { vnode } = instance
  if (vnode.ShapeFlage&ShapeFlages.slot_children) {
    normalizeObjectSlots(children,instance.slots )
  }
  normalizeObjectSlots(children,instance.slots )

}
function normalizeObjectSlots(children,slots) {
  for (const key in children) {
    const value = children[key];
    slots[key] = (props) => normalizeSlotValue(value(props))
  }
}

function normalizeSlotValue(value) {
  return Array.isArray[value] ? value : [value]
}