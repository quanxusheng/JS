发起http请求，先判断缓存设置

强缓存
  expires 过期时间 设置一个日期值，当发起请求时用当前时间与之对比，是否过期， ！！优先级最低
  cache-control: { 
    max-age: 过期时间，一个时间戳，与expires效果一样 ！优先级高
    no-cache: 不使用强缓存，但是会验证协商缓存
    no-store: 强，协商缓存都不使用
    private和public 私人和公共
    must-revalidate: 缓存过期前使用，过期后必须向服务器验证
  }

强缓存没有命中，接下来判断协商缓存

协商缓存

ETags / if-no-match hash码 文件改动会变化 请求时判断hash是否和服务器一致 返回304 -> 命中并加载缓存/重新请求

last-modifed / if-modifed-since 最后修改时间是否一致 返回304 -> 命中并加载缓存/重新请求
