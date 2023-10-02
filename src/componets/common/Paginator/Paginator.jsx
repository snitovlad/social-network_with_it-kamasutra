import { useState } from 'react';
import styles from './Paginator.module.css'
import cn from "classnames"


const Paginator = ({ portionPagesSize = 10, ...props }) => {

   let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize); //количество страниц по {pageSize} пользователей
   let pages = []; //массив с номерами страниц
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }

   let portionPagesCount = Math.ceil(pagesCount / portionPagesSize); //количество порций страниц
   //установили текущую порцию страниц хуком useState
   let [portionPagesNumber, setPortionPagesNumber] = useState(Math.ceil(props.currentPage / portionPagesSize)); 
   let leftPortionPageNumber = (portionPagesNumber - 1) * portionPagesSize + 1; //номер левой границы порции страниц
   let rightPortionPageNumber = portionPagesNumber * portionPagesSize; //номер правой границы порции страниц

   return (
      <div className={styles.paginator}>

         {portionPagesNumber > 1
            && <button className={styles.button}
               onClick={() => { setPortionPagesNumber(portionPagesNumber - 1) }}>PREV</button>}

         {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
               return <span className={ cn( { [styles.selectedPage]: props.currentPage === p }, styles.pageNumber) }
                  key={p} onClick={(e) => { props.onPageChanged(p) } }>{p}</span>
            })
         }

         {portionPagesCount > portionPagesNumber
            && <button className={styles.button}
               onClick={() => { setPortionPagesNumber(portionPagesNumber + 1) }}>NEXT</button>}

         <span className={styles.pageCount}>    всего страниц  {pagesCount}</span>
      </div>
   )
}

export default Paginator;