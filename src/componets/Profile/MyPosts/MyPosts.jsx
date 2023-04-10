import s from './MyPosts.module.css'
import Post from './Post/Post';

function MyPosts() {
   return (
      <div>
         My posts
         <div>
            <textarea name="" id="" cols="30" rows="4"></textarea>
            <button>Add post</button>
            
         </div>
         <div className={s.posts}>
            <Post message="Hi! How are you?" likeCount="15" avatar="https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg"/>
            <Post message="It's my first post" likeCount="20" avatar="https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg"/>
            <Post message="I'm a sportsman. And you?" likeCount="25" avatar="https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1"/>

         </div>
      </div>
   );
}

export default MyPosts;