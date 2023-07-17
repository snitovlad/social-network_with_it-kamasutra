import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import AddNewPostForm from './Post/AddNewPostForm';

function MyPosts(props) {

   let postsElement = props.posts.map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount} avatar={p.avatar} />)

   return (
      <div className={s.postsBlock}>

         <h3>My posts</h3>

         <AddNewPostForm addPost={props.addPost} />

         <div className={s.posts}>
            {postsElement}
         </div>

      </div>
   );
}

export default MyPosts;