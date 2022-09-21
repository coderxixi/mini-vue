// todo 创建一个类进行封装
// 记录当前活跃的对象
let activeEffect;
class ReactiveEffect {
  private _fn: any
  constructor(fn, public scheduler?) {
    // 用户传进来的副作用函数。
    this._fn = fn
    this.scheduler = scheduler
  }

  run() {
    activeEffect = this;
    return this._fn()
  }
}

const targetMap = new WeakMap()

export function track(target, key) {
  //todo 收集依赖
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
  dep.add(activeEffect)


}

export function trigger(target, key) {
  //todo 触发依赖  取出依赖项
  let depsMap = targetMap.get(target);
  // 取出依赖
  let dep = depsMap.get(key);
  for (let effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}


export function effect(fn, options:any={}) {
  // todo 创建一个effect实例
  let {scheduler}=options
  const _effect = new ReactiveEffect(fn, scheduler);
  //调用effect执行用户传进来的fn
  _effect.run();
  return _effect.run.bind(_effect);
}