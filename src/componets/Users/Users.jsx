import axios from 'axios'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'

const Users = (props) => {
   let getUsers = () => {

      if (props.users.length === 0) {
         axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(response.data.items)
         })

         //[
         // {
         //    id: 1, photoUrl: 'https://klike.net/uploads/posts/2019-03/1551511808_5.jpg', followed: false, fullName: 'Dmitry K', status: 'I am looking for a job right now',
         //    location: { country: 'Belarus', city: 'Minsk' }
         // },
         // {
         //    id: 2, photoUrl: 'https://cspromogame.ru//storage/upload_images/avatars/1152.jpg', followed: true, fullName: 'Sasha', status: 'I am so pretty',
         //    location: { country: 'Russia', city: 'Moskow' }
         // },
         // {
         //    id: 3, photoUrl: 'https://cspromogame.ru//storage/upload_images/avatars/788.jpg', followed: false, fullName: 'Sergey', status: 'I like football',
         //    location: { country: 'Ukraine', city: 'Kiew' }
         // }
         //]

      }
   }

   return (
      <div className={styles.users}>

         <button onClick={getUsers}>Get Users</button>

         {props.users.map(u => <div className={styles.user} key={u.id}>
            <span>
               <div>
                  <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
               </div>
               <div>
                  {u.followed ?
                     <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button> :
                     <button onClick={() => { props.follow(u.id) }}>Follow</button>}
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