import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {

   return (
      <div className={s.profile}>
         <ProfileInfo />
         <MyPosts posts={props.state.posts} addPost={props.addPost} />
      </div>
   );
}

export default Profile;