import s from './Profile.module.css'

function Profile() {
   return (
      <div className={s.content}>
         <div>
            <img src='https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_1280.jpg' />
         </div>
         <div>
            Ava + description
         </div>
         <div>
            My posts
            <div>
               New post
            </div>
         </div>
         <div className={s.posts}>
            <div className={s.item}>
               post1
            </div>
            <div className={s.item}>
               post2
            </div>
         </div>
      </div>
   );
}

export default Profile;