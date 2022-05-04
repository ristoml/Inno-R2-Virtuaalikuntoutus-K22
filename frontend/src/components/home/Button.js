const Button = ({ className, color, onClick, text }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  )
}

export default Button
