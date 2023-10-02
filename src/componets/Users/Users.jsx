import styles from './Users.module.css'
import Paginator from '../common/Paginator/Paginator';
import User from './User';


let Users = (props) => {

   return (
      <div className={styles.users}>
         
         <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
            currentPage={props.currentPage} onPageChanged={props.onPageChanged} />

         {props.users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
            unfollow={props.unfollow} follow={props.follow} />
         )}

      </div>
   )
}

export default Users;
