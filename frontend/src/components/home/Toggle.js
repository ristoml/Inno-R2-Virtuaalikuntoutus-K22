const Toggle = ({ disabled, onChange, isLeft }) => {
  return (
    <label className='toggle-switch'>
      <input
        type='checkbox'
        checked={!isLeft}
        disabled={disabled}
        onChange={onChange}
      />
      <span className='slider' />
    </label>
  )
}

export default Toggle