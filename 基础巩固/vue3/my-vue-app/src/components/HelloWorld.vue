<script setup>
import { ref, computed, isRef } from 'vue'


defineProps({
  msg: String,
  user: Object,
  total: Number
})

const model = defineModel('total')
console.log('=>model', model)

const count = ref(0)




</script>

<template>
  <div style="background: gray;padding:20px;margin-top: 40px;">
    <!-- <h1>{{ msg }}</h1>
    <p>name: {{ user.name }}</p>
    <p>age: {{ user.age }}</p> -->
    <div contenteditable ref='content' :value='model'>model: {{ model }}</div>
    <p @click="$emit('update:total', total--)">total: {{ total }}</p>
    <p>money: {{ user.money }}</p>
    <button @click="user.money--">count is: {{ user.money }}</button>
    <!-- <button @click="count++">count is: {{ count }}</button> -->
    <!-- <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p> -->
  </div>
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
