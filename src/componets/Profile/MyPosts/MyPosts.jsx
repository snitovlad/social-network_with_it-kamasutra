import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import { addPostActionCreate, updateNewPostTextActionCreate } from '../../../Redux/profile-reducer';

function MyPosts(props) {

   let postsElement = props.posts.map( p => <Post key={p.id} message={p.message} likeCount={p.likeCount} avatar={p.avatar} />)

   let newPostElement = React.createRef();

   let addPost = () => {
      props.dispatch(addPostActionCreate())
   }

   let onPostChange = () => {
      let text = newPostElement.current.value;
      props.dispatch(updateNewPostTextActionCreate(text))
   }
   

   return (
      <div className={s.postsBlock}>
         <h3>My posts</h3>

         <div>
            <div>
               <textarea onChange={onPostChange} ref={ newPostElement } value={props.newPostText} name="" id="" cols="30" rows="4" /> {/*убрали </textarea>*/}
            </div>
            <div>
               <button onClick={ addPost }>Add post</button>
            </div>
         </div>

         <div className={s.posts}>
            { postsElement }            
         </div>

      </div>
   );
}

export default MyPosts;