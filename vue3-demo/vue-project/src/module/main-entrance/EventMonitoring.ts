import { ref, Ref, onMounted, onUnmounted, nextTick } from "vue";
import InitData from "@/module/main-entrance/InitData";
import PlugInParameters from "@/module/main-entrance/PlugInParameters";
// import saveBorderDot from "@/module/common-method/SaveBorderInfo";
import drawCutoutArea from "@/module/common-method/DrawCutoutArea";
import { saveBorderArrInfo } from "@/module/common-method/saveBorderArrInfo";
import html2canvas from "html2canvas";
import { cutOutBoxBorder, positionInfoType } from "@/module/type/ComponentType";
import { calculateToolLocation } from "@/module/split-methods/CalculateToolLocation";

const screenShortController = ref<HTMLCanvasElement | null>(null);
export default class EventMonitoring {
    private readonly data: InitData;
    clickCutFullScreen = false;
      // 截图工具栏dom
    private toolController: Ref<HTMLDivElement | null>;
    wrcWindowMode = false;
    screenShortImageController: HTMLCanvasElement;
    videoController: HTMLVideoElement;
    screenShortCanvas: CanvasRenderingContext2D | undefined;
    screenShortController: Ref<HTMLCanvasElement | null>;

    mouseDraging = false;
    mouseBeginClick = {
        x: 0,
        y: 0
    };
    private dpr = window.devicePixelRatio || 1;
    cutoutBoxBorderArr: Array<cutOutBoxBorder> = [];
    borderSize = 10;
    tempCutoutBoxInfo: positionInfoType = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    };
      // 图形位置参数
    private drawGraphPosition: positionInfoType = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    };
    // 临时图形位置参数
    private tempGraphPosition: positionInfoType = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    };
      // 截全屏时工具栏展示的位置要减去的高度
    private fullScreenDiffHeight = 60;
      // 全屏截取状态
    private getFullScreenStatus = false;
    constructor() {
        this.data = new InitData();
        // this.screenShortController = this.data.getScreenShortController()
        this.screenShortController = screenShortController.value;
        this.toolController = this.data.getToolController();

        this.screenShortImageController = document.createElement("canvas");
        this.videoController = document.createElement("video");
        this.videoController.autoplay = true;

        onMounted(() => {
            const plugInParameters = new PlugInParameters();
            this.clickCutFullScreen = plugInParameters.getClickCutFullScreenStatus();
            this.wrcWindowMode = plugInParameters.getWrcWindowMode();
            this.wrcMode(plugInParameters);
        });

        onUnmounted(() => {
            console.log("=>onUnmounted");
            this.data.setInitStatus(true);
        });
    }

    wrcMode(plugInParameters: PlugInParameters) {
        // console.log('=>666', document.body.clientWidth)
        // console.log('=>77', document.body.clientHeight)
        const bodyWidth = document.body.clientWidth;
        const bodyHeight = document.body.clientHeight;
        this.data.setScreenShortInfo(bodyWidth, bodyHeight);

        this.screenShortImageController.style.width = bodyWidth + "px";
        this.screenShortImageController.style.height = bodyHeight + "px";

        this.startCapture().then(() => {
            setTimeout(() => {
                this.screenShortController = document.querySelector(
                    "#screenShotContainer"
                );
                const cv = this.screenShortImageController.getContext("2d");
                // console.log('=>cv', cv)
                // console.log('=>this.videoController', this.screenShortImageController.width)
                // console.log('=>this.videoController', this.screenShortImageController.height)
                cv?.drawImage(
                    this.videoController,
                    0,
                    0,
                    bodyWidth,
                    bodyHeight
                );
                // console.log('=>rrrr', this.screenShortController)
                const context = this.getCanvas2dCtx(
                    this.screenShortController,
                    bodyWidth,
                    bodyHeight
                );
                if (!context) return;
                this.drawContent(context, this.screenShortController);
                this.stopCapture();
            }, 500);
        });
    }

    startCapture = async () => {
        const captureStream = null;
        const options = {
            audio: false,
            video: true
        };
        try {
            const captureStream = await navigator.mediaDevices.getDisplayMedia(
                options
            );
            //    console.log('=>capture', captureStream)
            this.videoController.srcObject = captureStream;
        } catch (err) {
            console.log("=>err", err);
        }
        return captureStream;
    };
    stopCapture = () => {
        // console.log('=>stopCapture', this.videoController)
        // console.log('=>stopCapture', this.videoController.srcObject)
        const srcObject = this.videoController.srcObject;
        if (srcObject && "getTracks" in srcObject) {
            const tracks = srcObject.getTracks();
            // console.log('=>tracks', tracks)
            // console.log('=>stopCapture', tracks)
            tracks.forEach(track => track.stop());
            this.videoController.srcObject = null;
        }
    };

    drawContent(
        canvasContext: CanvasRenderingContext2D,
        screenShortController: HTMLCanvasElement
    ) {
        this.screenShortCanvas = canvasContext
        this.drawMasking(
            canvasContext,
            screenShortController.width,
            screenShortController.height
        );
        screenShortController.addEventListener(
            "mousedown",
            this.mouseDownEvent
        );
        screenShortController.addEventListener(
            "mousemove",
            this.mouseMoveEvent
        )
        screenShortController.addEventListener("mouseup", this.mouseUpEvent);
    }

    mouseDownEvent = (e: MouseEvent) => {
        console.log("=>mouseDownEvent", e);
        console.log("=>mouseDownEvent", this.mouseBeginClick);
        this.mouseDraging = true;
        this.mouseBeginClick.x = e.x;
        this.mouseBeginClick.y = e.y;
    };

    mouseMoveEvent = (e: MouseEvent) => {
        // console.log('=>mouseMoveEvent', e)
        
        if (this.mouseDraging) {
            // console.log('=>mouseMoveEvent', e)

            if (!this.screenShortCanvas) return
            // 绘制裁剪区域
            const { x, y } = this.mouseBeginClick;
            console.log("=>mouseBeginClick", x, y);
            console.log("=>mouseUpEvent", e.x, e.y);
            const tempW = e.x - x;
            const tempH = e.y - y;
            this.tempCutoutBoxInfo = drawCutoutArea(
                x,
                y,
                tempW,
                tempH,
                this.screenShortCanvas,
                this.screenShortController,
                this.borderSize
            );

            // 绘制裁剪框
            // this.opreteingCutoutBoxBorder(
            //     x,
            //     y,
            //     tempW,
            //     tempH,
            //     this.screenShortCanvas,
            //     this.screenShortController
            // )
        }
    };

    mouseUpEvent = (e: MouseEvent) => {
        this.mouseDraging = false;

        this.cutoutBoxBorderArr = saveBorderArrInfo(
            this.borderSize,
            this.tempCutoutBoxInfo
        )
        console.log('=>this.screenShortController.value', this.screenShortController)
        this.screenShortController.style.cursor = 'move'
        this.data.setToolStatus(true);

        nextTick().then(() => {
        if (
          this.toolController.value != null &&
          this.screenShortController.value
        ) {
          // 计算截图工具栏位置
          const toolLocation = calculateToolLocation(
            this.drawGraphPosition,
            this.toolController.value?.offsetWidth,
            this.screenShortController.value.width / this.dpr
          );
          // 当前截取的是全屏，则修改工具栏的位置到截图容器最底部，防止超出
        //   if (this.getFullScreenStatus) {
        //     const containerHeight = parseInt(
        //       this.screenShortController.value.style.height
        //     );
        //     // 重新计算工具栏的x轴位置
        //     const toolPositionX =
        //       (this.drawGraphPosition.width / this.dpr -
        //         this.toolController.value.offsetWidth) /
        //       2;
        //     toolLocation.mouseY = containerHeight - this.fullScreenDiffHeight;
        //     toolLocation.mouseX = toolPositionX;
        //   }

          if (this.screenShortController.value) {
            const containerHeight = parseInt(
              this.screenShortController.value.style.height
            );

            // 工具栏的位置超出截图容器时，调整工具栏位置防止超出
            if (toolLocation.mouseY > containerHeight - 64) {
              toolLocation.mouseY -= this.drawGraphPosition.h + 64;

              // 超出屏幕顶部时
              if (toolLocation.mouseY < 0) {
                const containerHeight = parseInt(
                  this.screenShortController.value.style.height
                );
                toolLocation.mouseY =
                  containerHeight - this.fullScreenDiffHeight;
              }
            }
          }

          // 设置截图工具栏位置
          this.data.setToolInfo(toolLocation.mouseX, toolLocation.mouseY);
          // 状态重置
          this.getFullScreenStatus = false;
        }
      });
    };

    opreteingCutoutBoxBorder = (
        x: number,
        y: number,
        w: any,
        h: number,
        context: any,
        screenShortController: any
    ) => {};

    getCanvas2dCtx(canvas: HTMLCanvasElement, width: number, height: number) {
        // 获取设备像素比
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        console.log("=>canvas", canvas);
        const ctx = canvas.getContext("2d");
        // 对画布进行缩放处理
        if (ctx) {
            ctx.scale(dpr, dpr);
        }
        console.log("=>ctx", ctx);
        return ctx;
    }

    drawMasking(context: CanvasRenderingContext2D, w: number, h: number) {
        context.clearRect(0, 0, w, h);
        context.save();
        context.fillStyle = "rgba(0, 0, 0, 0.6)";
        context.fillRect(0, 0, w, h);
        context.restore();
    }
}
