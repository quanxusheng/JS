<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import InitData from '@/module/main-entrance/InitData'
    import EventMonitoring from '@/module/main-entrance/EventMonitoring'
    import PlugInParameters from "@/module/main-entrance/PlugInParameters";
    import html2canvas from 'html2canvas'


    const data = new InitData()
    const event = new EventMonitoring()

    
    // console.log('=>event', event)
    const screenShortWidth = data.getScreenShortWidth();
    const screenShortHeight = data.getScreenShortHeight();
    onMounted(() => {
        // console.log('=>vuevuevue', )
        // console.log('=>data', data.getScreenShortController())
    })

</script>

<template>

    <teleport to="body">
        <div id="container" style="text-align: center;">
            <canvas
                id="screenShotContainer"
                :width="screenShortWidth"
                :height="screenShortHeight"
                ref="screenShortController">
            </canvas>
        </div>
    </teleport>
</template>

<style>
#screenShotContainer {
    left: 0;
    position: absolute;
    top: 0;
}
</style>