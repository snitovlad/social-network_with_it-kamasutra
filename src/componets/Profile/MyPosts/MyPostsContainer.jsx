import React from 'react';
import { addPostActionCreate, updateNewPostTextActionCreate } from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';

const MyPostsContainer = (props) => {

   /*let state = props.store.getState();

   let addPost = () => {
      props.store.dispatch(addPostActionCreate())
   }

   let onPostChange = (text) => {
      let action = updateNewPostTextActionCreate(text);
      props.store.dispatch(action)
   }*/


   return (
      <StoreContext.Consumer>{   // >{ должно быть без пробела или { с новой строки
         (store) => {

            let state = store.getState();

            let addPost = () => {
               store.dispatch(addPostActionCreate())
            }

            let onPostChange = (text) => {
               let action = updateNewPostTextActionCreate(text);
               store.dispatch(action)
            }
            
            return (
            <MyPosts addPost={addPost} updateNewPostText={onPostChange} posts={state.profilePage.posts}
               newPostText={state.profilePage.newPostText} />
            );
         }
      }
      </StoreContext.Consumer>
   )
}

export default MyPostsContainer;