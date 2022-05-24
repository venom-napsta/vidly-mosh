import React from 'react'

function movieForm(props) {
  console.log(props);
  return (
    <div>movie {props.match.params.id}</div>
  )
}

export default movieForm