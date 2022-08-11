import React, { useState } from 'react'

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  //? определяем границы для диапазона вывода страниц------------>

  //? определяем размер порции:
  let portionCount = Math.ceil(totalItemsCount / portionSize) //? portionSize - размер порции
  let [portionNumber, setPortionNumber] = useState(1);
  
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; //* левая граница
  let rightPortionPageNumber = portionNumber * portionSize; //* правая граница

  //? --------------------> определяем границы для диапазона вывода страниц

  let pages = []

  for (let index = 1; index <= pagesCount; index++) {
    pages.push(index)
  }


  return (
    <ul className='pagination center-align'>
      <li className={(portionNumber > 1) ? 'material-icons disabled' : 'material-icons'} onClick={ ()=> { setPortionNumber(portionNumber - 1) } }>chevron_left</li>
      

      {pages
      .filter( (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p) => {
        return (
			
          <li
            key={p}
            onClick={() => {
              onPageChanged(p)
            }}
            className={
              currentPage === p
                ? 'active flow-text col s12'
                : 'waves-effect hoverable flow-text col s12'
            }
          >
            {p}
          </li>
        )
      })
      }
      <li className={(portionNumber < portionCount) ? 'material-icons' : 'material-icons disabled'} onClick={ ()=> { setPortionNumber(portionNumber + 1) } }>chevron_right</li>
    </ul>
  )
}

export default Paginator
