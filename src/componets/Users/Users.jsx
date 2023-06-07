import styles from './Users.module.css'

const Users = (props) => {

   if (props.users.length === 0) {

      props.setUsers(
         [
            {
               id: 1, photoUrl: 'https://klike.net/uploads/posts/2019-03/1551511808_5.jpg', followed: false, fullName: 'Dmitry K', status: 'I am looking for a job right now',
               location: { country: 'Belarus', city: 'Minsk' }
            },
            {
               id: 2, photoUrl: 'https://cspromogame.ru//storage/upload_images/avatars/1152.jpg', followed: true, fullName: 'Sasha', status: 'I am so pretty',
               location: { country: 'Russia', city: 'Moskow' }
            },
            {
               id: 3, photoUrl: 'https://cspromogame.ru//storage/upload_images/avatars/788.jpg', followed: false, fullName: 'Sergey', status: 'I like football',
               location: { country: 'Ukraine', city: 'Kiew' }
            }
         ]
      )
   }
   
   return (
      <div>
         {props.users.map(u => <div key={u.id}>
            <span>
               <div>
                  <img src={u.photoUrl} className={styles.userPhoto} />
               </div>
               <div>
                  {u.followed ?
                     <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button> :
                     <button onClick={() => { props.follow(u.id) }}>Follow</button>}
               </div>
            </span>
            <span>
               <div>{u.fullName}</div>
               <div>{u.status}</div>
            </span>
            <span>
               <div>{u.location.country}</div>
               <div>{u.location.city}</div>
            </span>
         </div>)}
      </div>
   )
}

export default Users;