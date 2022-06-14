import React from 'react'

// function Input(props) {
function Input({ name, label, error, ...rest}) {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          // type={type}
          // value={value}
          // onChange={onChange}
          // Delete three above and replace with
          {...rest}
          id={name}
          name={name}
          className="form-control"
          />
        { error && <div className="alert alert-danger">{error}</div> }
      </div>
    </>
  )
}

export default Input


// function Input(props) {
// // function Input({ name, label, error, ...rest}) {
//   return (
//     <>
//       <div className="form-group">
//         <label htmlFor={props.name}>{props.label}</label>
//         <input
//           type={props.type}
//           value={props.value}
//           onChange={props.onChange}
//           // Delete three above and replace with
//           // {...rest}
//           name={props.name}
//           id={props.name}
//           className="form-control"
//           />
//         { props.error && <div className="alert alert-danger">{props.error}</div> }
//       </div>
//     </>
//   )
// }

// export default Input