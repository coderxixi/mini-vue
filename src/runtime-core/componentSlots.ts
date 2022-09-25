export function initSlots(instance: any, children: any) {
   return instance.slots= Array.isArray(children) ?children:[children]
}
