import { getCurrentInstance } from "./component"


export function provide(key, val) {
  //set
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    let { provides } = currentInstance;
    const parentProvides = currentInstance.parent?.provides;
    if (provides == parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides)

    }
    provides[key] = val
  }
}


export function inject(key, defaultValue) {
  //get
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides;
    if (key in parentProvides) {
      return parentProvides[key]
    } else if (defaultValue) {

      if (typeof defaultValue == "function") {
        return defaultValue()
      } else {
        return defaultValue
      }

    }

  }
}