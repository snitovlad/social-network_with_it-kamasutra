import styles from './Paginator.module.css'


const Paginator = (props) => {

   let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
   let pages = [];
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }

   let curPage = props.currentPage;  //карусель массива номеров страниц
   let curPageFirst = ((curPage - 6) < 0 ? 0 : curPage - 6)
   let curPageLast = curPage + 5;
   let slicedCurPage = pages.slice(curPageFirst, curPageLast)

   return (
      <div>
            {slicedCurPage.map(p => {
               return <span className={props.currentPage === p ? styles.selectedPage : styles.noSelectedPage}
                  onClick={(event) => { props.onPageChanged(p) }} key={p}> {p} </span>
            })
            }
            <span>    всего страниц  {pagesCount}</span>
         </div>
   )
}

export default Paginator;