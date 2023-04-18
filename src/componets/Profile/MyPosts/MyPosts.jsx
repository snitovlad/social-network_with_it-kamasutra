import s from './MyPosts.module.css'
import Post from './Post/Post';

function MyPosts(props) {

   {/*let posts = [
      {id: 1, message: 'Hi! How are you?', likeCount: 15, avatar: 'https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg'},
      {id: 2, message: 'It\'s my first post', likeCount: 20, avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg'},
      {id: 3, message: 'I\'m a sportsman. And you?', likeCount: 25, avatar: 'https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1'}
   ]*/}

   let postsElement = props.posts.map( p => <Post key={p.id} message={p.message} likeCount={p.likeCount} avatar={p.avatar} />)

   return (
      <div className={s.postsBlock}>
         <h3>My posts</h3>

         <div>
            <div>
               <textarea name="" id="" cols="30" rows="4"></textarea>
            </div>
            <div>
               <button>Add post</button>
            </div>
         </div>

         <div className={s.posts}>
            { postsElement }            
         </div>

      </div>
   );
}

export default MyPosts;