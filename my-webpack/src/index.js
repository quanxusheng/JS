import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
const img2 = require('./mini-new-icon-cus.png')

const code = `function square(n) {
  return 'quanxusheng';
}`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      console.log('=>path', path)
      path.node.name = "fangyiyuan";
    }
  },
});