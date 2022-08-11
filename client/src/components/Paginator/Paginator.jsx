import React, { useState } from 'react'
import css from './Paginator.module.css'

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
    <>
    {portionNumber > 1 && <button onClick={ ()=> { setPortionNumber(portionNumber - 1) } }>PREV</button>}
      

      {pages
      .filter( (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p) => {
        return (
			
          <span
            key={p}
            onClick={() => {
              onPageChanged(p)
            }}
            className={
              currentPage === p
                ? css['number-page__page-active']
                : css['number-page__page']
            }
          >
            {p}
          </span>
        )
      })
      }
      {portionNumber < portionCount && <button onClick={ ()=> { setPortionNumber(portionNumber + 1) } }>NEXT</button>}
    </>
  )
}

export default Paginator
