import React from 'react';

export function tooltipHeader (column, colIndex, { sortElement, filterElement }) {
  const titleText = column.text.match(/\b\w/g).join('')
  if (!filterElement) {
    return (
      <span data-toggle="tooltip" data-placement="top" title={ column.text }>{ titleText }</span>
    )
  } else {
    return (
      <div>
        <p data-toggle="tooltip" data-placement="top" title={ column.text }>{ titleText }</p>
        { filterElement }
      </div>
    )
  }

}
