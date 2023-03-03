

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
  effectsToRun.forEach((effectFn) => {
    if (effectFn.options.scheduler) { // 新增
       effectFn.options.scheduler(effectFn) // 新增
       } else {
       // 否则直接执行副作用函数（之前的默认行为）
       effectFn() // 新增
     }
   
  })
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


 function ref(data){
  return new Proxy(data, {
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
}
 // 定义一个任务队列
  const jobQueue = new Set();
   // 使用 Promise.resolve() 创建一个 promise 实例，我们用它将一个任务添加到微任务队列
  const p = Promise.resolve() 
 // 一个标志代表是否正在刷新队列
  let isFlushing = false;
  function flushJob() {
     // 如果队列正在刷新，则什么都不做
     if (isFlushing) return
     // 设置为 true，代表正在刷新
     isFlushing = true
     // 在微任务队列中刷新 jobQueue 队列
     p.then(() => {
     jobQueue.forEach(job => job())
     }).finally(() => {
     // 结束后重置 isFlushing
     isFlushing = false
     })
     }








// effect 函数用于注册副作用函数
  function effect(fn,options={}) {
  // 调用 cleanup 函数完成清除工作
  
  // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn;
    // 在调用副作用函数之前将当前副作用函数压入栈中
     effectStack.push(effectFn) // 新增
      const res= fn()
     // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect 还原为之前的值
     effectStack.pop() // 新增
     activeEffect = effectStack[effectStack.length - 1] // 新增

     return res
  }
  // 将 options 挂载到 effectFn 上 
   effectFn.options = options // 新增
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
    effectFn.deps = [];
 
  console.log('options.lazy',options.lazy);
  // 只有非 lazy 的时候，才执行
 if (!options.lazy) { // 新增
   // 执行副作用函数
    effectFn()
   }
 // 将副作用函数作为返回值返回
 return effectFn
}


// effect(() => {
 
//   console.log('age', obj.age);
// },{
//   scheduler(fn){
//    // 每次调度时，将副作用函数添加到 jobQueue 队列中
// jobQueue.add(fn)
//  // 调用 flushJob 刷新队列
//  flushJob()
//   }
// })



// effect(()=>{
// console.log('第一层',obj.name);
//   effect(()=>{
//     console.log('第二层',obj.age);
//   })
// })
// obj.name='xiaoli'
// obj.age++;
// obj.age++;

// console.log('结束了');




//  computed  计算属性

let info=ref({
  name:'xixi',
  age:18
})


//  const fn= effect(
//   ()=>{
//   console.log('computed',info.age);
// },
// {
//   lazy:true
// }
// )
// fn();


function computed(getter){
  // value 用来缓存上一次计算的值
  let value;
  //标志 用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计
  let dirty=true; 
   let  effectFn=effect(getter,{
    lazy:true,
    scheduler(){
      if (!dirty) {
         dirty = true
         // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
         trigger(obj, 'value')
         }
   }});

   const obj = {
     // 当读取 value 时才执行 effectFn
     get value() {
      if (dirty) {
         value = effectFn()
         // 将 dirty 设置为 false，下一次访问直接使用缓存到 value 中的值
         dirty = false
         }
         // 当读取 value 时，手动调用 track 函数进行追踪
      track(obj, 'value')
       return value
     }
     }

     return obj
}


let res= computed(()=>info.age+2);

effect(() => {
  // 在该副作用函数中读取 sumRes.value
  console.log('数据变了',res.value)
 })
 info.age++;
 info.age++;
 info.age++;
 info.age++;

// console.log('res',res.value);
// console.log('res',res.value);
// console.log('res',res.value);



// watch   监听


//所谓 watch，其本质就是观测一个响应式数据，当数据发生变化时通知并执行相应的回调函数。举个例子：

 function traverse(value, seen = new Set()) {
   // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
   if (typeof value !== 'object' || value === null ||seen.has(value)) return
   // 将数据添加到 seen 中，代表遍历地读取过了，避免循环引用引起的死循环
   seen.add(value)
   // 暂时不考虑数组等其他结构
   // 假设 value 就是一个对象，使用 for...in 读取对象的每一个值，并递归地调用 traverse 进行处理
  
   for (const k in value) {
   ;
   traverse(value[k], seen)
   }
   
   return value
   }
  // watch 函数接收两个参数，source 是响应式数据，cb 是回调函数
 function watch(source,cb,options={}){
  let getter;//定义getter函数
  // 如果 source 是函数，说明用户传递的是 getter，所以直接把 source 赋值给 getter
  // 提取 scheduler 调度函数为一个独立的 job 函数
const job = () => {
   // 在 scheduler 中重新执行副作用函数，得到的是新值
   newValue = effectFn()
       
   // 当数据变化时，调用回调函数 cb
   cb(newValue, oldValue);
   oldValue=newValue
 }
  if (typeof source === 'function') {
     getter = source
    } else {
   // 否则按照原来的实现调用 traverse 递归地读取
    getter = () => traverse(source)
   }
   // 定义旧值与新值
    let oldValue, newValue;
   let effectFn= effect(()=>{
    return getter()
    },{
      lazy: true,
      scheduler:job
    })
    if (options.immediate) {
       // 当 immediate 为 true 时立即执行 job，从而触发回调执行
      job()
       } else {
         // 手动调用副作用函数，拿到的值就是旧值 
      oldValue = effectFn()
     }
   
    // 手动调用副作用函数，拿到的值就是旧值 
    // oldValue = effectFn()
 }
 let info1=ref({
  name:'刘圣书',
  age:18
 })
 watch(()=>info1.age,(newValue, oldValue)=>{
  console.log('infi.age数据变了重新执行',newValue, oldValue);
 },{
  // 回调函数会在 watch 创建时立即执行一次
  immediate: true
 })
//  info1.age++;
//  info1.age++;
//  info1.age++;
//  info1.age++;
//  info1.age++;









