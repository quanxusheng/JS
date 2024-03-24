;<template>
    <!-- <div v-for='item in list'>
    {{ item.id }} + {{ item.value }}</div> -->
    <!-- <div v-for='(item, value) in list'>
        {{ item }} + {{ value }}
    </div> -->
    <div ref='content' style='background: white; padding: 20px;color:red;' contenteditable>213</div>
</template>

<script setup>
import {ref, onMounted, } from 'vue'
const content  = ref()
onMounted(() => {
console.log('=>content', content.value.innerText)
})
console.log('=>content', content)

// console.log('=>content', content.value.innerText)
    let list = {
        name: 'alex',
        age: 18,
        color: 'white'
    }
    // let list = [
    //     {
    //         id: 1,
    //         value: 'black'
    //     },
    //     {
    //         id: 2,
    //         value: 'yellow'
    //     },
    //     {
    //         id: 3,
    //         value: 'white'
    //     },
    // ]
    
</script>
