## mini-vue

实现最简 vue3 模型，用于深入学习 vue3， 让你更轻松的理解 vue3 的核心逻辑
基于 vue3 的功能点，一点一点的拆分出来。
代码命名会保持和源码中的一致，方便大家通过命名去源码中查找逻辑。


## runtime-core
 支持组件类型
 支持 element 类型
 初始化 props
 setup 可获取 props 和 context
 支持 component emit
 支持 proxy
 可以在 render 函数中获取 setup 返回的对象
 支持 getCurrentInstance
 支持 provide/inject
 支持最基础的 slots
 支持 Text 类型节点
 支持 $el api
## reactivity 
 reactive 的实现
 ref 的实现
 readonly 的实现
 computed 的实现
 track 依赖收集
 trigger 触发依赖
 支持 isReactive
 支持嵌套 reactive
 支持 effect.scheduler
 支持 effect.stop
 支持 isReadonly
 支持 isProxy
 支持 shallowReadonly
 支持 proxyRefs