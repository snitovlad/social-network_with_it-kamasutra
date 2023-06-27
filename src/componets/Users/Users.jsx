import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { usersAPI } from '../../api/api';


let Users = (props) => {

   let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
   let pages = [];
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
   }

   let curPage = props.currentPage;  //карусель массива номеров страниц
   let curPageFirst = ((curPage - 5) < 0 ? 0 : curPage - 5)
   let curPageLast = curPage + 5;
   let slicedCurPage = pages.slice(curPageFirst, curPageLast)

   return (
      <div className={styles.users}>

         <div>
            {slicedCurPage.map(p => {
               return <span className={props.currentPage === p ? styles.selectedPage : styles.noSelectedPage}
                  onClick={(event) => { props.onPageChanged(p) }} key={p}> {p} </span>
            })
            }
            <span>    всего страниц  {pagesCount}</span>
         </div>

         {props.users.map(u => <div className={styles.user} key={u.id}>
            <span>
               <div>
                  <NavLink to={'/profile/' + u.id}>
                     <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                  </NavLink>
               </div>
               <div>
                  {u.followed ?

                     <button onClick={() => {
                        usersAPI.deleteUsers(u.id)  //здесь отдельный экземпляр axios для .delete
                           .then(data => {  //просто data вместо response, т.к. в promise вернули response.data (в api.js)
                              if (data.resultCode === 0) {
                                 props.unfollow(u.id)
                              }
                           })
                     }}>Unfollow</button> :

                     <button onClick={() => {
                        usersAPI.postUsers(u.id)  //здесь отдельный экземпляр axios для .post
                           .then(data => {  //просто data вместо response, т.к. в promise вернули response.data (в api.js)
                              if (data.resultCode === 0) {
                                 props.follow(u.id)
                              }
                           })
                     }}>Follow</button>}
               </div>
            </span>
            <span>
               <div>{u.name}</div>
               <div>{u.status}</div>
            </span>
            <span>
               <div>{'u.location.country'}</div>
               <div>{'u.location.city'}</div>
            </span>
         </div>)}

      </div>
   )
}

export default Users;

/*axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
   withCredentials: true,
   headers: {
      "API-KEY": "5208d8eb-4483-4f95-a912-098579a41e05"
   }
})*/

/*axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                           withCredentials: true,
                           headers: {
                              "API-KEY": "5208d8eb-4483-4f95-a912-098579a41e05"
                           }
                        })*/ //т.к. кроссдоменный запрос post - то нужен дополнительный параметр {}