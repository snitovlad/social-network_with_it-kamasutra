import { addPostActionCreate, updateNewPostTextActionCreate } from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
  

let mapStateToProps = (state) => {
   return {
      posts: state.profilePage.posts,
      newPostText: state.profilePage.newPostText
   }
}

let mapDispatchToProps = (dispatch) => {
   return {
      addPost: () => {
         dispatch(addPostActionCreate())
      },
      updateNewPostText: (text) => {
         let action = updateNewPostTextActionCreate(text);
         dispatch(action)
      }
   }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;