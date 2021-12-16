import {parse}  from './parse'
import {generate} from './codegen'
export function compileToFunctions(template) {
  /* 把html代码转成ast语法树 */
  let ast = parse(template)
  let code = generate(ast)
  let renderFn = new Function(`with(this){return ${code}}`)
  /* 使用with语法改变作用域this，之后调用render函数可以使用call改变this，方便code里面的变量取值 */
  return renderFn
}