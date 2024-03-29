import { addPost } from '../../../Redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
  

let mapStateToProps = (state) => {
   return {
      posts: state.profilePage.posts,
      newPostText: state.profilePage.newPostText
   }
}

// let mapDispatchToProps = (dispatch) => {
//    return {
//       addPost: (newPostText) => {
//          dispatch(addPostActionCreate(newPostText))
//       }
//    }
// }

const MyPostsContainer = connect(mapStateToProps, { addPost })(MyPosts); //переписали без mapDispatchToProps

export default MyPostsContainer;