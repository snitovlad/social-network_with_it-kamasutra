import s from './MyPosts.module.css'
import Post from './Post/Post';

function MyPosts() {
   return (
      <div>
         My posts
         <div>
            <textarea name="" id="" cols="30" rows="4"></textarea>
            <button>Add post</button>
            New post
         </div>
         <div className={s.posts}>
            <Post />
            <Post />
            <Post />
            <Post />

         </div>
      </div>
   );
}

export default MyPosts;