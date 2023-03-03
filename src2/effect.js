

// 用一个全局变量存储被注册的副作用函数
let activeEffect = null;
const effectStack = [] // 新增副作用函数栈
let data = {
  name: 'xixi',
  age: 18,
  ok: true,
  text: 'hello world'
}
// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
  //没有 activeEffect，直接 return
  if (!activeEffect) return target[key];
  // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key -->effects
  let depsMap = bucket.get(target);
  // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
  // 里面存储着所有与当前 key 相关联的副作用函数：effects

  let deps = depsMap.get(key);
  // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  // 最后将当前激活的副作用函数添加到“桶”里
  deps.add(activeEffect)
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps) // 新增

}
// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
  // 根据 target 从桶中取得 depsMap，它是 key --> effects
  let depsMap = bucket.get(target);
  // 根据 key 取得所有副作用函数 effects
  let effects = depsMap.get(key);
  const effectsToRun = new Set(effects)
  // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    effects && effects.forEach(effectFn => {
     if (effectFn !== activeEffect) { // 新增
        effectsToRun.add(effectFn)
     }
     })
 
  // 执行副作用函数
  effectsToRun.forEach(effectFn => effectFn())
  // effects && effects.forEach(fn => fn())
}

function cleanup(effectFn) {
  // 遍历 effectFn.deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i];
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn)
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0

}
// 声明一个桶存储副作用函数的桶
const bucket = new WeakMap();
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    track(target, key)
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newValue) {
    target[key]=newValue
    trigger(target, key)
    // return Reflect.set(target,key,newValue)
  }
})

// effect 函数用于注册副作用函数
function effect(fn) {
  // 调用 cleanup 函数完成清除工作
  
  // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn;
    // 在调用副作用函数之前将当前副作用函数压入栈中
     effectStack.push(effectFn) // 新增
     fn()
     // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect 还原为之前的值
     effectStack.pop() // 新增
     activeEffect = effectStack[effectStack.length - 1] // 新增
  }
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];
  // 执行副作用函数
  effectFn()
}


// effect(() => {
 
//   console.log('age', obj.age);
// })



effect(()=>{
console.log('第一层',obj.name);
  effect(()=>{
    console.log('第二层',obj.age);
  })
})
// obj.name='xiaoli'
obj.age=19





