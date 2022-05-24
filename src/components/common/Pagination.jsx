import React from 'react'
import _ from 'lodash'

// receives props from the Movies component
function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  // const { itemsCount, pageSize } = props

  // ret smallest int greater than or equal to
  // also det the # of page divisions 
  // if there are 8 movies & pageSize=3 then 8/3 === 1, 2, 3 pages
  const pagesCount = Math.ceil(itemsCount / pageSize)

  if (pagesCount === 1) return null
  const pages = _.range(1, pagesCount + 1)

  // log current page #
  // console.log(currentPage);
  return (
    <nav>
      <ul className="pagination">
        { // disp the pagesCount # ie pagesCount variable above
        pages.map(page => (
          <li key={page} className={page === currentPage ? 'page-item active':'page-item'}>
            <button onClick={() => onPageChange(page)} className="page-link" >{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
    // <nav className="blog-pagination" aria-label="Pagination">
    //   <button className="btn btn-outline-primary">1</button>
    //   <button className="btn btn-outline-primary">2</button>
    //   <button className="btn btn-outline-primary">3</button>
    // </nav>