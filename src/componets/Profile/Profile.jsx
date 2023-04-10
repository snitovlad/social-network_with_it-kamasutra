import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'

function Profile() {
   return (
      <div className={s.profile}>
         <div>
            <img src='https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_1280.jpg' />
         </div>
         <div>
            Ava + description
            <MyPosts />
         </div>         
      </div>
   );
}

export default Profile;