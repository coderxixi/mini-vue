import { NodeTypes, TagType } from "../src/ast"



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
  let node: any;
  const s = context.source
  //插值处理

  if (s.startsWith("{{")) {
    node = parseInteropolation(context);
  } else if (s[0] === '<') {
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context)
    }
  }

  if(!node){
    node = parseText(context)
  }
  nodes.push(node)
  return nodes
}
function parseInteropolation(context) {
  //{{message}}=>message

  const openDelimiter = "{{";
  const closeDelimite = "}}";
  const closeIndex = context.source.indexOf(closeDelimite, openDelimiter.length);
  advanceBy(context, openDelimiter.length)
  const rawContentLength = closeIndex - openDelimiter.length;
  const rawContent = parseTextData(context, rawContentLength)   // context.source.slice(0, rawContentLength);
  const content = rawContent.trim()
  advanceBy(context, rawContentLength + closeDelimite.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content
    }
  }
}

function advanceBy(context: any, length: any) {
  context.source = context.source.slice(length)

}
function createParserContext(content: string): any {
  return {
    source: content
  }
}
//解析element

function parseElement(context: any) {
 const element=parseTag(context,TagType.Start);

  parseTag(context,TagType.End);
  return element
}
function parseTag(context:any,type:any){
  //1.解析 tag
  const match: any = /^<\/?([a-z]*)/i.exec(context.source);
  const tag = match[1]
  //2.删除处理完成的代码
  advanceBy(context, match[0].length);
  advanceBy(context, 1);

  if(type==TagType.End) return
  return {
    type: NodeTypes.ELEMENT,
    tag: tag
  }
}
//解析 text
function parseText(context:any){
  const content = parseTextData(context, context.source.length)
  return {
    type: NodeTypes.TEXT,
    content: content
  }
}
function parseTextData(context:any,length:any){
  //1 获取当前法内容
  const content = context.source.slice(0, length)
  advanceBy(context, context.length);
  return content
}