const Toggle = ({ onChange }) => {
  return (
    <label className='toggle-switch'>
      <input
        type='checkbox'
        onChange={onChange}
      />
      <span className='slider' />
    </label>
  )
}

export default Toggle