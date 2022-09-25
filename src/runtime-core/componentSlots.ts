
import { ShapeFlages } from "../shared/ShapeFlages"

export function initSlots(instance: any, children: any) {
  // children 是对象类型
  const { vnode } = instance
  if (vnode.ShapeFlage & ShapeFlages.slot_children) {
    normalizeObjectSlots(instance, children)
  }

}
function normalizeObjectSlots(instance, children) {
  const slots = {}
  for (const key in children) {
    const value = children[key];
    slots[key] = (props) => normalizeSlotValue(value(props))
  }
  return instance.slots = slots

}

function normalizeSlotValue(value) {
  return Array.isArray[value] ? value : [value]
}
