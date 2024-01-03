import { useState } from 'react'

export default function Chess() {
    let initData = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const [chessData, setChessData] = useState(Array(9).fill(''))
    const [count, setCount] = useState(0)
    const [winPlayer, setWinPlayer] = useState(null)
    const [history, setHistory] = useState([chessData])
    // console.log('=>chessData', chessData)

    const handleTapCell = (item, index) => {
        // console.log('=>handleTapCell', item)
        // console.log('=>handleTapCell', index)
        if (item) return
        setCount(count => count + 1)
        const temp = chessData.slice()
        temp[index] = count % 2 ? 'X' : '0'
        setChessData(temp)
        currentWinner(temp)
        setHistory(h => {
            console.log('=hhh>', h)
            return [...history, temp]
        })
        console.log('=>history', history)
    }

    function currentWinner(currentCell) {
        console.log('=>currentCell', currentCell)
        for (let i = 0, len = initData.length; i < len; i++) {
            const [a, b, c] = initData[i]
            if (currentCell[a] && currentCell[a] === currentCell[b] && currentCell[a] === currentCell[c]) {
                console.log('=>currentWinner', initData[i])
                setWinPlayer(currentCell[a])
            }
        }
    }

    function handleSelectHistory(e) {
        console.log('=>handleSelectHistory-e', e)
    }

    return (
        <div>
            <h1>Chess</h1>
            {winPlayer && <h2>获胜者是：{winPlayer}</h2>}

            <ul
                style={{
                    width: 210,
                    height: 210,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    boxSizing: 'border-box',
                }}>
                {chessData.map((item, index) => {
                    return (
                        <li
                            onClick={() => handleTapCell(item, index)}
                            key={index}
                            style={{
                                border: '1px solid #000',
                                boxSizing: 'border-box',
                                fontWeight: 'bold',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '70px',
                                height: '70px',
                            }}>
                            {item}
                        </li>
                    )
                })}
            </ul>
            <div>
                <h2>操作历史</h2>
                <div onClick={e => handleSelectHistory(e)}>
                    {history.map((item, index) => {
                        return index === 0 ? (
                            <div key={index}>
                                <button>重玩</button>
                            </div>
                        ) : (
                            <div key={index}>
                                <button>回到第{index}步</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
