const Button = ({ color, onClick, text }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  )
}

export default Button
