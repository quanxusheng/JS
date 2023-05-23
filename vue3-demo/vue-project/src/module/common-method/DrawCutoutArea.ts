/**
 * @param {number} x 起点x
 * @param {number} y 起点y
 * @param {any} w 截图区域宽度
 * @param {number} h 截图区域高度
 * @param {any} context 需要进行绘制的canvas画布
 * @param {any} screenShortController 需要进行操作的canvas容器
 */

export default function drawCutoutArea(
    x: number,
    y: number,
    w: number,
    h: number,
    context: CanvasRenderingContext2D,
    screenShortController: any,
    borderSize: number
) {
    const { width, height } = screenShortController;
    const size = borderSize
    const half = size / 2
    context.clearRect(0, 0, width, height);

    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.fillRect(0, 0, width, height);
    // context.save()
    context.clearRect(x, y, w, h);
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = "#e1ff06";
    
    // context.arc(x, y, 5, 0, 2 * Math.PI) // 暂未实现圆形点

    context.fillRect(x - half, y - half, size, size);
    context.fillRect(x + w - half, y - half, size, size)
    context.fillRect(x + w - half, y + h - half, size, size)
    context.fillRect(x - half, y + h - half, size, size)

    context.fillRect(x + (w - x) / 2, y + h - half, size, size)

    return {
        x,
        y,
        w,
        h
    };
}
