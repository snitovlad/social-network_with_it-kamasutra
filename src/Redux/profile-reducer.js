import { profileAPI, usersAPI } from "../api/api";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
   posts:
      [
         { id: 1, message: 'Hi! How are you?', likeCount: 15, avatar: 'https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg' },
         { id: 2, message: 'It\'s my first post', likeCount: 20, avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg' },
         { id: 3, message: 'I\'m a sportsman. And you?', likeCount: 25, avatar: 'https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1' }
      ],
   profile: null,
   status: 'initial status'
}

const profileReducer = (state = initialState, action) => {
   switch (action.type) {

      case ADD_POST: {

         let newPost = {
            id: 4,
            message: action.newPostText,
            likeCount: 0,
            avatar: 'http://',
         };
         return {
            ...state,
            //newPostText: '', //работает и без обнуления, т.к. уже есть в AddNewPostForm
            posts: [...state.posts, newPost]
         }
      }

      case DELETE_POST: {

         return {
            ...state,
            posts: state.posts.filter(p => p.id !== action.postId)
         }
      }

      case SET_USER_PROFILE: {
         return { ...state, profile: action.profile }
      }

      case SET_STATUS: {
         return { ...state, status: action.status }
      }

      default:
         return state;
   }
}

//export const addPostActionCreate = (newPostText) => ({ type: ADD_POST, newPostText });
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText }); //переписали в MyPostsContainer без mapDispatchToProps
export const deletePost = (postId) => ({type: DELETE_POST, postId});

const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setStatus = (status) => ({ type: SET_STATUS, status });

export const getUserProfile = (userId) => (dispatch) => {
   usersAPI.getProfile(userId)
      .then(response => {
         dispatch(setUserProfile(response.data));
      })
}

export const getStatus = (userId) => (dispatch) => {
   profileAPI.getStatus(userId)
      .then(response => {
         dispatch(setStatus(response.data));
      })
}

export const updateStatus = (status) => (dispatch) => {
   profileAPI.updateStatus(status)
      .then(response => {
         if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
         }
      })
}

export default profileReducer;