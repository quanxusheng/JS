const fs = require('fs');
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;

// 示例 JavaScript 源代码
const code = `
function    hello(   name )
{
console.log(   "Hello, " + name  + "!" ) ;
}
`;

// 将源代码解析为 AST
const ast = parser.parse(code, { sourceType: 'script' });

// 重新生成源代码（已格式化）
const formattedCode = generator(ast, { retainLines: false }, code).code;

console.log(code);
console.log(formattedCode);