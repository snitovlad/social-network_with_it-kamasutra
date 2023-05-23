import React from 'react';
import { addPostActionCreate, updateNewPostTextActionCreate } from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';

function MyPostsContainer(props) {

   let state = props.store.getState();

   let addPost = () => {
      props.store.dispatch(addPostActionCreate())
   }

   let onPostChange = (text) => {
      let action = updateNewPostTextActionCreate(text);
      props.store.dispatch(action)
   }
   

   return (
     <MyPosts addPost={ addPost } updateNewPostText={ onPostChange } posts={ state.profilePage.posts } 
               newPostText={state.profilePage.newPostText} />
      
   );
}

export default MyPostsContainer;