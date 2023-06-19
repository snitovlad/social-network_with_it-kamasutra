import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {
   return (
      <div className={s.profile}>
         
         <ProfileInfo profile={props.profile} />        
         <MyPostsContainer /*store = {props.store}*/ />
      </div>
   );
}

export default Profile;