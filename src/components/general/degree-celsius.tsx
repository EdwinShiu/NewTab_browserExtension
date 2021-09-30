
type DegreeCelsiusType = {
  fontSize: number,
}


const DegreeCelsius = ({fontSize}: DegreeCelsiusType) => {
  console.log(fontSize);
  return (
    <div 
      style={{
        position: 'relative',
        fontSize: `${fontSize}px`,
        marginLeft: '6px'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          fontSize: `${fontSize * 0.35}px`
        }}
      >
        o
      </div>
      C
    </div>
  )
}

export default DegreeCelsius;