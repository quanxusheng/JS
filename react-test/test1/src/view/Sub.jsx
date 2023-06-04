

export default function Sub(props) {
    // console.log(props);
    // props.onSelf()
    return (
       <div 
       onClick={() => {
        console.log(props);
        props.onSelf()
       }} 
        style={{width: '50px', height: '50px', background: 'black',color: '#ffffff'}}
       >
        {props.children}
       </div>
    )
}