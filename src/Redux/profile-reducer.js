const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state, action) => {
   switch(action.type) {

      case ADD_POST:
         let newPost = {
            id: 4,
            message: state.newPostText,
            likeCount: 0,
            avatar: 'http://',
         };
         state.posts.push(newPost);
         state.newPostText = "";  //зануляем поле ввода
         return state;

      case UPDATE_NEW_POST_TEXT:
         state.newPostText = action.newText;
         return state;

      default:
         return state;
   }   
}

export const addPostActionCreate = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreate = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;