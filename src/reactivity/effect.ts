
import { extend } from "../shared/index"
// todo 创建一个类进行封装
// 记录当前活跃的对象
let activeEffect;
let shouldTrack;
export class ReactiveEffect {
  private _fn: any
  deps = [];
  active = true;
  onStop?: () => void;
  constructor(fn, public scheduler?) {
    // 用户传进来的副作用函数。
    this._fn = fn
    this.scheduler = scheduler
  }

  run() {
    if (!this.active) {
      return this._fn()
    }
    shouldTrack = true;
    activeEffect = this;
    let res = this._fn();
    shouldTrack = false
    return res
  }
  stop() {
    //删除effect 
    if (this.active) {
      if (this.onStop) {
        this.onStop()
      }
      cleanupEffect(this);
      this.active = false
    }


  }
}
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
  // effect.deps.length = 0
}
const targetMap = new WeakMap()

export function track(target, key) {
  //todo 收集依赖
  if (!isTracking()) return
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep)
  }
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
  trackEffects(dep)
}

export function trackEffects(dep){
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)

}

export function isTracking() {
  return shouldTrack && activeEffect != undefined
}

export function trigger(target, key) {
  //todo 触发依赖  取出依赖项
  let depsMap = targetMap.get(target);
  // 取出依赖
  let dep = depsMap.get(key);
  triggerEffect(dep)
}
export function triggerEffect(dep){
  for (let effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function effect(fn, options: any = {}) {
  // todo 创建一个effect实例
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options)
  //调用effect执行用户传进来的fn
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect
  return runner
}


export function stop(runner) {
  runner.effect.stop()
}