import { ref, onMounted } from 'vue'

const screenShortWidth = ref(0)
const screenShortHeight = ref(0)

// 截图工具栏展示状态与位置
const toolStatus = ref<boolean>(false);
const toolLeft = ref<number>(0);
const toolTop = ref<number>(0);

// 截图工具栏点击状态
const toolClickStatus = ref<boolean>(false);
// 截图工具栏画笔选择显示状态
const optionStatus = ref<boolean>(false);
// 颜色面板展示状态
const colorPanelStatus = ref<boolean>(false);
// 当前选择的颜色
const selectedColor = ref<string>("#F53340");
// 当前点击的工具栏名称
const toolName = ref<string>("");
//  当前选择的画笔大小
const penSize = ref<number>(2);
// 获取截图工具栏容器dom
let toolController = ref<HTMLDivElement | null>(null);

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
    
    // 设置截图工具栏展示状态
    public setToolStatus(status: boolean) {
        toolStatus.value = status;
    }
    // 获取截图工具栏展示状态
    public getToolStatus() {
        return toolStatus;
    }
     // 获取截图工具栏dom
    public getToolController() {
        return toolController;
    }
     // 设置截图工具位置信息
    public setToolInfo(left: number, top: number) {
        toolLeft.value = left;
        toolTop.value = top;
    }

}

export default InitData