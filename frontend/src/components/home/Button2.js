const Button2 = ({ color, onClick, text }) => {
  return (
    <button
      className='btn2'
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  )
}

export default Button2
