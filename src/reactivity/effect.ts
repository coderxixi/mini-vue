// todo 创建一个类进行封装
// 用一个全局变量来获取用户传进来的fn
let activeEffect;
class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }

  run() {
    activeEffect = this;
    this._fn()
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
  depsMap.add(activeEffect)


}

export function trigger(target,key){
  //todo 触发依赖  取出依赖项
  let depsMap=targetMap.get(target);
  // 取出依赖
  let dep=depsMap.get(key);
  for(let effect of dep){
    effect.run()
  }

}


export function effect(fn) {
  // todo 创建一个effect实例
  const _effect = new ReactiveEffect(fn);
  //调用effect执行用户传进来的fn
  _effect.run()
}