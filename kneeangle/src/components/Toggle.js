const Toggle = ({ onChange }) => {
  return (
    <div>
      <label for='rightleg'>Right leg:</label>
      <input
        type='checkbox'
        id='rightleg'
        onChange={onChange}
      />      
    </div>
  )
}

export default Toggle
