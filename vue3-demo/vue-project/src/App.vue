<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import ScreenShot from './components/ScreenShot.vue'
    // import InitData from '@/module/main-entrance/InitData'
    // import EventMonitoring from '@/module/main-entrance/EventMonitoring'
    // import PlugInParameters from "@/module/main-entrance/PlugInParameters";
    // import html2canvas from 'html2canvas'

    let showStatus = ref(false)

    // const data = new InitData()
    // const event = new EventMonitoring()

    const handleShot = () => {
        showStatus.value = true
    }
    
    // console.log('=>data', data)
    // console.log('=>event', event)
    // const screenShortWidth = data.getScreenShortWidth();
    // const screenShortHeight = data.getScreenShortHeight();
    // const screenShortController = ref(null)
    // onMounted(() => {
        

    //     console.log('=>app', screenShortWidth)
    //     console.log('=>app', screenShortHeight)
    //     console.log('=rrrrrrrrrrrr>', screenShortController)
    //     console.log('=>', screenShortController.value)
    // })

</script>

<template>
    <button id="btn-shot" ref="btnShot" @click="handleShot">
            截图
    </button>
    <img src="/src/assets/img.png" width="1920" height="1080" alt="" />
    <ScreenShot v-if="showStatus" :key="new Date().getTime()"></ScreenShot>
</template>
<style>
</style>