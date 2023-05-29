const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
   posts:
   [
      { id: 1, message: 'Hi! How are you?', likeCount: 15, avatar: 'https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg' },
      { id: 2, message: 'It\'s my first post', likeCount: 20, avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg' },
      { id: 3, message: 'I\'m a sportsman. And you?', likeCount: 25, avatar: 'https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1' }
   ],
newPostText: 'it-kamasutra.com'
}

const profileReducer = (state = initialState, action) => {
   switch(action.type) {

      case ADD_POST: {

         let newPost = {
            id: 4,
            message: state.newPostText,
            likeCount: 0,
            avatar: 'http://',
         };
         let stateCopy = {...state};
         stateCopy.posts = [...state.posts]
         stateCopy.posts.push(newPost);
         stateCopy.newPostText = "";  //зануляем поле ввода
         return stateCopy;
      }

      case UPDATE_NEW_POST_TEXT: {
         let stateCopy = {...state};
         stateCopy.newPostText = action.newText;
         return stateCopy;
      }
      default:
         return state;
   }   
}

export const addPostActionCreate = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreate = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;