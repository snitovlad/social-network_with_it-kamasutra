import styles from './Users.module.css'
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';

type PropsType = {
   totalUsersCount: number
   pageSize: number
   currentPage: number
   onPageChanged: (pageNumber: number) => void
   users: Array<UserType>
   followingInProgress: Array<number>
   unfollow: (userId: number) => void
   follow: (userId: number) => void
}
let Users: React.FC<PropsType> = (props) => {

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
