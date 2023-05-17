<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import html2canvas from 'html2canvas'

    const screenShortWidth = ref<number>(0)
    const screenShortHeight = ref(0)

    let screenBodyCanvas = ref<HTMLCanvasElement | null>(null)
    screenBodyCanvas = document.createElement('canvas')
    html2canvas(document.body).then((canvas: any) => {
        console.log('=>', canvas)
        screenBodyCanvas = canvas
    })

    let btnShot = ref<HTMLElement | null>(null)
    onMounted(() => {
    console.log('=btnShot>', btnShot)
    if (!btnShot.value) return
    const width = screenBodyCanvas?.width
    btnShot.value.onclick = () => {
        // console.log('=>screenBodyCanvas', screenBodyCanvas)
        if (!screenBodyCanvas) return
        // let canvas = screenBodyCanvas.value.getContext("2d")
        let canvas = getCanvas2dCtx(
            screenBodyCanvas,
            screenBodyCanvas.width,
            screenBodyCanvas.height
        )
        console.log('=>screenBodyCanvas-canvas', canvas)
        btnShot.value?.addEventListener('mousedown', (e) => {
            console.log('=>mousedown', e)
        })
    }


    let getCanvas2dCtx = (
        canvas: HTMLCanvasElement,
        width: number,
        height: number
    ) => {
        // 获取设备像素比
        console.log('=>window.devicePixelRatio', window.devicePixelRatio)
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        console.log('=>canvas', canvas)
        const ctx = canvas.getContext("2d");
        // 对画布进行缩放处理
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
        console.log('=>ctx', ctx)
        return ctx;
    }
})

</script>

<template>


    <teleport to="body">
        <div id="container" style="text-align: center;">
            
            <button id="btn-shot" ref="btnShot">
                截图
            </button>
            <div id="screen-area">
                2222
            </div>
            <canvas id="screenShotContainer" :width="screenShortWidth" :height="screenShortHeight"
                ref="screenShortController">

            </canvas>
            <img src="/src/assets/img.png" alt="">
        </div>
    </teleport>
    <!-- <div id="container" style="background: #000;">
            <div id="btn-shot">
                截图
            </div>
            <div id="screen-area">
                2222
            </div>
            <canvas id="screenShotContainer" :width="screenShortWidth" :height="screenShortHeight"
                ref="screenShortController">

            </canvas>
        </div> -->
</template>