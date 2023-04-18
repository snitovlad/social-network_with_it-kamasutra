import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {

   {/*let posts = [
      {id: 1, message: 'Hi! How are you?', likeCount: 15, avatar: 'https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg'},
      {id: 2, message: 'It\'s my first post', likeCount: 20, avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg'},
      {id: 3, message: 'I\'m a sportsman. And you?', likeCount: 25, avatar: 'https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1'}
   ]*/}

   return (
      <div className={s.profile}>
         <ProfileInfo />
         <MyPosts posts={props.posts}/>
      </div>
   );
}

export default Profile;