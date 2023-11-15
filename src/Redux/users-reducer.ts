import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/objects/helpers";
import { AppStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'users/SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

type InitialStateType = typeof initialState

let initialState = {
   users: [] as Array<UserType>,
   pageSize: 10,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [] as Array<number>  // array of users id
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
   switch (action.type) {

      // было одинаковый мапинг и замена в нем нужного объекта. 
      // Написали в helpers.js универсальную утилиту updateObjectInArray

      /* case FOLLOW:
          return {
             ...state,
             users: state.users.map(u => {
                if (u.id === action.userId) {
                   return { ...u, followed: true }      //отличие здесь
                }
                return u;
             })
          };
 
       case UNFOLLOW: {
          return {
             ...state,
             users: state.users.map(u => {
                if (u.id === action.userId) {
                   return { ...u, followed: false }      //отличие здесь
                }
                return u;
             })
          };
       } */

      //стало
      case FOLLOW: {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
         };
      }

      case UNFOLLOW: {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
         };
      }

      case SET_USERS: {
         return {
            ...state,
            users: action.users
         }
      }

      case SET_CURRENT_PAGE: {
         return {
            ...state,
            currentPage: action.currentPage
         }
      }

      case SET_USERS_TOTAL_COUNT: {
         return {
            ...state,
            totalUsersCount: action.count
         }
      }

      case TOGGLE_IS_FETCHING: {
         return {
            ...state,
            isFetching: action.isFetching
         }
      }

      case TOGGLE_IS_FOLLOWING_PROGRESS: {
         return {
            ...state,
            followingInProgress: action.isFetching  //проверям начало и окончание процесса подписки (отписки)
               ? [...state.followingInProgress, action.userId] //добавляем в массив новую id, к-я будет ожидать ответа от сервера
               : state.followingInProgress.filter(id => id != action.userId) //фильтруем ненужный id, к-рый равен action.userId
         }
      }

      default:
         return state;
   }
};

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType
   | SetUsersTotalCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType;

type FollowSuccessActionType = {
   type: typeof FOLLOW
   userId: number
}
const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });

type UnfollowSuccessActionType = {
   type: typeof UNFOLLOW
   userId: number
}
const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId }); 

type SetUsersActionType = {
   type: typeof SET_USERS
   users: Array<UserType>
}
const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });

type SetCurrentPageActionType = {
   type: typeof SET_CURRENT_PAGE
   currentPage: number
}  
const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage }); 

type SetUsersTotalCountActionType = {
   type: typeof SET_USERS_TOTAL_COUNT
   count: number
}
const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountActionType => ({ 
   type: SET_USERS_TOTAL_COUNT, count: totalUsersCount }); 

type ToggleIsFetchingActionType = {
   type: typeof TOGGLE_IS_FETCHING
   isFetching: boolean
}
const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching }); 

type ToggleFollowingProgressActionType = {
   type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
   isFetching: boolean
   userId: number
}
const toggleFollowingProgress = (isFetching: boolean, userId: number):ToggleFollowingProgressActionType => ({ 
   type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });  

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> //типизация thunk из redux

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
   dispatch(setCurrentPage(page));  //устанавливает текущую страницу пользователей
   dispatch(toggleIsFetching(true));
   const data = await usersAPI.getUsers(page, pageSize)  //здесь отдельный экземпляр axios для .get
   //просто data вместо response, т.к. в promise вернули response.data (в api.js)
   dispatch(toggleIsFetching(false));
   dispatch(setUsers(data.items));
   dispatch(setUsersTotalCount(data.totalCount));
}

/* //было, рефакторим, т.к. дублирование кода
export const unfollow = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId)); //деактивируем кнопку после нажатия перед отправкой на сервер
  const response = await usersAPI.unfollow(userId)  //здесь отдельный экземпляр axios для .delete
  if (response.data.resultCode === 0) {
     dispatch(unfollowSuccess(userId))
  }
  dispatch(toggleFollowingProgress(false, userId)); //активируем кнопку после получения данных с сервера
}

export const follow = (userId) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId)); //деактивируем кнопку после нажатия перед отправкой на сервер
  const response = await usersAPI.follow(userId)  //здесь отдельный экземпляр axios для .post
  if (response.data.resultCode === 0) {
     dispatch(followSuccess(userId))
  }
  dispatch(toggleFollowingProgress(false, userId)); //активируем кнопку после получения данных с сервера
}
*/

//стало (ввели ф-цию для внутреннего пользования)
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, 
   actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
   dispatch(toggleFollowingProgress(true, userId)); //деактивируем кнопку после нажатия перед отправкой на сервер
   const response = await apiMethod(userId)  //здесь отдельный экземпляр axios для .delete
   if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId))
   }
   dispatch(toggleFollowingProgress(false, userId)); //активируем кнопку после получения данных с сервера
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
   let apiMethod = usersAPI.unfollow.bind(usersAPI);
   let actionCreator = unfollowSuccess;
   _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}

export const follow = (userId: number): ThunkType => async (dispatch) => {  //еще сильнее упростили
   _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
}


export default usersReducer;