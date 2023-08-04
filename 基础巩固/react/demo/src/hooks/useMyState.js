let currentStateArr = []
let _index = 0

export default function useMyState(initialVal) {
    currentStateArr[_index] = currentStateArr[_index] || (typeof initialVal === 'function' ? initialVal() : initialVal)
    const cursor = _index
    function dispatchAction(newVal) {
        currentStateArr[cursor] = typeof newVal === 'function' ? newVal(currentStateArr[cursor]) : newVal
        _index = 0
        window.render()
    }

    console.log('=>currentStateArr', currentStateArr)
    return [currentStateArr[_index++], dispatchAction]
}
