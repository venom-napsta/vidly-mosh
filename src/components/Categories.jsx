import React from 'react'

const genres = [
  { _id: "983h2husduh4", name: 'Action' },
  { _id: "983h2husd8f4", name: 'Commedy' },
  { _id: "983h2husdu56", name: 'Thriller' }
]
export default function Categories() {

  return (
    <ul className="list-group">
      {genres.map(g =>
        <li key={g._id} className="list-group-item">
          <button className="btn btn-primary">{g.name}</button>
        </li>
      )}
    </ul>
  )
}