<script setup>

    import { reactive, ref } from 'vue'

    import HelloWorld from './components/HelloWorld.vue'
    import Test1 from './components/test1.vue'


</script>

<template>
    <div>
        <!-- <p>obj2: {{ obj2.name }}</p>
        <p>obj2: {{ obj2.age }}</p> -->
        <!-- <p @click="total++">总价：{{ total }}</p>
        <p @click="fn(obj.a)">总价2：{{ obj.a }}</p>
        <p>{{ obj.a }}</p>
        <p>钱：{{ user.money }}</p>
        <button @click="user.money++">add</button> -->
        <!-- <HelloWorld msg="Vite + Vue11" :user='user' v-model:total='total'  />
        <p >总价：{{ total }}</p> -->
        <Test1 />
    </div>
</template>

<style scoped>
</style>
