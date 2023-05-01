import { NodeTypes } from "../src/ast"



export function baseParse(content: string) {
  //创建一个上下文对象
  const context = createParserContext(content);
  return cretaeRoot(parseChildren(context))
}

//创建一个根结点
function cretaeRoot(children) {
  return {
    children
  }
}
function parseChildren(context) {
  
  const nodes: any = [];
  let node:any;
  //插值处理
  if (context.source.startsWith("{{")) {
    node = parseInteropolation(context);
  }
 
  nodes.push(node)
  return [
    {
      type: NodeTypes.INTERPOLATION,
      content: {
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: 'message'
      }
    }
  ]
}
function parseInteropolation(context) {
  //{{message}}=>message

  const openDelimiter="{{";
  const closeDelimite="}}";
  const closeIndex = context.source.indexOf(closeDelimite, openDelimiter.length);
  advanceBy(context, openDelimiter.length)
  const rawContentLength = closeIndex - openDelimiter.length;
  const rawContent = context.source.slice(0, rawContentLength);
  const content = rawContent.trim()
  advanceBy(context, rawContentLength + closeDelimite.length)

  return {
    type: "interpolation",
    content: {
      type: 'simple_expression',
      content: content
    }
  }
}

function advanceBy(context:any,length:any){
  context.source = context.source.slice(length)

}
function createParserContext(content: string): any {
  return {
    source: content
  }
}