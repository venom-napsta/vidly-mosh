import React from 'react'

function movieForm(props) {
  console.log(props);
  return (
    <>
      <div>movie {props.match.params.id}</div>
      <button onClick={() => props.history.push('/movies')} >Save</button>
    </>
  )
}

export default movieForm