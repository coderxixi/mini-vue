import { baseParse } from "../src/parse"
import { NodeTypes } from "../src/ast"
describe('解析',()=>{
  describe('插值',()=>{
    test('simple interpolation',()=>{
    const ast= baseParse('{{message}}');
    //root
    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.INTERPOLATION,
      content:{
        type:NodeTypes.SIMPLE_EXPRESSION,
        content:'message'
      }
    })
    })

  
  })

  describe('element',()=>{
    it('simple element div',()=>{
      const ast = baseParse('<div></div>');
      //root
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div'
      })
    })
  })
  describe('text', () => {
    it('simple  text', () => {
      const ast = baseParse('some text');
      //root
      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.TEXT,
        content: 'some text'
      })
    })
  })
})