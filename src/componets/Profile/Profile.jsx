import MyPostsContainer from './MyPosts/MyPostsContainer';
//import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {
   return (
      <div >

         <ProfileInfo profile={props.profile}
            isOwner={props.isOwner}
            savePhoto={props.savePhoto}
            status={props.status}
            saveProfile={props.saveProfile}
            updateStatus={props.updateStatus}
            error={props.error} 
            setEditMode={props.setEditMode}
            editMode={props.editMode}/>
         <MyPostsContainer /*store = {props.store}*/ />
      </div>
   );
}

export default Profile;