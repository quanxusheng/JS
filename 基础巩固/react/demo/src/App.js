// import Count from './components/Count'
// import Count2 from './components/Count2'
// import Test from './components/TestUseMyState'

function App() {
    const divClick = () => {
        console.log('=>', 111)
    }
    const subClick = e => {
        console.log('=>', 222)
        e.stopPropagation()
        console.log('=>', e)
    }
    return (
        <div className="App" style={{ background: 'black' }} onClick={divClick}>
            {/* <Count /> */}
            {/* <Count2 /> */}
            {/* <Test /> */}
            123
            <div style={{ background: 'red' }} onClick={subClick}>
                sub
            </div>
        </div>
    )
}

export default App
