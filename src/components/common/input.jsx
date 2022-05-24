import React from 'react'

function Input(props) {
  return (
    <>
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          autoFocus id={props.name}
          type={props.name}
          className="form-control"
        />
        { props.error && <div className="alert alert-danger">{props.error}</div> }
      </div>
    </>
  )
}

export default Input