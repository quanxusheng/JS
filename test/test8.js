// var today = new Date();
// var birthday1 = new Date('December 17, 1995 03:24:00');
// var birthday2 = new Date('1995-12-17T03:24:00');
// var birthday3 = new Date(1995, 11, 17);
// var birthday4 = new Date(1995, 11, 17, 3, 24, 0);
// console.log('=>', birthday1)
// console.log('=>', birthday2)
// console.log('=>', birthday3)
// console.log('=>', birthday4)

// async function a() {
//     await setTimeout(() => {
//         console.log('=>', 111)
//     }, 1000)
//     await setTimeout(() => {
//         console.log('=>', 222)
//     }, 500)
// }
// let a = function () {
//     return new Promise((resolve, reject) => {
//         console.log("1");
//         resolve('aaa')
//         console.log('=>', 3)
//     })
// }
// a().then(r => {
//     console.log('=>rrr', r)
// })
// // console.log('=2222>', a())
function f2() {
    return new Promise(r => {
        setTimeout(() => {
            r('aaa')
            console.log('=>', 1111)
        }, 3000)
    })
}
function f3() {
    return new Promise(r => {
        setTimeout(() => {
            r('bbb')
            console.log('=>', 2222)
            return 'fffff3'
        }, 1000)
    })
}
async function f1() {
    await f2()
    await 'ppp'
    // console.log('=>cccc', cc)
    // return 'uuu'
}
// let moon = f1()
// console.log('=>moon', moon)
f1().then(r => {
    console.log('=>rrrr', r)
})
// f2('0000').then(r => {
//     console.log('=>rrr', r)
// })