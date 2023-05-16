<script setup lang="ts">
import html2canvas from 'html2canvas'

const app: HTMLElement | null = document.getElementById('app')
console.log('=>', app)
html2canvas(document.body).then(res => {
    console.log('=>', res)
})
</script>

<template>

    <div id="app">
        <div class="btn-shot">
            截图
        </div>
        <div id="screen-area">
            2222
        </div>
        <teleport to="body">
            <canvas
                id="screenShotContainer"
                :width="screenShortWidth"
                :height="screenShortHeight"
                ref="screenShortController"
            >

            </canvas>
        </teleport>
    </div>
</template>

<style scoped>

</style>
