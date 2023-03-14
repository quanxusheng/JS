const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //匹配标签名 形如 abc-123
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //匹配特殊标签 形如 abc:234 前面的abc:可有可无
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配标签开始 形如 <abc-123 捕获里面的标签名
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束  >
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾 如 </abc-123> 捕获里面的标签名
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性  形如 id="app"

let root, currentParent //代表根节点 和当前父节点

let stack = []

const ELEMENT_TYPE = 1
const TEXT_TYPE = 3
function createASTElemnt(tagName, attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null
  }
}

function handleStartTag({tagName, attrs}) {
  let element = createASTElement(tagName, attrs)
  if (!root) {
    root = element
  }
  currentParent = element
  stack.push(element)
}

function handleEndTag(tagName) {
  let element = stack.pop()
  currentParent = stack[stack.length -1]
  if (currentParent) {
    element.parent = currentParent
    currentParent.children.push(element)
  }
}
function handleChars(text) {
  text = text.replace(/\s/g, '')
  if (text) {
    currentParent.children.push({
      type: TEXT_TYPE,
      text
    })
  }
}
// var html = `<div id="app" placehodler="xxxxxx">
//   <span></span>
// </div>`
var html = `asdid="app" placehodler="xxxxxx"`

// 解析标签生成ast核心
parse(html)
console.log('=2222', parse(html))
function parse(html) {
  while(html) {
    let textEnd = html.indexOf('<')
    // 如果<在第一个 那么证明接下来就是一个标签 不管是开始还是结束标签
    if (textEnd === 0) {
      // 如果开始标签解析有结果
      const startTagMatch = parseStartTag()
      if (startTagMatch) {
        // 把解析好的标签名和属性解析生成ast
        handleStartTag(startTagMatch)
        continue
      }

      // 匹配结束标签 </
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        handleEndTag(endTagMatch[1])
        continue
      }
    }
    let text
    // 形如 hello<div></div>
    if(textEnd >= 0) {
      // 获取文本
      text = html.subString(0, textEnd)
    }
    if (text) {
      advance(text.length)
      handleChars(text)
    }
  }

  // 匹配开始标签
  /* 
    <div>
      <span></span>
    </div>
  */
  function parseStartTag() {
    const start = html.match(startTagOpen)
    /* 
    start = [
      0: "<div"
      1: "div"
      groups: undefined
      index: 0
      input: "<div>\n  <span></span>\n</div>"
      length: 2
    ]
    */
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      // 匹配到了开始标签 就截取掉
      advance(start[0].length)
      // 开始匹配属性
      // end代表结束符号> 如果不是匹配到了结束标签
      // attr 表示匹配的属性
      let end, attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        advance(attr[0].length)
        attr = {
          name: attr[1],
          value: attr[3] || attr[4] || attr[5] //这里是因为正则捕获支持双引号 单引号和无引号的属性值 
        }
        match.attrs.push(attr)
      }
      if (end) {
        // 代表一个标签匹配到结束的 > 了 代表开始标签解析完毕
        advance(1)
        return match
      }
    }
  }
  // 截取html字符串 每次匹配到了就往前继续匹配
  function advance(n) {
    html = html.subString(n)
  }
  // 返回生成的ast
  return root
}
/* 
  利用正则匹配 html 字符串 遇到开始标签 结束标签和文本 解析完毕之后生成对应的ast并建立相应的
  父子关联 不断的advance 截取剩余的字符串直到全部解析完毕
*/