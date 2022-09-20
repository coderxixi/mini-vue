import { reactive } from "../reactive";
import { effect } from "../effect"

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10
    })
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    })
    expect(nextAge).toBe(11)
    // //更新
    user.age++
    expect(nextAge).toBe(12);
   
  })
  it('should return runner wehn call efect',() => {
    // effect返回一个函数 调用这个函数 会把fn返回值返回出去 会重新执行用户传进来的fn；
     let foo = 10;
     const runner = effect(() => {
       foo++
       return 'foo'
     })
     expect(foo).toBe(11);
     const r = runner()
     expect(foo).toBe(12);
     expect(r).toBe('foo')
   })
})