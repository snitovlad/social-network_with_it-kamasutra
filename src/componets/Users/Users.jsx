import React from 'react';
import axios from 'axios'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'

class Users extends React.Component {
   constructor(props) {
      super(props);
   }
   componentDidMount() {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
         .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setUsersTotalCount(response.data.totalCount);
      })
   }

   onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber);
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
         .then(response => {
            this.props.setUsers(response.data.items)
      })
   }

   render() {

      let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
      let pages = [];
      for (let i = 1; i <= pagesCount; i++) {
         pages.push(i)
      }

      let curPage = this.props.currentPage;
      let curPageFirst = ((curPage - 5) < 0 ? 0 : curPage - 5)
      let curPageLast = curPage + 5;
      let slicedCurPage = pages.slice(curPageFirst, curPageLast)


      return (
         <div className={styles.users}>

            <div>
               {slicedCurPage.map(p => {
                  return <span className={this.props.currentPage === p ? styles.selectedPage : styles.noSelectedPage}
                     onClick={(event) => { this.onPageChanged(p) } } key={p}> {p} </span> 
               })
               }
               <span>    всего страниц  { pagesCount }</span>
            </div>

            {this.props.users.map(u => <div className={styles.user} key={u.id}>
               <span>
                  <div>
                     <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                  </div>
                  <div>
                     {u.followed ?
                        <button onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button> :
                        <button onClick={() => { this.props.follow(u.id) }}>Follow</button>}
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
            </div> )}

         </div>
      )
   }
}

export default Users;