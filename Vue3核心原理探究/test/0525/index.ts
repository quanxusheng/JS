

function effect(fn?: Function): void{
    console.log('=>', 1111)
}

interface Data {
    name: string
    age: number
}
const data:Data = {
    name: 'qingyun',
    age: 18
}

let obj = new Proxy(data, {
    get(target, key, receiver) {
        Reflect.get(target, key)
    },
    set(target, key, value, receiver) {
        return Reflect.set(target, key, value)
    }
})

effect(
    () => document.body.innerHTML = obj.name + obj.age
)