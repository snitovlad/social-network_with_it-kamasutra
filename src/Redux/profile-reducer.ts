import { profileAPI, usersAPI } from "../api/api";
import { showGlobalError } from "./app-reducer";
import { PhotosType, PostsType, ProfileType } from "../types/types"
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";



const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';
const PROFILE_ERROR_FROM_API = 'profile/PROFILE_ERROR_FROM_API';
const SET_EDIT_MODE = 'profile/SET_EDIT_MODE'


type InitialStateType = typeof initialState

let initialState = {
   posts:
      [
         { id: 1, message: 'Hi! How are you?', likeCount: 15, avatar: 'https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg' },
         { id: 2, message: 'It\'s my first post', likeCount: 20, avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg' },
         { id: 3, message: 'I\'m a sportsman. And you?', likeCount: 25, avatar: 'https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1' }
      ] as Array<PostsType>,
   profile: null as ProfileType | null,
   status: 'initial status',
   error: null as string | null,
   editMode: false
}

const profileReducer = (state = initialState, action: ActionsTypes):InitialStateType  => {
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

      case PROFILE_ERROR_FROM_API: {
         return { ...state, error: action.error }
      }

      case SET_EDIT_MODE: {
         return { ...state, editMode: action.editMode }
      }

      case SAVE_PHOTO_SUCCESS: {
         return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType } //as ProfileFile временно
      }

      default:
         return state;
   }
}

type ActionsTypes = AddPostActionType | DeletePostActionType | SetUserProfileActionType | SetStatusActionType
                  | ProfileErrorFromApiActionType | SetEditModeActionType | SetPhotoSuccessActionType

type AddPostActionType = {
   type: typeof ADD_POST
   newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({ type: ADD_POST, newPostText });

type DeletePostActionType = {
   type: typeof DELETE_POST
   postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });

type SetUserProfileActionType = {
   type: typeof SET_USER_PROFILE
   profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type SetStatusActionType = {
   type: typeof SET_STATUS
   status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });

type ProfileErrorFromApiActionType = {
   type: typeof PROFILE_ERROR_FROM_API
   error: string | null
}
export const profileErrorFromApi = (error: string | null): ProfileErrorFromApiActionType => ({ 
   type: PROFILE_ERROR_FROM_API, error }); //получение ошибки с сервера

   type SetEditModeActionType = {
      type: typeof SET_EDIT_MODE
      editMode: boolean
   }  
export const setEditMode = (editMode: boolean): SetEditModeActionType => ({ type: SET_EDIT_MODE, editMode }); //установка режима редактирования

type SetPhotoSuccessActionType = {
   type: typeof SAVE_PHOTO_SUCCESS
   photos: PhotosType
} 
export const setPhotoSuccess = (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos });

//было
// export const getUserProfile = (userId) => (dispatch) => {
//    usersAPI.getProfile(userId)
//       .then(response => {
//          dispatch(setUserProfile(response.data));
//       })
// }

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> //типизация thunk из redux


//стало
export const getUserProfile = (userId: number | null):ThunkType => async (dispatch) => {
   const response = await usersAPI.getProfile(userId);
   dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number):ThunkType => async (dispatch) => {
   const response = await profileAPI.getStatus(userId);
   dispatch(setStatus(response.data));
}

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
   try {                                            //пытаемся выполнить ЭТОТ код, и если нет то перехватываем ошибку ниже
      const response = await profileAPI.updateStatus(status)
      if (response.data.resultCode === 0) {
         dispatch(setStatus(status));
      }
   } catch (error: any) {                                //перехватываем ошибку
      dispatch(showGlobalError(error.message))
   }
}

export const savePhoto = (file: any) => async (dispatch: any) => { //не работает типизация thunk
   const response = await profileAPI.savePhoto(file);
   if (response.data.resultCode === 0) {
      dispatch(setPhotoSuccess(response.data.data.photos));
   }
}

export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => { //getState - функция, к-рая позволяет взять state целиком
   const userId = getState().auth.userId; //взяли текущий userId в отделе .auth
   const response = await profileAPI.saveProfile(profile);

   if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
      dispatch(profileErrorFromApi(null)); //убираем сообщение об ошибке при успехе
      dispatch(setEditMode(false)); //выходим из режима редактирования при успехе


   } else {
      dispatch(profileErrorFromApi(response.data.messages[0]))
   }
}


export default profileReducer;