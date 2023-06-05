let box1 = document.querySelector('#box1')
let box2 = document.querySelector('#box2')


let data = {
    name: 'qingyun',
    age: 18
}
let obj = new Proxy(data, {
    get(target, key, receiver) {
        track(target, key)
        return Reflect.get(target, key)
    },
    set(target, key, value, receiver) {
        trigger(target, key)
        return Reflect.set(target, key, value)
    }
})

let activeEffect = null
let bucket = new WeakMap()

function effect(fn) {
    const effectFn = () => {
        activeEffect = fn
        fn()
        activeEffect = null
    }
    effectFn()
}

function track(target, key) {
    if (!activeEffect) return
    let depsMap = bucket.get(target)
    if (!depsMap) {
        bucket.set(target, depsMap = new Map())
    }
    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, deps = new Set())
    }
    deps.add(activeEffect)
}

function trigger(target, key) {
    let depsMap = bucket.get(target)
    if (!depsMap) return
    let deps = depsMap.get(key)
    if (!deps) return
    console.log('=>deps', deps)
    deps.forEach(eff => {
        eff()
    });
}

effect(
    () => {
        console.log('=>', 1111)
        console.log('=>obj', obj)
        box1.innerHTML = obj.name + obj.age
    }
)


setTimeout(() => {
    obj.name = 'quan'
}, 2000);


console.log('=>bucket', bucket)

