import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile() {
   return (
      <div className={s.profile}>
         <ProfileInfo />
         <MyPosts />
      </div>
   );
}

export default Profile;