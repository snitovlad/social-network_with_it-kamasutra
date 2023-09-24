import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';
import { photo } from '../common/UserPhoto/userPhoto';

//вместо пропсов сделали деструктуризацию параметров. Можно в конце на всякий случай добавить ...props
let User = ({ user, followingInProgress, follow, unfollow }) => {

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
