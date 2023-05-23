import { ref, onMounted } from 'vue'

const screenShortWidth = ref(0)
const screenShortHeight = ref(0)

let screenShortController = ref<HTMLCanvasElement | null>(null)

let initStatus = false
class InitData {
    constructor() {
        // if (initStatus) {
        //     alert(initStatus)
        //     initStatus = false
        //     screenShortWidth.value = 0
        //     screenShortHeight.value = 0
        //     screenShortController = ref(null)
        //     console.log('=>8888', screenShortController)
        // }
        // onMounted(() => {
        //     initStatus = false
        //     screenShortWidth.value = 0
        //     screenShortHeight.value = 0
        //     screenShortController = ref(null)
        //     console.log('=>8888', screenShortController)
        // })
    }
    setInitStatus(status: boolean) {
        initStatus = status
    }
    // 获取截图容器dom
    public getScreenShortController() {
        return screenShortController;
    }
    public getScreenShortWidth() {
        return screenShortWidth
    }
    public getScreenShortHeight() {
        return screenShortHeight;
    }
    // 设置截图容器宽高
    public setScreenShortInfo(width: number, height: number) {
        screenShortWidth.value = width;
        screenShortHeight.value = height;
    }

}

export default InitData