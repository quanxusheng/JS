// 把12345678， 变成金钱模式，  12,345,678
// 把123456789，变成金钱模式， 123,456,789

let n = 123456789

function money(n) {
    let nw = (n + '').split('').reverse()
    let r = ''
    console.log('=>', nw)
    nw.map((item, index) => {
        console.log('=>222', index, nw.length)
        if ((index+1) % 3 === 0 && (index + 1) != nw.length) {
            console.log('=>index+1', index+1)
            r += item + ','
        } else {
            r += item
        }
    })
    console.log('=>', r)
    console.log('=>', r.split(',').reverse())
}
money(n)