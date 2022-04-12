const Toggle = ({ onChange, isLeft }) => {
  return (
    <label className='toggle-switch'>
      <input
        type='checkbox'
        checked={!isLeft}
        onChange={onChange}
      />
      <span className='slider' />
    </label>
  )
}

export default Toggle