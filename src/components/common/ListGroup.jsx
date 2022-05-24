import React from 'react'

function ListGroup({ onItemSelect, items, textProperty, valueProperty, selectedItem }) {
  return (
    <ul className="list-group">
      {/* for reusability avoid this {items.map(item => <li key={item._id} className="list-group-item">{item.name}</li>)} */}
      {
        items.map(item =>
          <li key={item[valueProperty]} onClick={() =>
            onItemSelect(item)}
            // render active item dynamically ie upon select 
            // FROM:
            // className="list-group-item">{item[textProperty]}</li>
            // TO:
            // if the item we're rendering is the selected item then
            className={ item === selectedItem ? "list-group-item active":"list-group-item"}>{item[textProperty]}</li>
        )}
    </ul>
  )
}

// default props for reusability
ListGroup.defaultProps = {
  // with these we n longer hv to use the props in Movies
  // commented out, unless the component is different then
  // we can adjust the component
  textProperty: 'name',
  valueProperty: '_id'
}

export default ListGroup