(function() {
  var root = this
  
  var generateName = (function() {
    var postfix = 0
    return function(descString) {
      postfix++
      return '@@' + descString + '_' + postfix
    }
  })()

  var SymbolPolyfill = function Symbol(description) {
    if (this instanceof SymbolPolyfill) {
      throw new TypeError('Symbol is not a constructor')
    }
    var descString = 
        description === undefined ? undefined : String(description)
    var symbol = Object.create({
      toString() {
        return this.__name__
      },
      valueOf() {
        return this
      }
    })

    Object.defineProperties(symbol, {
      __Description__: {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
      __Name__: {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false
      }
    })
    return symbol
  }

  let forMap = {}
  Object.defineProperties(SymbolPolyfill, {
    for: {
      value(description) {
        var desc = description === undefined ? description : String(description)
        return forMap[desc] ? forMap[desc]: forMap[desc] = SymbolPolyfill(desc)
      },
      writable: true,
      enumerable: false,
      configurable: true
    },
    keyFor: {
      value(desc) {
        for(var key in forMap) {
          if (forMap[key] === desc) return key
        }
      },
      writable: true,
      enumerable: false,
      configurable: true
    }
  })
  root.SymbolPolyfill = SymbolPolyfill
})