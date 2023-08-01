let arrs = []
let initialIndex

export default function useMyState(state) {
    const dispath = newState => {
        console.log('=>newState', newState)
        return [typeof state === 'function' ? state() : state, dispath]
    }
    // if (!initialIndex) {
    //   return [typeof state === 'function' ? state() : state, dispath]

    // }

    return [typeof state === 'function' ? state() : state, dispath]
}
