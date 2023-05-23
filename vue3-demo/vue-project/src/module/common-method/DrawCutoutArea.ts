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
    context: any,
    screenShortController: any
) {
    const { width, height } = screenShortController;
    context.clearRect(0, 0, width, height);

    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.fillRect(0, 0, width, height);
    // context.save()
    context.clearRect(x, y, w, h);

    context.fillStyle = "#000000";
    context.fillRect(x, y);

    return {
        x,
        y,
        w,
        h
    };
}
