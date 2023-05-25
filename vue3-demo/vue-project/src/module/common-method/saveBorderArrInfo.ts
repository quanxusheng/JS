import { positionInfoType } from "../type/ComponentType";

/**裁剪区边框节点信息
 * @param {number} borderSize
 * @param {positionInfoType} positionInfo
 */
function saveBorderArrInfo(
    borderSize: number,
    positionInfo: positionInfoType
) {
    console.log('=>borderSize', borderSize)
    console.log('=>positionInfo', positionInfo)
    const half = borderSize / 2
    const {x, y, w, h} = positionInfo

    const arr = []

    // 内框 拖拽操作
    arr[0] = {
        x: x - half,
        y: y + half,
        w: half,
        h: half,
        index: 1,
        option: 1
    }

    // 西北角拉伸
    arr[0] = {
        x: x - half,
        y: y + half,
        w: half,
        h: half,
        index: 1,
        option: 1
    }
}

export  {
    saveBorderArrInfo
}