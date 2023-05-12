<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
let data = {
    name: 'quan',
    age: 18
}

// const x = ref(0)
// const y = ref(0)

// // 单个 ref
// watch(x, (newX) => {
//     console.log(`x is ${newX}`)
// })

// // getter 函数
// watch(
//     () => x.value + y.value,
//     (sum) => {
//         console.log(`sum of x + y is: ${sum}`)
//     }
// )

// // 多个来源组成的数组
// watch([x, () => y.value], ([newX, newY]) => {
//     console.log(`x is ${newX} and y is ${newY}`)
// })

let data2 = reactive(data)
let hobby: any = ref('read')
watch(
    () => data2.name,
    (n, o, onCleanup) => {
        console.log('=>onCleanup', onCleanup)
        let clear = false
        onCleanup(() => {
            clear = true
        })
        console.log('=>clearclear', clear)
        console.log('=>nnn', n)
        // console.log('=>ooo', o)
        if (!clear) {
            hobby.value = n
        }

    }
)
// let data2 = ref(data)
setTimeout(() => {
    data2.name = 'quanxusheng'
}, 5000)
setTimeout(() => {
    data2.name = 'zhaoqingyun'
}, 2000)

console.log('=>data2', data2)
console.log('=>hobby', hobby)


</script>

<template>
    <div class="#app">
        <p>{{ data.name }}</p>
        <p>{{ data2.name }}</p>
        <p>hobby: {{ hobby }}</p>
    </div>

    <!-- <RouterView /> -->
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
