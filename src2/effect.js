

// 用一个全局变量存储被注册的副作用函数
let activeEffect = null;
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
 // 返回属性值
  
 }
  // 在 set 拦截函数内调用 trigger 函数触发变化
  function trigger(target, key) {
    // 根据 target 从桶中取得 depsMap，它是 key --> effects
    let depsMap = bucket.get(target);
     // 根据 key 取得所有副作用函数 effects
    let  effects = depsMap.get(key);
     // 执行副作用函数
     effects && effects.forEach(fn => fn())
   }
// 声明一个桶存储副作用函数的桶
const bucket = new WeakMap();
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target,key) {
    track(target,key)
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newValue) {
     
    trigger(target,key)
    return Reflect.set(target, key, newValue)
  }
})

// effect 函数用于注册副作用函数
function effect(fn) {
  // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给
 
  activeEffect = fn
  // 执行副作用函数
 fn()
}

effect(()=>{
  // console.log('name',obj.name);
})
effect(()=>{
  document.body.innerText = obj.ok ? obj.text : 'not'
  console.log('age',obj.age);
})
 obj.name='xixi';
 obj.ok=false



  
  
