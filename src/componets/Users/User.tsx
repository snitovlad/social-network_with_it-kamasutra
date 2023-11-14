import styles from './Users.module.css'
import { NavLink } from 'react-router-dom';
import { photo } from '../common/UserPhoto/userPhoto';
import { UserType } from '../../types/types';

type PropsType = {
   user: UserType
   followingInProgress: Array<number>
   follow: (userId: number) => void
   unfollow: (userId: number) => void
}
//вместо пропсов сделали деструктуризацию параметров. Можно в конце на всякий случай добавить ...props
let User: React.FC<PropsType> = ({ user, followingInProgress, follow, unfollow }) => {

   return (
      <div className={styles.user}>

         <span>
            <div>
               <NavLink to={'/profile/' + user.id} >
                 {photo(user, 'small')}
                  {/* <img src={user.photos.small != null
                     ? user.photos.small
                     : userPhoto} className={styles.userPhoto} /> */}
               </NavLink>
            </div>

            <div>
               {user.followed
                  //если в массиве followingInProgress хоть одна id равна id пользователя, 
                  //то тогда disabled (вернет true). Это метод .some
                  ? <button disabled={followingInProgress.some(id => id === user.id)}
                     onClick={() => { unfollow(user.id) }}>Unfollow</button>
                  : <button disabled={followingInProgress.some(id => id === user.id)}
                     onClick={() => { follow(user.id) }}>Follow</button>}
            </div>
         </span>

         <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
         </span>

         <span>
            <div>{'user.location.country'}</div>
            <div>{'user.location.city'}</div>
         </span>

      </div>
   )
}

export default User;
