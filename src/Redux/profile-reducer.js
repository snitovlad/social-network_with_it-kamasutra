import { type } from "@testing-library/user-event/dist/type";
import { profileAPI, usersAPI } from "../api/api";


const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

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

      case SAVE_PHOTO_SUCCESS: {
         return { ...state, profile: {...state.profile,  photos: action.photos} }
      }

      default:
         return state;
   }
}

//export const addPostActionCreate = (newPostText) => ({ type: ADD_POST, newPostText });
export const addPost = (newPostText) => ({ type: ADD_POST, newPostText }); //переписали в MyPostsContainer без mapDispatchToProps
export const deletePost = (postId) => ({ type: DELETE_POST, postId });

const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setStatus = (status) => ({ type: SET_STATUS, status });
export const setPhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

//было
// export const getUserProfile = (userId) => (dispatch) => {
//    usersAPI.getProfile(userId)
//       .then(response => {
//          dispatch(setUserProfile(response.data));
//       })
// }

//стало
export const getUserProfile = (userId) => async (dispatch) => {
   const response = await usersAPI.getProfile(userId);
   dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
   const response = await profileAPI.getStatus(userId);
   dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
   const response = await profileAPI.updateStatus(status)
   if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
   }
}

export const savePhoto = (file) => async (dispatch) => {
   const response = await profileAPI.savePhoto(file);
   if (response.data.resultCode === 0) {
      dispatch(setPhotoSuccess(response.data.data.photos));
   }
}

export default profileReducer;