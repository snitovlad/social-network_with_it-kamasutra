import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
   users: [],
   pageSize: 5,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: false,
   followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
   switch (action.type) {

      case FOLLOW:
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userId) {
                  return { ...u, followed: true }
               }
               return u;
            })
         };

      case UNFOLLOW: {
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userId) {
                  return { ...u, followed: false }
               }
               return u;
            })
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

const followSuccess = (userId) => ({ type: FOLLOW, userId });  //не экспортируем, т.к. используем здесь же в users-reducer.js
const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });  //не экспортируем, т.к. используем здесь же в users-reducer.js
const setUsers = (users) => ({ type: SET_USERS, users });  //не экспортируем, т.к. используем здесь же в users-reducer.js
const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });  //не экспортируем, т.к. используем здесь же в users-reducer.js
const setUsersTotalCount = (totalUsersCount) => ({ type: SET_USERS_TOTAL_COUNT, count: totalUsersCount });  //не экспортируем, т.к. используем здесь же в users-reducer.js
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });  //не экспортируем, т.к. используем здесь же в users-reducer.js
const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });  //не экспортируем, т.к. используем здесь же в users-reducer.js

export const requestUsers = (page, pageSize) => {
   return (dispatch) => {
      dispatch(setCurrentPage(page));  //устанавливает текущую страницу пользователей
      dispatch(toggleIsFetching(true));
      usersAPI.getUsers(page, pageSize)  //здесь отдельный экземпляр axios для .get
         .then(data => {   //просто data вместо response, т.к. в promise вернули response.data (в api.js)
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setUsersTotalCount(data.totalCount));
         })
   }
}

export const unfollow = (usersId) => {
   return (dispatch) => {
      dispatch(toggleFollowingProgress(true, usersId)); //деактивируем кнопку после нажатия перед отправкой на сервер
      usersAPI.unfollow(usersId)  //здесь отдельный экземпляр axios для .delete
         .then(data => {  //просто data вместо response, т.к. в promise вернули response.data (в api.js)
            if (data.resultCode === 0) {
               dispatch(unfollowSuccess(usersId))
            }
            dispatch(toggleFollowingProgress(false, usersId)); //активируем кнопку после получения данных с сервера
         })
   }
}

export const follow = (usersId) => {
   return (dispatch) => {
      dispatch(toggleFollowingProgress(true, usersId)); //деактивируем кнопку после нажатия перед отправкой на сервер
      usersAPI.follow(usersId)  //здесь отдельный экземпляр axios для .post
         .then(response => { 
            if (response.data.resultCode === 0) {
               dispatch(followSuccess(usersId))
            }
            dispatch(toggleFollowingProgress(false, usersId)); //активируем кнопку после получения данных с сервера
         })
   }
}

export default usersReducer;