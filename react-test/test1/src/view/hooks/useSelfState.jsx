let currentStateArr = []
let _index

function UseSelfState(state) {
    if (_index === undefined) {
        _index = 0
    }
    if (!currentStateArr[_index]) {
        currentStateArr.push({
            isFirst: false,
            state: typeof state === 'function' ? state() : state,
        })
    }

    const dispathCount = (() => {
        let _callIndex = _index
        return newState => {
            _index = 0
            console.log('_callIndex', _callIndex)
            currentStateArr[_callIndex].state =
                typeof newState === 'function' ? newState(currentStateArr[_callIndex].state) : newState
            window.render()
        }
    })()
    // console.log('initialState', initialState)
    console.log('currentStateArr', currentStateArr)
    const matchState = currentStateArr[_index++]
    return [matchState.state, dispathCount]
}

export default UseSelfState
