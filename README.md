## mini-vue

实现最简 vue3 模型，用于深入学习 vue3， 让你更轻松的理解 vue3 的核心逻辑
基于 vue3 的功能点，一点一点的拆分出来。
代码命名会保持和源码中的一致，方便大家通过命名去源码中查找逻辑。


## runtime-core
- [x]  支持组件类型
- [x]  支持 element 类型
- [x]  初始化 props
- [x]  setup 可获取 props 和 context
- [x]  支持 component emit
- [x] 支持 proxy
 - [x] 可以在 render 函数中获取 setup 返回的对象
- [x]  支持 getCurrentInstance
- [x]  支持 provide/inject
- [x]  支持最基础的 slots
- [x]  支持 Text 类型节点
- [x]  支持 $el api
## reactivity 
 - [x] reactive 的实现
 - [x] ref 的实现
 - [x] readonly 的实现
 - [x] computed 的实现
 - [x] track 依赖收集
 - [x] trigger 触发依赖
 - [x] 支持 isReactive
 - [x] 支持嵌套 reactive
 - [x] 支持 effect.scheduler
 - [x] 支持 effect.stop
 - [x] 支持 isReadonly
 - [x] 支持 isProxy
 - [x] 支持 shallowReadonly
 - [x] 支持 proxyRefs