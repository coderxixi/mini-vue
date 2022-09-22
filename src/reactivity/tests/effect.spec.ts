import { reactive } from "../reactive";
import { effect,stop } from "../effect"

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
       foo++;
       return 'foo';
     });
     expect(foo).toBe(11);
     const r = runner();
     expect(foo).toBe(12);
     expect(r).toBe('foo');
   });

   it("scheduler", () => {
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    run();
    expect(dummy).toBe(2);
  });

  it('stop',()=>{
    let dummy;
    const obj=reactive({props:1});
    const runner=effect(()=>{
      dummy=obj.props
    })
    obj.props=2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.props=3;
    obj.props++;
    expect(dummy).toBe(2);
    runner();
    expect(dummy).toBe(4)
  })

  it("onStop",()=>{
    const obj=reactive({
      foo:1
    });
    const onStop=jest.fn();
    let dummy;
    const runner=effect(
      ()=>{
      dummy=obj.foo
    },{
      onStop
    }
    );
    stop(runner);
    expect(onStop).toBeCalledTimes(1)
  })
})